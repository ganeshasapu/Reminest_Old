import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../../../constants/Colors";
import { styles } from "../../stylesheets/styles";
import { useRouter } from "expo-router";
import { AuthContext } from "../../authProvider";
import PlayButtonIcon from "../../../assets/vectors/PlayButtonIcon";
import { PostContext } from "./_layout";
import Loading from "../loading";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ArrowNavigation from "../../../components/ArrowNavigation";
import { supabase } from "../../../supabase";
import { createNewPost, fetchFamilyFromUserId } from "../../../db";
import * as FileSystem from "expo-file-system"
import { decode } from "base64-arraybuffer";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const CHUNK_SIZE = 1024 * 1024;

const confirmPost = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const [familyId, setFamilyId] = useState<number | null>(null);

    if (!user) return <Text>No User Found</Text>;

    const { thumbnailUri, image, prompt, video, collectionID } =
        useContext(PostContext);

    const [ uploadProgress, setUploadProgress ] = useState(0);


    // const videoUri = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
    // const thumbnailUri = "https://picsum.photos/seed/696/3000/2000";
    // const imageUri = "https://picsum.photos/seed/696/3000/2000";
    // // const imageUri = ""
    // const prompt = "What is your favorite color?";
    // const collectionID = 1;

    useEffect(() =>{
        async function getFamilyId(){
            if (!user) return;
            const family = await fetchFamilyFromUserId(user.id);

            if (!family || !family.id) return;
            setFamilyId(family.id);
        }
        getFamilyId();
    }, [user])

    const saveImage = async (): Promise<string> => {
        if (!image) return "";

        const base64 = await FileSystem.readAsStringAsync(image.uri, {encoding: 'base64'})
        const filePath = "images/image_" + Date.now() + ".png";
        const contentType = "image/png";
        const {data, error} = await supabase.storage.from('PostMedia').upload(filePath, decode(base64), {contentType: contentType})

        if (!data) {
            console.error("No Data found");
            return "";
        }

        const { data: download } = await supabase.storage
            .from("PostMedia")
            .getPublicUrl(data.path);

        if(error){
            console.error(error)
            return "";
        }

        return download.publicUrl;

    };

    const saveVideo = async (): Promise<string> => {
        if (!video) return "";

        const base64 = await FileSystem.readAsStringAsync(video, {
            encoding: "base64",
        });
        const filePath = "videos/video_" + Date.now() + ".mp4";
        const contentType = "video/mp4";

        const { data, error } = await supabase.storage
            .from("PostMedia")
            .upload(filePath, decode(base64), { contentType: contentType });

        if (!data) {
            console.error("No Data found")
            return ""
        }

        const {data: download} = await supabase.storage.from("PostMedia").getPublicUrl(data.path)

        if (error) {
            console.error(error);
            return "";
        }
        return download.publicUrl;
    };

    async function createPost(){
        const videoDownloadUrl = await saveVideo();
        const imageDownloadUrl = await saveImage();

        if (!videoDownloadUrl || !familyId || !imageDownloadUrl || !user || !collectionID) return;

        await createNewPost(videoDownloadUrl, imageDownloadUrl, collectionID, user);

        router.push("(screens)/feed");
    };

    if (!thumbnailUri || !image || !prompt || !collectionID || !video) {
        <SafeAreaView>
            <Loading />
        </SafeAreaView>;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.mainContainer}>
                <View style={{ height: h * 0.1 }} />
                <View style={localStyles.mediaContainer}>
                    <View
                        style={[localStyles.thumbnailContainer, styles.shadow]}
                    >
                        <Image
                            source={{ uri: thumbnailUri }}
                            style={[localStyles.videoThumbnail]}
                        />
                        <PlayButtonIcon
                            style={localStyles.playButtonIcon}
                            width={50}
                            height={50}
                        />
                    </View>
                    <View style={[localStyles.imageContainer, styles.shadow]}>
                        {image ? (
                            <Image
                                source={{ uri: image.uri }}
                                style={[localStyles.image]}
                            />
                        ) : (
                            <View style={{ justifyContent: "center", alignItems: "center"}}>
                            <MaterialCommunityIcons
                                name="image-off"
                                size={85}
                                color="#442626"
                            />
                            </View>
                        )}
                    </View>
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
                    {uploadProgress > 0 ? (
                        <Text style={localStyles.progressTest}>
                            {"Upload Progress: " +
                                uploadProgress.toFixed(0) +
                                "%"}
                        </Text>
                    ) : null}
                </View>
            </View>
            <ArrowNavigation left={{route: "(screens)/(posting)/addMedia"}} />
        </SafeAreaView>
    );
};

export default confirmPost;

const localStyles = StyleSheet.create({
    thumbnailContainer: {
        width: w * 0.4,
        height: w * 0.4 * (16 / 9),
        borderRadius: 10,
    },
    videoThumbnail: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    mediaContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        height: h * 0.5,
    },
    imageContainer: {
        width: w * 0.4,
        height: w * 0.4 * (16 / 9),
        display: "flex",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: Colors.background,
    },
    image: {
        width: w * 0.4,
        height: w * 0.4,
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
        marginBottom: 10
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
    playButtonIcon: {
        position: "absolute",
        top: w * 0.2 * (16 / 9) - 25,
        left: w * 0.2 - 25,
        zIndex: 5,
    },
    progressTest: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: "gabriel-sans",
    }
});
