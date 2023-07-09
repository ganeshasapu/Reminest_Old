import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import Colors from "../../../constants/Colors";
import { styles } from "../../stylesheets/styles";
import { PostContext } from "./_layout";
import { useRouter } from "expo-router";
import {
    doc,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    setDoc,
    DocumentReference,
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    uploadBytesResumable,
    UploadTask,
} from "firebase/storage";
import { storage, db } from "../../firebase";
import { mediaType, collections, WeeklyPostsCollectionsType } from "../../schema";
import { FirebaseContext } from "../../auth";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const confirmPost = () => {
    const router = useRouter();
    const { user } = useContext(FirebaseContext);

    if (!user) return <Text>No User Found</Text>;

    const { thumbnailUri, imageUri, prompt, videoUri, collectionId } = useContext(PostContext);

    // const videoUri = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
    // const thumbnailUri = "https://picsum.photos/seed/696/3000/2000";
    // const imageUri = "https://picsum.photos/seed/696/3000/2000";
    // const prompt = "What is your favorite color?";
    // const collectionId = 1;

    if (!thumbnailUri || !imageUri || !prompt || !collectionId || !videoUri) {
        <SafeAreaView>
            <Text>Loading...</Text>
        </SafeAreaView>;
    }

    const savePhoto = async (): Promise<string> => {
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
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, blob).catch((error) => {
            console.log(error);
        });
        const downloadURL = await getDownloadURL(storageRef)
        return downloadURL;
    };

    const createPost = async () => {
        const videoDownloadUrl = await saveVideo();
        const photoDownloadUrl = await savePhoto();

        if (!videoDownloadUrl || !photoDownloadUrl) return;
        const postData = {
            like_count: 0,
            media: [{ type: "VIDEO", url: videoDownloadUrl }, {type: "IMAGE", url: photoDownloadUrl}] as mediaType[],
            timestamp: Date.now(),
            author: doc(db, collections.users, user.uid),
        };
        const postCollectionRef = collection(db, collections.posts);
        const postRef = await addDoc(postCollectionRef, postData);

        const collectionRef = doc(
            db,
            collections.weekly_post_collections,
            collectionId.toString()
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.mainContainer}>
                <View style={{ height: h * 0.1 }} />
                <View style={localStyles.imageContainer}>
                    <Image
                        source={{ uri: imageUri }}
                        style={[localStyles.image, styles.shadow]}
                    />
                    <Image
                        source={{ uri: thumbnailUri }}
                        style={[localStyles.videoThumbnail, styles.shadow]}
                    />
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
                </View>
            </View>
        </SafeAreaView>
    );
};

export default confirmPost;

const localStyles = StyleSheet.create({
    videoThumbnail: {
        width: w * 0.4,
        height: w * 0.4 * (16 / 9),
    },
    imageContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        height: h * 0.5,
    },
    image: {
        width: w * 0.4,
        height: w * 0.4 * (16 / 9),
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
});
