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
import { useLocalSearchParams } from "expo-router";
import {
    getDoc,
    doc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import {
    WeeklyPostsCollectionsType,
    PostType,
    UserType,
    collections,
} from "../../schema";
import { Camera, CameraType, VideoQuality } from "expo-camera";
import { FirebaseContext } from "../../auth";
import { PostContext, RouteContext } from "./_layout";
import VideoPreview from "./VideoPreview";
import Loading from "../loading";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const recordVideo = () => {
    const [collectionData, setCollectionData] =
        useState<WeeklyPostsCollectionsType | null>(null);
    const [timer, setTimer] = useState<number>(300);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [authors, setAuthors] = useState<UserType[]>([]);

    const cameraRef = useRef<Camera>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [cameraDirection, setCameraDirection] = useState<CameraType>(
        CameraType.front
    );
    const [permission, requestPermission] = Camera.useCameraPermissions();



    let lastPress = 0;

    const { user } = useContext(FirebaseContext);
    const { setCurrentRouteIndex } = useContext(RouteContext);
    const { videoUri, setVideoUri, setPrompt, setCollectionID, collectionID } = useContext(PostContext);


    if (collectionID === ""){
        setCollectionID(useLocalSearchParams().collectionId as string);
    }

    let beforeHighlight,
        highlight,
        afterHighlight = "";

    useEffect(() => {
        requestPermission();
         Camera.requestMicrophonePermissionsAsync();
    }, [])

    useEffect(() => {
        if (!collectionID) return console.log("No collection ID");
        const fetchWeeklyPostCollection = async () => {
            const weeklyPostCollectionRef = await getDoc(
                doc(
                    db,
                    collections.weekly_post_collections,
                    collectionID.toString()
                )
            );
            if (weeklyPostCollectionRef.exists()) {
                setCollectionData(
                    weeklyPostCollectionRef.data() as WeeklyPostsCollectionsType
                );
            }
        };
        fetchWeeklyPostCollection()

    }, [collectionID]);

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
        return <Loading />;
    }


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
        setVideoUri(
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        );
        setIsRecording(false);
        setCurrentRouteIndex(1);
    };

    const recordVideo = async () => {
        setIsRecording(true);
        let options = {
            quality: VideoQuality["720p"],
            maxDuration: 20,
        };

        const startTime = Date.now();

        const updateElapsedTime = () => {
            let timeElapsed = Math.round((Date.now() - startTime) / 1000);
            if (timeElapsed >= 10){
                stopRecording();
            }
            setTimer(300 - timeElapsed);
        };

        const interval = setInterval(updateElapsedTime, 1000);

        cameraRef.current?.recordAsync(options).then((video) => {
            clearInterval(interval);
            setTimer(300);
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

    const getFormattedTime = () => {

        let minutes = Math.floor(timer / 60); // Calculate the whole number of minutes
        let remainingSeconds = timer % 60; // Calculate the remaining seconds

       let formattedTime =
           minutes +
           ":" +
           (remainingSeconds < 10 ? "0" : "") +
           remainingSeconds.toString().padStart(1, "0");

        return formattedTime;
    }

    if (!permission) {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background }}
            >
                <Text>Permission not granted</Text>
                <Button
                    title="Request Permission"
                    onPress={requestPermission}
                />
            </SafeAreaView>
        );
    }

    if (!permission.granted) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Colors.background,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Permission not granted</Text>
                <Button
                    title="Request Permission"
                    onPress={requestPermission}
                />
            </SafeAreaView>
        );
    }

    if (!user) return <Text>No User Found</Text>;

    if (!collectionID) return <Text>No post collection</Text>;

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
                            ref={cameraRef}
                            style={{ flex: 1, borderRadius: 20 }}
                        >
                            <Text style={localStyles.timer}>
                                {getFormattedTime()}
                            </Text>
                            <View style={localStyles.container}>
                                <TouchableOpacity
                                    style={localStyles.outerButtonContainer}
                                    onPress={
                                        isRecording
                                            ? stopRecording
                                            : recordVideo
                                    }
                                >
                                    <View
                                        style={
                                            isRecording
                                                ? localStyles.innerButtonContainerRecording
                                                : localStyles.innerButtonContainerNotRecording
                                        }
                                    />
                                </TouchableOpacity>
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
    innerButtonContainerNotRecording: {
        height: 55,
        width: 55,
        borderRadius: 50,
        backgroundColor: "red",
    },
    innerButtonContainerRecording: {
        height: 30,
        width: 30,
        backgroundColor: "red",
    },
    button: {
        height: "100%",
        width: "100%",
    },
    timer: {
        position: "relative",
        top: 10,
        left: 10,
        fontSize: 30,
        fontFamily: "gabriel-sans",
        color: "white",
    }
});
