import { Text, View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
import Colors from "../../../constants/Colors";
import PreviewLoading2 from "../../../assets/vectors/PreviewLoading2";

const preview2 = () => {
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
            <View
                style={[
                    localStyles.textBubbleContainer,
                    localStyles.shadow,
                    localStyles.bubbleOne,
                ]}
            >
                <Text style={[styles.text, localStyles.bubbleText]}>
                    What is your favourite Chinese New Year Memory?
                </Text>
            </View>

            <View style={[localStyles.imageContainer]}>
                <ImageBackground
                    source={require("../../../assets/images/stock_image3.png")}
                    style={[localStyles.image, localStyles.shadow]}
                    imageStyle={{ borderRadius: 10 }}
                />
            </View>

            <View
                style={[
                    localStyles.textBubbleContainer,
                    localStyles.shadow,
                    localStyles.bubbleTwo,
                ]}
            >
                <Text style={[styles.text, localStyles.bubbleText]}>
                    “Preparing the new year’s eve dinner! I remember....”
                </Text>
            </View>

            <View
                style={[
                    localStyles.textBubbleContainer,
                    localStyles.shadow,
                    localStyles.bubbleThree,
                ]}
            >
                <Text style={[styles.text, localStyles.bubbleText]}>
                    What Christmas traditions were around when you were a kid?
                </Text>
            </View>

            <View style={localStyles.emptySpacing} />
            <View style={localStyles.textContainer}>
                <Text style={[styles.bigtext, localStyles.centerText]}>
                    Suggest prompts for future weeks
                </Text>
                <Text
                    style={[
                        styles.text,
                        localStyles.centerText,
                        { marginTop: 10 },
                    ]}
                >
                    Learn more about your family's past and history
                </Text>
            </View>
            <PreviewLoading2 width={30} height={20} />
        </View>
    );
};

export default preview2;

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
        top: "20%",
        right: "10%",
        width: "90%",
        height: "30%",
    },
    image:{
        width: "100%",
        height: "100%",
    },
    textBubbleContainer: {
        position: "absolute",
        backgroundColor: Colors.orange,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    bubbleOne: {
        top: "5%",
        left: "10%",
        width: "70%",
        height: "10%",
        backgroundColor: Colors.orange,
    },
    bubbleTwo: {
        top: "55%",
        right: "10%",
        width: "65%",
        height: "10%",
        backgroundColor: Colors.pink,
    },
    bubbleThree: {
        top: "70%",
        right: "10%",
        width: "75%",
        height: "10%",
        backgroundColor: Colors.orange,
    },
    bubbleText: {
        paddingHorizontal: 10,
    },
});
