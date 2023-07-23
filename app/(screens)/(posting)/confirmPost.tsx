import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../../constants/Colors";
import { styles } from "../../stylesheets/styles";
import { useRouter } from "expo-router";
import {
    doc,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { storage, db } from "../../firebase";
import { mediaType, collections } from "../../schema";
import { FirebaseContext } from "../../auth";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import PlayButtonIcon from "../../../assets/vectors/PlayButtonIcon";
import { PostContext } from "./_layout";
import Loading from "../loading";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const CHUNK_SIZE = 1024 * 1024;

const confirmPost = () => {
    const router = useRouter();
    const { user } = useContext(FirebaseContext);

    if (!user) return <Text>No User Found</Text>;

    const { thumbnailUri, imageUri, prompt, videoUri, collectionID } =
        useContext(PostContext);
    const [ uploadProgress, setUploadProgress ] = useState(0);

    // const videoUri = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
    // const thumbnailUri = "https://picsum.photos/seed/696/3000/2000";
    // // const imageUri = "https://picsum.photos/seed/696/3000/2000";
    // const imageUri = ""
    // const prompt = "What is your favorite color?";
    // const collectionID = 1;

    const savePhoto = async (): Promise<string> => {
        if (!imageUri) return "";
        const fileName = `photos/photo_${Date.now()}.jpg`;

        if (!imageUri) return "";

        const compressedImage = await manipulateAsync(imageUri, [], {
            compress: 0.5,
            format: SaveFormat.JPEG,
        });

        const response = await fetch(compressedImage?.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, fileName);

        const snapshot = await uploadBytesResumable(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    };

    const saveVideo = async (): Promise<string> => {
        if (!videoUri) return "";

        const fileName = `videos/video_${Date.now()}.mov`;

        const response = await fetch(videoUri);
        const blob = await response.blob();
        const totalChunks = Math.ceil(blob.size / CHUNK_SIZE);
        const chunks = [];

        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, blob.size);
            const chunk = blob.slice(start, end);
            chunks.push(chunk);
        }


        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, blob);
        return new Promise<string>((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Handle progress updates if needed
                    setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                },
                (error) => {
                    console.log("Upload failed:", error);
                    reject(error);
                },
                () => {
                    // Upload completed successfully
                    getDownloadURL(storageRef)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            );
        });
    };

    const createPost = async () => {
        const videoDownloadUrl = await saveVideo();
        const photoDownloadUrl = await savePhoto();

        if (!videoDownloadUrl) return;

        const media = [{ type: "VIDEO", url: videoDownloadUrl }, photoDownloadUrl ? { type: "PHOTO", url: photoDownloadUrl } : null];

        const postData = {
            like_count: 0,
            media: media as mediaType[],
            timestamp: Date.now(),
            author: doc(db, collections.users, user.uid),
        };
        const postCollectionRef = collection(db, collections.posts);
        const postRef = await addDoc(postCollectionRef, postData);

        const collectionRef = doc(
            db,
            collections.weekly_post_collections,
            collectionID.toString()
        );

        await updateDoc(collectionRef, {
            posts: arrayUnion(postRef),
            usersResponded: arrayUnion(user.uid),
        });

        const userRef = doc(db, collections.users, user.uid);
        await updateDoc(userRef, {
            posts: arrayUnion(postRef),
        });

        router.push("(screens)/feed");
    };

    if (!thumbnailUri || !imageUri || !prompt || !collectionID || !videoUri) {
        <SafeAreaView>
            <Loading />
        </SafeAreaView>;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.mainContainer}>
                <View style={{ height: h * 0.1 }} />
                <View style={localStyles.mediaContainer}>
                    <View
                        style={[localStyles.thumbnailContainer, styles.shadow]}
                    >
                        <Image
                            source={{ uri: thumbnailUri }}
                            style={[localStyles.videoThumbnail]}
                        />
                        <PlayButtonIcon
                            style={localStyles.playButtonIcon}
                            width={50}
                            height={50}
                        />
                    </View>
                    <View style={[localStyles.imageContainer, styles.shadow]}>
                        {imageUri ? (
                            <Image
                                source={{ uri: imageUri }}
                                style={[localStyles.image]}
                            />
                        ) : (
                            <View style={{ justifyContent: "center", alignItems: "center"}}>
                            <MaterialCommunityIcons
                                name="image-off"
                                size={85}
                                color="#442626"
                            />
                            </View>
                        )}
                    </View>
                </View>
                <View style={localStyles.promptOuterContainer}>
                    <View style={localStyles.promptTextContainer}>
                        <Text style={localStyles.promptText}>{prompt}</Text>
                    </View>
                    <TouchableOpacity
                        style={localStyles.postButton}
                        onPress={createPost}
                    >
                        <Text style={styles.buttonText}>Post Now</Text>
                    </TouchableOpacity>
                    {uploadProgress > 0 ? (
                        <Text style={localStyles.progressTest}>
                            {"Upload Progress: " +
                                uploadProgress.toFixed(0) +
                                "%"}
                        </Text>
                    ) : null}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default confirmPost;

const localStyles = StyleSheet.create({
    thumbnailContainer: {
        width: w * 0.4,
        height: w * 0.4 * (16 / 9),
        borderRadius: 10,
    },
    videoThumbnail: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    mediaContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        height: h * 0.5,
    },
    imageContainer: {
        width: w * 0.4,
        height: w * 0.4 * (16 / 9),
        display: "flex",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: Colors.background,
    },
    image: {
        width: w * 0.4,
        height: w * 0.4,
    },
    promptOuterContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    promptTextContainer: {
        width: "70%",
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    promptText: {
        flexShrink: 1,
        textAlign: "center",
        fontSize: 20,
        lineHeight: 35,
        fontFamily: "gabriel-sans",
    },
    postButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: w * 0.35,
        height: 50,
        borderRadius: 10,
        backgroundColor: Colors.blue,
    },
    playButtonIcon: {
        position: "absolute",
        top: w * 0.2 * (16 / 9) - 25,
        left: w * 0.2 - 25,
        zIndex: 5,
    },
    progressTest: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: "gabriel-sans",
    }
});
