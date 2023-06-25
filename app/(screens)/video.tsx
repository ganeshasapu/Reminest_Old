import React, { useContext, useEffect, useRef, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
} from "react-native";
import {
    Camera,
    CameraType,
    VideoQuality,
    requestCameraPermissionsAsync,
} from "expo-camera";
import { ResizeMode, Video } from "expo-av";
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
    StorageReference,
    uploadBytes,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { db, storage } from "../firebase";
import {
    doc,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { collections } from "../schema";
import { FirebaseContext } from "../auth";

const VideoRecorder = () => {
    const cameraRef = useRef<Camera>(null);
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const [hasCameraPermission, setHasCameraPermission] = useState<
        boolean | null
    >(null);
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState<
        boolean | null
    >(null);

    const { user } = useContext(FirebaseContext);

    if (!user) return <Text>No User Found</Text>;

    useEffect(() => {
        (async () => {
            const cameraPermission = await requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.granted);
            const audioPermission =
                await Camera.requestMicrophonePermissionsAsync();
            setHasMicrophonePermission(audioPermission.granted);
        })();
    }, []);

    if (
        hasCameraPermission === undefined ||
        hasMicrophonePermission === undefined
    ) {
        return <Text>Requesting permissions...</Text>;
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>;
    }

    const recordVideo = async () => {
        setIsRecording(true);
        let options = {
            quality: VideoQuality["720p"],
            maxDuration: 20,
        };

        cameraRef.current?.recordAsync().then((video) => {
            setVideoUri(video.uri);
            setIsRecording(false);
        });
    };

    const stopRecording = async () => {
        cameraRef.current?.stopRecording();
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
                videoURL: downloadURL,
                timestamp: Date.now(),
                author: doc(db, collections.users, user.uid),
            };
            const postCollectionRef = collection(db, collections.posts);
            const postRef = await addDoc(postCollectionRef, postData);

            const userRef = doc(db, collections.users, user.uid);
            await updateDoc(userRef, {
                posts: arrayUnion(postRef),
            });

            // Add more actions as needed
        } catch (error) {
            console.error("Failed to upload video:", error);
        }
    };

    if (videoUri) {
        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{ uri: videoUri }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                />
                <Button title="Save" onPress={saveVideo} />
                <Button title="Retake" onPress={() => setVideoUri(null)} />
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button
                    title={isRecording ? "Stop Recording" : "Record Video"}
                    onPress={isRecording ? stopRecording : recordVideo}
                />
            </View>
        </Camera>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        backgroundColor: "#fff",
        alignSelf: "flex-end",
    },
    video: {
        flex: 1,
        alignSelf: "stretch",
    },
});

export default VideoRecorder;
function put(storageRef: StorageReference, blob: Blob) {
    throw new Error("Function not implemented.");
}
