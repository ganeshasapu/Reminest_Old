import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import Colors from "../../../constants/Colors";
import { usePathname, useRouter } from "expo-router";
import ADIcon from "@expo/vector-icons/AntDesign";
import { hexToRGBA } from "../../../utility/hexToRGBA";
import { useContext, useEffect } from "react";
import { FormContext, RouteContext } from "./_layout";

const baseRoute = "(screens)/(initializations3)/";
const routes = ["signUpSignIn", "userInitialization"];

const InitializationFlowNav = () => {
    const router = useRouter();
    const pathName = usePathname();

    const { currentRouteIndex, setCurrentRouteIndex } =
        useContext(RouteContext);

    // useEffect(() => {
    //     if (pathName === "/previewVideo") {
    //         setCurrentRouteIndex(1);
    //     }
    // }, [pathName]);


    const previous = () => {
        setCurrentRouteIndex(currentRouteIndex - 1);
        router.push(baseRoute + routes[currentRouteIndex - 1]);
    };

    const next = () => {
        if (pathName === "/userInitialization") {

            router.push(baseRoute + routes[currentRouteIndex + 1]);
        }
        else if (currentRouteIndex < routes.length - 1) {
            setCurrentRouteIndex(currentRouteIndex + 1);
            router.push(baseRoute + routes[currentRouteIndex + 1]);
        }
    };

    if (currentRouteIndex == 0) {
        return <View />;
    }

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
                <TouchableOpacity
                    onPress={next}
                    style={[
                        styles.navigationButton,
                        { backgroundColor: Colors.blue },
                    ]}
                >
                    <ADIcon name="arrowright" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InitializationFlowNav;

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
