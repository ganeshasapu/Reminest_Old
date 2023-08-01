import {
    Button,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "../../stylesheets/styles";
import Colors from "../../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { AuthContext } from "../../authProvider";
import { PostContext } from "./_layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "../loading";
import ArrowNavigation from "../../../components/ArrowNavigation";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const addMedia = () => {
    const { user } = useContext(AuthContext);
    const { imageUri, setImageUri } = useContext(PostContext);
    const [mediaPermission, setMediaPermission] = useState<null | ImagePicker.MediaLibraryPermissionResponse>(null);

    const router = useRouter();


     async function getMediaPermission() {
        if (mediaPermission) return;

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("You've refused to allow this app to access your photos!");
            return;
        }

        setMediaPermission(permissionResult);
     }

    useEffect(() => {
        getMediaPermission();
    }, [])

    if (!user) return <Text>No User Found</Text>;

    const selectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const skipImage = () => {
        router.push("/(screens)/(posting)/confirmPost");
    }

    async function goingBack(){
        if (!imageUri) return true;
        await Alert.alert(
            "Attention!",
            "If you go back you will lose the current image",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        return false;
                    },
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        router.push("/(screens)/(posting)/recordVideo");
                        setImageUri("");
                        return true;
                    },
                },
            ]
        );
        return false;
    }

    if (mediaPermission === null ){
        return <Loading />
    }

    if (!mediaPermission.granted){
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background, justifyContent: "center", alignItems: "center" }}
            >
                <Text>Permission not granted</Text>
                <Button
                    title="Request Permission"
                    onPress={getMediaPermission}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View
                style={[
                    styles.mainContainer,
                    {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                ]}
            >
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={{
                            width: w * 0.9,
                            height: w * 0.9,
                            borderWidth: 1,
                            borderColor: "black",
                        }}
                    />
                ) : (
                    <View>
                        <TouchableOpacity
                            style={localStyles.imageButton}
                            onPress={selectImage}
                        >
                            <MaterialCommunityIcons
                                name="image-plus"
                                size={50}
                                color="white"
                                style={{ zIndex: 10 }}
                            />
                        </TouchableOpacity>
                        <Text style={localStyles.addImageText}>
                            Click to add a photo
                        </Text>
                        <TouchableOpacity
                            style={localStyles.skipButton}
                            onPress={skipImage}
                        >
                            <Text style={localStyles.skipButtonText}>
                                No Thanks
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <ArrowNavigation
                left={{
                    route: "(screens)/(posting)/recordVideo",
                    callback: goingBack,
                }}
                right={{
                    visible: imageUri ? true : false,
                    route: "(screens)/(posting)/confirmPost",
                }}
            />
        </SafeAreaView>
    );
};

export default addMedia;

const localStyles = StyleSheet.create({
    previewTextBox: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    previewText: {
        fontSize: 18,
        fontFamily: "gabriel-sans",
    },
    imageButton: {
        width: w * 0.4,
        height: w * 0.4,
        backgroundColor: Colors.blue,
        borderRadius: w,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    addImageText: {
        fontSize: 18,
        fontFamily: "gabriel-sans",
        marginTop: 20,
    },
    skipButton: {
        width: w * 0.4,
        height: 40,
        backgroundColor: "#C2C2C2",
        borderRadius: 10,
        marginTop: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    skipButtonText: {
        fontSize: 18,
        fontFamily: "archivo",
        color: "white",
    },
});
