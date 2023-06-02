import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { useRouter } from "expo-router";
import ADIcon from "@expo/vector-icons/AntDesign";
import { hexToRGBA } from "../utility/hexToRGBA";
import { useState } from "react";

const baseRoute = "(screens)/(previews)/";
const routes = ["preview1", "preview2", "preview3"]

const PreviewScreenNav = () => {
    const [currentRouteIndex, setCurrentRouteIndex] = useState(0);

    const router = useRouter();

    const previous = () => {
        if (currentRouteIndex > 0) {
            setCurrentRouteIndex(currentRouteIndex - 1);
            router.push(baseRoute + routes[currentRouteIndex - 1])
        }
    };

    const next = () => {
        if (currentRouteIndex < routes.length - 1) {
            setCurrentRouteIndex(currentRouteIndex + 1);
            router.push(baseRoute + routes[currentRouteIndex + 1]);
        }
    };


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
                {currentRouteIndex != routes.length - 1 ? (
                    <TouchableOpacity
                        onPress={next}
                        style={[
                            styles.navigationButton,
                            { backgroundColor: Colors.blue},
                        ]}
                    >
                        <ADIcon name="arrowright" size={30} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
            </View>
        </View>
    );
};

export default PreviewScreenNav;

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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 12,
        shadowOpacity: 0.5,
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
