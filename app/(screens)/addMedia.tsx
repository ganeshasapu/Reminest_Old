import React, { useContext, useState } from "react";
import { Button, Image, SafeAreaView, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../firebase";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { mediaType, collections } from "../schema";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FirebaseContext } from "../auth";

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { collectionID, prompt } = useLocalSearchParams();
    const { user } = useContext(FirebaseContext);
    const router = useRouter();

    if (!user) return <Text>No User Found</Text>;

    if (!collectionID) return <Text>No Collection ID Found</Text>;

    if (!prompt) return <Text>No Prompt Found</Text>;

    const selectImage = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission not granted!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            console.log("No image selected!");
            return;
        }

        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${Date.now()}.jpg`);

        uploadBytesResumable(storageRef, blob)
            .then(async (snapshot) => {
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

        router.push("(screens)/feed");
    };


    return (
        <SafeAreaView>
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 200, height: 200 }}
                />
            )}
            <Button title="Select Image" onPress={selectImage} />
            <Button
                title="Upload Image"
                onPress={uploadImage}
                disabled={!selectedImage}
            />
        </SafeAreaView>
    );
};

export default ImageUpload;
