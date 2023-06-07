import { Text, View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
import Colors from "../../../constants/Colors";
import PreviewLoading3 from "../../../assets/vectors/PreviewLoading3";

const preview3 = () => {



    return (
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
            <View style={[localStyles.imageContainer, localStyles.imageOne]}>
                <ImageBackground
                    source={require("../../../assets/images/stock_image4.png")}
                    style={[localStyles.image, localStyles.shadow]}
                />
            </View>

            <View style={[localStyles.imageContainer, localStyles.imageTwo]}>
                <ImageBackground
                    source={require("../../../assets/images/stock_image5.png")}
                    style={[localStyles.image, localStyles.shadow]}
                />
            </View>

            <View style={[localStyles.imageContainer, localStyles.imageThree]}>
                <ImageBackground
                    source={require("../../../assets/images/stock_image6.png")}
                    style={[localStyles.image, localStyles.shadow]}
                />
            </View>

            <View style={localStyles.emptySpacing} />
            <View style={localStyles.textContainer}>
                <Text style={[styles.bigtext, localStyles.centerText]}>
                    Capture your family’s unique story
                </Text>
                <Text
                    style={[
                        styles.text,
                        localStyles.centerText,
                        { marginTop: 10 },
                    ]}
                >
                    Start building your digital archive for future generations
                </Text>
            </View>
            <PreviewLoading3 width={30} height={20} />
        </View>
    );
};

export default preview3;

const localStyles = StyleSheet.create({
    centerText: {
        textAlign: "center",
    },
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
