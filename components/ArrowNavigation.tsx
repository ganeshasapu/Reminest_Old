import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { hexToRGBA } from "../utility/hexToRGBA";
import { useRouter } from "expo-router";
import ADIcon from "@expo/vector-icons/AntDesign";
import Colors from "../constants/Colors";

type ArrowNavigationProps = {
    left?: leftEnabled;
    right?: rightEnabled;
};

type leftEnabled = {
    visible?: boolean;
    disabled?: boolean;
    route: string;
    callback?: () => void | Promise<boolean>;
};

type rightEnabled = {
    visible?: boolean;
    disabled?: boolean;
    route: string;
    callback?: () => void | Promise<boolean>;
};

const h = Dimensions.get("window").height;

const ArrowNavigation = (props: ArrowNavigationProps) => {

    let left = props.left
    let right = props.right

    if (props.left){
        left = {
            visible: props.left.visible ?? true,
            disabled: props.left.disabled ?? false,
            route: props.left.route,
            callback: props.left.callback ?? (() => {})
        }
    }
    if (props.right){
        right = {
            visible: props.right.visible ?? true,
            disabled: props.right.disabled ?? false,
            route: props.right.route,
            callback: props.right.callback ?? (() => {}),
        };
    }

    const router = useRouter();

    const leftCallback = left && left.callback ? left.callback : () => {};
    const rightCallback = right && right.callback ? right.callback : () => {};

    async function previous() {
        if (left) {
            const ready = await leftCallback();
            console.log(left.route)
            if (ready === false) return;
            router.push(left.route);
        }
    }

    async function next() {
        if (right) {
            const ready = await rightCallback()
            if (ready === false) return;
            router.push(right.route);
        }
    }

    return (
        <View style={styles.buttonGroupContainer}>
            <View style={styles.buttonGroup}>
                {left && left.visible ? (
                    <TouchableOpacity
                        disabled={left.disabled}
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
                {right && right.visible ? (
                    <TouchableOpacity
                        disabled={right.disabled}
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

export default ArrowNavigation;

const styles = StyleSheet.create({
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: Colors.background,
    },
    navigationButton: {
        borderRadius: (h * 0.1) / 2,
        width: h * 0.08,
        height: h * 0.08,
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
        position: "absolute",
        bottom: h * 0.03,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 36,
        zIndex: 1,
        backgroundColor: Colors.background,
        width: "100%",
    },
});
