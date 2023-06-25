import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import {
    Camera,
    VideoQuality,
    requestCameraPermissionsAsync,
} from "expo-camera";
import { ResizeMode, Video } from "expo-av";
import {
    ref,
    getDownloadURL,
    StorageReference,
    uploadBytes,
} from "firebase/storage";
import { db, storage } from "../firebase";
import {
    doc,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { collections, mediaType } from "../schema";
import { FirebaseContext } from "../auth";
import { useLocalSearchParams, useRouter } from "expo-router";

const VideoRecorder = () => {
    const cameraRef = useRef<Camera>(null);
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const { collectionID, prompt } = useLocalSearchParams();

    const router = useRouter();

    if (!collectionID) return <Text>No Collection ID Found</Text>;

    if (!prompt) return <Text>No Prompt Found</Text>;

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
                collectionID.toString()
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
        <SafeAreaView
            style={{ flex: 1, width: "100%", padding: 10, paddingTop: 20 }}
        >
            <View style={{ display: "flex", justifyContent: "center" }}>
                <View style={{ display: "flex", justifyContent: "center" }}>
                    <Text style={{ fontSize: 24 }}>{prompt}</Text>
                </View>
            </View>
            <Camera style={styles.container} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <Button
                        title={isRecording ? "Stop Recording" : "Record Video"}
                        onPress={isRecording ? stopRecording : recordVideo}
                    />
                </View>
            </Camera>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
