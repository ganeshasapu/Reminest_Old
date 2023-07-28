import { StyleSheet, TouchableOpacity, View, Alert} from "react-native";
import Colors from "../../../constants/Colors";
import { usePathname, useRouter } from "expo-router";
import ADIcon from "@expo/vector-icons/AntDesign";
import { hexToRGBA } from "../../../utility/hexToRGBA";
import { useContext, useEffect } from "react";
import { PostContext, RouteContext } from "./_layout";

const baseRoute = "(screens)/(posting)/";
const routes = ["recordVideo", "previewVideo", "addMedia", "previewImage", "confirmPost"];

const PostingFlowNav = () => {
    const router = useRouter();
    const pathName = usePathname();

    const { currentRouteIndex, setCurrentRouteIndex } = useContext(RouteContext)
    const { setVideoUri, imageUri, setImageUri } = useContext(PostContext);

    useEffect(() => {
        if (pathName === "/previewVideo") {
            setCurrentRouteIndex(1);
        }
    }, [pathName]);

    const previous = () => {
        console.log("test")
        if (currentRouteIndex == 1) {
            Alert.alert("Attention!", "If you go back you will lose the current recording", [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => {
                    router.push(baseRoute + routes[currentRouteIndex - 1])
                    setCurrentRouteIndex(currentRouteIndex - 1);
                    setVideoUri("")
                }},
            ]);
        }
        else if (currentRouteIndex == 2){
             setCurrentRouteIndex(currentRouteIndex - 1);
             router.push(baseRoute + routes[currentRouteIndex - 2]);
        }
        else if (currentRouteIndex == 3) {

             Alert.alert(
                 "Attention!",
                 "If you go back you will lose the current Image",
                 [
                     {
                         text: "Cancel",
                         onPress: () => console.log("Cancel Pressed"),
                         style: "cancel",
                     },
                     {
                         text: "OK",
                         onPress: () => {
                             router.push(
                                 baseRoute + routes[currentRouteIndex - 1]
                             );
                             setCurrentRouteIndex(currentRouteIndex - 1);
                             setImageUri("");
                         },
                     },
                 ]
             );
        }
        else if (currentRouteIndex == 4){
            setCurrentRouteIndex(currentRouteIndex - 1);
            router.push(baseRoute + routes[currentRouteIndex - 2]);
        }
        else if (currentRouteIndex > 0) {
            setCurrentRouteIndex(currentRouteIndex - 1);
            router.push(baseRoute + routes[currentRouteIndex - 1]);
        }
    };




    const next = () => {
        if (currentRouteIndex < routes.length - 1) {
            setCurrentRouteIndex(currentRouteIndex + 1);
            router.push(baseRoute + routes[currentRouteIndex + 1]);
        }
    };

    if (currentRouteIndex == 0) {
        return <View />;
    }


    console.log(currentRouteIndex)


    return (
        <View style={styles.buttonGroupContainer}>
            <View style={styles.buttonGroup}>
                {currentRouteIndex != 0 ? (
                    <TouchableOpacity
                        onPress={previous}
                        style={[
                            styles.navigationButton,
                            { backgroundColor: hexToRGBA(Colors.blue, 0.5) },
                        ]}
                    >
                        <ADIcon name="arrowleft" size={30} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
                {currentRouteIndex == routes.length - 1 || (currentRouteIndex == 2 && imageUri == "") ? null : (
                    <TouchableOpacity
                        onPress={next}
                        style={[
                            styles.navigationButton,
                            { backgroundColor: Colors.blue },
                        ]}
                    >
                        <ADIcon name="arrowright" size={30} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default PostingFlowNav;

const styles = StyleSheet.create({
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
        backgroundColor: Colors.background,
    },
    navigationButton: {
        padding: 10,
        borderRadius: 65 / 2,
        width: 65,
        height: 65,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonGroupContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 36,
        zIndex: -1,
        backgroundColor: Colors.background,
        paddingBottom: 36,
        width: "100%",
    },
});
