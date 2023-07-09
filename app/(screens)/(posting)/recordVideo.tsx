import {
    Button,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Colors from "../../../constants/Colors";
import { styles } from "../../stylesheets/styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    getDoc,
    doc,
    addDoc,
    arrayUnion,
    collection,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import {
    WeeklyPostsCollectionsType,
    PostType,
    UserType,
    collections,
    mediaType,
} from "../../schema";
import { Camera, CameraType, VideoQuality } from "expo-camera";
import { ResizeMode, Video } from "expo-av";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseContext } from "../../auth";
import { PostContext, RouteContext } from "./_layout";
import VideoPreview from "./VideoPreview";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const recordVideo = () => {
    const { collectionId } = useLocalSearchParams();
    const [collectionData, setCollectionData] =
        useState<WeeklyPostsCollectionsType | null>(null);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [authors, setAuthors] = useState<UserType[]>([]);

    const cameraRef = useRef<Camera>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [cameraDirection, setCameraDirection] = useState<CameraType>(
        CameraType.front
    );

    const router = useRouter();

    let lastPress = 0;

    const { user } = useContext(FirebaseContext);
    const { setCurrentRouteIndex } = useContext(RouteContext);
    const { videoUri, setVideoUri, setPrompt, setCollectionId } = useContext(PostContext);

    if (!user) return <Text>No User Found</Text>;

    if (!collectionId) return <Text>No post collection</Text>;

    useEffect(() => {
        setCollectionId(collectionId as string);
        const fetchWeeklyPostCollection = async () => {
            const weeklyPostCollectionRef = await getDoc(
                doc(
                    db,
                    collections.weekly_post_collections,
                    collectionId.toString()
                )
            );
            if (weeklyPostCollectionRef.exists()) {
                setCollectionData(
                    weeklyPostCollectionRef.data() as WeeklyPostsCollectionsType
                );
            }
        };
        fetchWeeklyPostCollection()

    }, []);

    useEffect(() => {
        if (!collectionData) return console.log("No collection data");
        setPrompt(collectionData.prompt);
        const retrievePostData = async () => {
            if (collectionData?.posts.length > 0) {
                const docSnap = await getDoc(collectionData.posts[0]);
                if (docSnap.exists()) {
                    // Document data is available
                    const data = docSnap.data();
                    setPosts([...posts, data as PostType]);
                    // Use the 'data' object for further processing
                } else {
                    // Document doesn't exist
                    console.log("No such document!");
                }
            }
        };
        retrievePostData();
    }, [collectionData]);

    useEffect(() => {
        if (!posts) return console.log("No posts");
        const retrieveAuthorData = async () => {
            if (posts.length > 0) {
                posts.forEach(async (post) => {
                    const docSnap = await getDoc(post.author);
                    if (docSnap.exists()) {
                        // Document data is available
                        const data = docSnap.data();
                        console.log("Document data:", data);
                        setAuthors((prevAuthors) => [
                            ...prevAuthors,
                            data as UserType,
                        ]);
                        // Use the 'data' object for further processing
                    } else {
                        // Document doesn't exist
                        console.log("No such document!");
                    }
                });
            }
        };
        retrieveAuthorData();
    }, [posts]);
    if (!collectionData || !posts || authors.length != posts.length) {
        return <Text>Loading...</Text>;
    }

    let beforeHighlight,
        highlight,
        afterHighlight = "";



    const splitPrompt = (prompt: string) => {
        const highlightIndex = prompt.indexOf(collectionData.highlightedWord);
        beforeHighlight = prompt.slice(0, highlightIndex);
        highlight = prompt.slice(
            highlightIndex,
            highlightIndex + collectionData.highlightedWord.length
        );
        afterHighlight = prompt.slice(
            highlightIndex + collectionData.highlightedWord.length,
            prompt.length
        );
        return [beforeHighlight, highlight, afterHighlight];
    };
    splitPrompt(collectionData.prompt);

    const stopRecording = async () => {
        cameraRef.current?.stopRecording();
    };

    const recordVideo = async () => {
        setIsRecording(true);
        let options = {
            quality: VideoQuality["720p"],
            maxDuration: 20,
        };

        cameraRef.current?.recordAsync(options).then((video) => {
            setVideoUri(video.uri);
            setCurrentRouteIndex(1);
            setIsRecording(false);
        });
    };

    const onDoublePress = () => {
        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            // Success double press
            setCameraDirection(
                cameraDirection === CameraType.front
                    ? CameraType.back
                    : CameraType.front
            );
        }
        lastPress = time;
    };

    const saveVideo = async () => {
        if (!videoUri) return;

        const fileName = `video_${Date.now()}.mov`;

        const response = await fetch(videoUri);
        const blob = await response.blob();
        const storageRef = ref(storage, fileName);

        try {
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            console.log("Video uploaded to Firebase Storage:", downloadURL);

            // Perform additional actions with the video URL
            // For example, save the URL to Firestore or perform other operations

            // Example: Saving video URL to a Firestore document
            const postData = {
                like_count: 0,
                media: [{ type: "VIDEO", url: downloadURL }] as mediaType[],
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
            });

            const userRef = doc(db, collections.users, user.uid);
            await updateDoc(userRef, {
                posts: arrayUnion(postRef),
            });

            router.push("(screens)/feed");
        } catch (error) {
            console.error("Failed to upload video:", error);
        }
    };

    if (videoUri) {
        return (
            <VideoPreview />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.mainContainer}>
                <View style={localStyles.outerPromptContainer}>
                    <View style={localStyles.innerPromptContainer}>
                        <Text style={localStyles.submittedPromptText}>
                            {beforeHighlight}
                            <Text
                                style={[
                                    localStyles.submittedPromptText,
                                    { backgroundColor: "white" },
                                ]}
                            >
                                {highlight}
                            </Text>
                            {afterHighlight}
                        </Text>
                    </View>
                </View>
                <View style={[{ flex: 1, marginVertical: 10 }, styles.shadow]}>
                    <TouchableOpacity
                        style={localStyles.outerBox}
                        activeOpacity={1}
                        onPress={onDoublePress}
                    >
                        <Camera
                            type={cameraDirection}
                            style={localStyles.container}
                            ref={cameraRef}
                        >
                            <View style={localStyles.outerButtonContainer}>
                                <View style={localStyles.innerButtonContainer}>
                                    <TouchableOpacity
                                        style={localStyles.button}
                                        onPress={
                                            isRecording
                                                ? stopRecording
                                                : recordVideo
                                        }
                                    />
                                </View>
                            </View>
                        </Camera>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default recordVideo;

const localStyles = StyleSheet.create({
    outerPromptContainer: {
        borderRadius: 10,
        padding: 5,
        backgroundColor: "white",
        height: h * 0.2,
        width: w * 0.9,
    },
    innerPromptContainer: {
        backgroundColor: Colors.orange,
        width: "100%",
        height: "100%",
        borderRadius: 10,
        padding: 25,
        display: "flex",
        flexDirection: "column-reverse",
    },
    submittedPromptText: {
        color: "#000",
        fontSize: 25,
        fontFamily: "gabriel-sans",
    },
    container: {
        flex: 1,
        borderRadius: 20,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    video: {
        flex: 1,
        alignSelf: "stretch",
    },
    outerBox: {
        borderRadius: 20,
        width: "100%",
        height: h * 0.7,
        overflow: "hidden",
    },
    outerButtonContainer: {
        height: 65,
        width: 65,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    innerButtonContainer: {
        height: 55,
        width: 55,
        borderRadius: 50,
        backgroundColor: "red",
    },
    button: {
        height: "100%",
        width: "100%",
    },
});
