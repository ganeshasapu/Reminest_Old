import { Text, View, StyleSheet, SafeAreaView, Dimensions, Image } from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
import PreviewLoading1 from "../../../assets/vectors/PreviewLoading1";
import ArrowNavigation from "../../../components/ArrowNavigation";

const h = Dimensions.get("window").height;
const w = Dimensions.get("window").width;

const preview1 = () => {
    return (
        <SafeAreaView
            style={[
                styles.mainContainer,
                {
                    display: "flex",
                    alignItems: "center",
                },
            ]}
        >
            <View style={localStyles.imageContainer}>
                <Image
                    source={require("../../../assets/images/preview1.png")}
                    style={[localStyles.image]}
                />
            </View>
            <View style={localStyles.textContainer}>
                <Text style={[styles.bigtext, {textAlign: "center"}]}>
                    Respond to weekly prompts about your family
                </Text>
            </View>
            <PreviewLoading1 width={30} height={20} />
            <ArrowNavigation
                right={{
                    route: "(screens)/(previews)/preview2",
                }}
            />
        </SafeAreaView>
    );
};

export default preview1;

const localStyles = StyleSheet.create({
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        paddingBottom: 10,
    },
    imageContainer: {
        zIndex: -1,
        marginBottom: 15,
        height: h * 0.7,
        width: w,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
