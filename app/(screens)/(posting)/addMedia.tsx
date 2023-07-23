import {
    Button,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { styles } from "../../stylesheets/styles";
import Colors from "../../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { FirebaseContext } from "../../auth";
import { PostContext, RouteContext } from "./_layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const addMedia = () => {
    const { user } = useContext(FirebaseContext);
    const { imageUri, setImageUri } = useContext(PostContext);

    const router = useRouter();

    const { currentRouteIndex, setCurrentRouteIndex } =
        useContext(RouteContext);

    if (!user) return <Text>No User Found</Text>;

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
            setCurrentRouteIndex(currentRouteIndex + 1);
            setImageUri(result.assets[0].uri);
        }
    };

    const skipImage = () => {
        console.log("Test")
        router.push("/(screens)/(posting)/confirmPost");
        setCurrentRouteIndex(currentRouteIndex + 1);
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
                        style={{ width: w * 0.9, height: w * 0.9, borderWidth: 1, borderColor: "black" }}
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
                            />
                        </TouchableOpacity>
                        <Text style={localStyles.addImageText}>
                            Click to add a photo
                        </Text>
                        <TouchableOpacity style={localStyles.skipButton} onPress={skipImage}>
                            <Text style={localStyles.skipButtonText}>
                                No Thanks
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
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
