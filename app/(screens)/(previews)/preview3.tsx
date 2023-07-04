import { Text, View, StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
import PreviewLoading3 from "../../../assets/vectors/PreviewLoading3";

const image1 = require("../../../assets/images/stock_image4.png");
const image2 = require("../../../assets/images/stock_image5.png");
const image3 = require("../../../assets/images/stock_image6.png");

const preview3 = () => {
    return (
        <SafeAreaView
            style={[
                styles.mainContainer,
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            ]}
        >
            <View style={[localStyles.imageContainer, localStyles.imageOne]}>
                <ImageBackground
                    source={image1}
                    style={[
                        localStyles.image,
                        localStyles.shadow,
                        { transform: [{ rotate: "-4deg" }] },
                    ]}
                />
            </View>

            <View style={[localStyles.imageContainer, localStyles.imageTwo]}>
                <ImageBackground
                    source={image2}
                    style={[
                        localStyles.image,
                        localStyles.shadow,
                        { transform: [{ rotate: "4deg" }] },
                    ]}
                />
            </View>

            <View style={[localStyles.imageContainer, localStyles.imageThree]}>
                <ImageBackground
                    source={image3}
                    style={[
                        localStyles.image,
                        localStyles.shadow,
                        { transform: [{ rotate: "-6deg" }] },
                    ]}
                />
            </View>

            <View style={localStyles.emptySpacing} />
            <View style={localStyles.textContainer}>
                <Text style={[styles.bigtext, { textAlign: "center" }]}>
                    Capture your family’s unique story
                </Text>
            </View>
            <PreviewLoading3 width={30} height={20} />
        </SafeAreaView>
    );
};

export default preview3;

const localStyles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        paddingBottom: 10,
    },
    emptySpacing: {
        height: "100%",
    },
    imageContainer: {
        position: "absolute",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageOne: {
        top: "5%",
        left: "5%",
        width: "85%",
        height: "30%",
    },
    imageTwo: {
        top: "30%",
        right: "5%",
        width: "80%",
        height: "30%",
    },
    imageThree: {
        top: "55%",
        left: "5%",
        width: "80%",
        height: "30%",
    },
});
