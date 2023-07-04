import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { usePathname, useRouter } from "expo-router";
import ADIcon from "@expo/vector-icons/AntDesign";
import { hexToRGBA } from "../utility/hexToRGBA";
import { useState, useEffect } from "react";
import LogoBackgroundFaded from "../assets/vectors/LogoBackgroundFaded";

const baseRoute = "(screens)/(initializations3)/";
const routes = [
    "signUpSignIn",
    "userInitialization",
    "initialization3",
    "initialization4",
    "initialization5",
];

const InitializationScreenNav = () => {
    const [currentRouteIndex, setCurrentRouteIndex] = useState(0);

    const pathName = usePathname();

    useEffect(() => {
        if (pathName === "/initialization2") {
            setCurrentRouteIndex(1);
        }
        if (pathName === "/initialization4") {
            setCurrentRouteIndex(3);
        }
    }, [pathName]);

    const router = useRouter();

    const previous = () => {
        if (currentRouteIndex > 0) {
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

    return (
        <View style={styles.buttonGroupContainer}>
            <View style={styles.buttonGroup}>
                {currentRouteIndex == 0 ? (
                    <View style={{ width: 65, height: 65 }} />
                ) : currentRouteIndex == 4 ? (
                    <TouchableOpacity
                        onPress={previous}
                        style={[
                            styles.navigationButton,
                            {
                                backgroundColor: hexToRGBA(Colors.blue, 0.5),
                                width: 45,
                                height: 45,
                            },
                        ]}
                    >
                        <ADIcon name="arrowleft" size={30} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={previous}
                        style={[
                            styles.navigationButton,
                            { backgroundColor: hexToRGBA(Colors.blue, 0.5) },
                        ]}
                    >
                        <ADIcon name="arrowleft" size={30} color="#fff" />
                    </TouchableOpacity>
                )}
                {currentRouteIndex != 0 ? (
                    <View
                        style={{
                            position: "absolute",
                            left: "40%",
                            bottom: "5%",
                        }}
                    >
                        <LogoBackgroundFaded width={80} height={80} />
                    </View>
                ) : null}
                {currentRouteIndex != routes.length - 1 &&
                currentRouteIndex != 0 ? (
                    <TouchableOpacity
                        onPress={next}
                        style={[
                            styles.navigationButton,
                            { backgroundColor: Colors.blue },
                        ]}
                    >
                        <ADIcon name="arrowright" size={30} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 65, height: 65 }} />
                )}
            </View>
        </View>
    );
};

export default InitializationScreenNav;

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
        zIndex: -1,
        backgroundColor: Colors.background,
        paddingBottom: 36,
        paddingHorizontal: 20,
        width: "100%",
    },
});
