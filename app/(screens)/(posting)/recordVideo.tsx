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
import { Camera, CameraType, VideoQuality } from "expo-camera";
import { AuthContext } from "../../authProvider";
import { PostContext } from "./_layout";
import VideoPreview from "./VideoPreview";
import Loading from "../loading";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const recordVideo = () => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [timer, setTimer] = useState<number>(300);
    const cameraRef = useRef<Camera>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [cameraDirection, setCameraDirection] = useState<CameraType>(
        CameraType.front
    );
    const { firstTimeHighlighted, firstTimePrompt, firstTimeCollectionId } = useLocalSearchParams();



    let lastPress = 0;

    const { user } = useContext(AuthContext);
    const { video, setVideo, setCollectionID, setPrompt, collectionID, prompt, highlight, setHighlight } = useContext(PostContext);

    let beforeHighlight,
        highlightedSection,
        afterHighlight = "";


    useEffect(() => {
        async function getPermissions() {
            requestPermission();
            await Camera.requestMicrophonePermissionsAsync();
        }
        if (firstTimeCollectionId) {
            setCollectionID(parseInt(firstTimeCollectionId as string));
        }

        if (firstTimePrompt) {
            setPrompt(firstTimePrompt as string);
        }

        if (firstTimeHighlighted) {
            setHighlight(firstTimeHighlighted as string);
        }


        getPermissions();

    }, [])


    const splitPrompt = (prompt: string) => {
        const highlightIndex = prompt.indexOf(highlight as string);
        beforeHighlight = prompt.slice(0, highlightIndex);
        highlightedSection = prompt.slice(
            highlightIndex,
            highlightIndex + highlight.length
        );
        afterHighlight = prompt.slice(
            highlightIndex + highlight.length,
            prompt.length
        );
        return [beforeHighlight, highlight, afterHighlight];
    };
    splitPrompt(prompt as string);

    const stopRecording = async () => {
        cameraRef.current?.stopRecording();
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
            setVideo(video.uri);
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

    if (!highlight || !prompt || !collectionID) {
        return <Loading />;
    }

    if (!user) return <Text>No User Found</Text>;

    if (video) {
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
                                {highlightedSection}
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
