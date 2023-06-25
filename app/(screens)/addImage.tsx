import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ImageBackground,
    Button,
} from "react-native";
import {
    Camera,
    requestCameraPermissionsAsync,
    CameraType,
    FlashMode,
    CameraCapturedPicture,
} from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, storage } from "../firebase";
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from "firebase/storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collections, mediaType } from "../schema";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FirebaseContext } from "../auth";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
    return (
        <SafeAreaView
            style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%",
            }}
        >
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1,
                }}
            >
                <Button title="Retake" onPress={retakePicture}></Button>
                <Button title="Save" onPress={savePhoto}></Button>
            </ImageBackground>
        </SafeAreaView>
    );
};

const AddImage = () => {
    const [startCamera, setStartCamera] = React.useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] =
        useState<CameraCapturedPicture | null>(null);
    const [cameraType, setCameraType] = React.useState(CameraType.back);
    const [flashMode, setFlashMode] = React.useState(FlashMode.off);

    let camera: Camera | null;

    const router = useRouter();

    const { collectionID, prompt } = useLocalSearchParams();
    const { user } = useContext(FirebaseContext);

    if (!user) return <Text>No User Found</Text>;

    if (!collectionID) return <Text>No Collection ID Found</Text>;

    if (!prompt) return <Text>No Prompt Found</Text>;

    const __startCamera = async () => {
        const { status } = await requestCameraPermissionsAsync();
        if (status === "granted") {
            // start the camera
            setStartCamera(true);
        } else {
            Alert.alert("Access denied");
        }
    };

    const __takePicture = async () => {
        if (!camera) return;
        const photo = await camera.takePictureAsync();
        setPreviewVisible(true);
        setCapturedImage(photo);
    };

    const __retakePicture = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
        __startCamera();
    };

    const __savePhoto = async () => {
        const fileName = `photo_${Date.now()}.jpg`;

        if (!capturedImage) return;
        console.log(capturedImage?.uri);

        const compressedImage = await manipulateAsync(capturedImage?.uri, [], {
            compress: 0.5,
            format: SaveFormat.JPEG,
        });

        const response = await fetch(compressedImage?.uri);
        const blob = await response.blob();

        const storageRef = ref(storage, fileName);

        if (!capturedImage) return;

        uploadBytesResumable(storageRef, blob)
            .then(async (snapshot) => {
                camera = null;
                setCapturedImage(null);

                const downloadURL = await getDownloadURL(snapshot.ref);
                const postData = {
                    like_count: 0,
                    media: [
                        {
                            type: "IMAGE",
                            url: downloadURL,
                        },
                    ] as mediaType[],
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
                await setDoc(
                    collectionRef,
                    {
                        posts: [postRef],
                    },
                    { merge: true }
                );

                const userRef = doc(db, collections.users, user.uid);
                await setDoc(
                    userRef,
                    {
                        posts: [postRef],
                    },
                    { merge: true }
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const __switchCamera = () => {
        if (cameraType === "back") {
            setCameraType(CameraType.front);
        } else {
            setCameraType(CameraType.back);
        }
    };

    const __handleFlashMode = () => {
        if (flashMode === "on") {
            setFlashMode(FlashMode.off);
        } else if (flashMode === FlashMode.off) {
            setFlashMode(FlashMode.on);
        } else {
            setFlashMode(FlashMode.auto);
        }
    };

    if (!startCamera) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    onPress={__startCamera}
                    style={{
                        width: 130,
                        borderRadius: 4,
                        backgroundColor: "#14274e",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 40,
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Take picture
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (previewVisible && capturedImage) {
        return (
            <CameraPreview
                photo={capturedImage}
                savePhoto={__savePhoto}
                retakePicture={__retakePicture}
            />
        );
    }

    return (
        <SafeAreaView
            style={{ flex: 1, width: "100%", padding: 10, paddingTop: 20 }}
        >
            <View style={{ display: "flex", justifyContent: "center" }}>
                <Text style={{ fontSize: 24 }}>{prompt}</Text>
            </View>
            <Camera
                style={{ flex: 1, width: "100%" }}
                ref={(r) => {
                    camera = r;
                }}
                flashMode={flashMode}
                type={cameraType}
            >
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        flexDirection: "row",
                        flex: 1,
                        width: "100%",
                        padding: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            alignSelf: "center",
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        <Button
                            title="Go back"
                            onPress={() => {
                                router.push("(screens)/home");
                            }}
                        />
                        <TouchableOpacity
                            onPress={__takePicture}
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 0,
                                borderRadius: 50,
                                backgroundColor: "#fff",
                            }}
                        />
                        <TouchableOpacity
                            onPress={__switchCamera}
                            style={{
                                marginTop: 20,
                                borderRadius: 25,
                                width: 50,
                                height: 50,
                                backgroundColor: "#f00",
                            }}
                        />
                        <TouchableOpacity
                            onPress={__handleFlashMode}
                            style={{
                                marginTop: 20,
                                borderRadius: 25,
                                width: 50,
                                height: 50,
                                backgroundColor: "#0f0",
                            }}
                        />
                    </View>
                </View>
            </Camera>
        </SafeAreaView>
    );
};

export default AddImage;
