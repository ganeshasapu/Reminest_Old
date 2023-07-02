import { Text, View, StyleSheet, ImageBackground, Image, SafeAreaView } from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
import Colors from "../../../constants/Colors";
import PreviewLoading1 from "../../../assets/vectors/PreviewLoading1";

const preview1 = () => {
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
            <ImageBackground
                source={require("../../../assets/images/stock_image7.png")}
                style={[
                    localStyles.image,
                    localStyles.shadow,
                    { top: "5%", left: "30%" },
                ]}
            />
            <ImageBackground
                source={require("../../../assets/images/stock_image8.png")}
                style={[
                    localStyles.image,
                    localStyles.shadow,
                    { top: "22%", left: "5%" },
                ]}
            />
            <View style={localStyles.emptySpacing} />
            <View style={localStyles.textContainer}>
                <Text style={[styles.bigtext, localStyles.centerText]}>
                    Respond to weekly prompts about your family
                </Text>
            </View>
            <PreviewLoading1 width={30} height={20} />
        </SafeAreaView>
    );
};

export default preview1;

const localStyles = StyleSheet.create({
    centerText: {
        textAlign: "center",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: {
        width: "80%",
        height: "80%",
        position: "absolute",
    },
    imageTwoContainer: {
        width: "60%",
        height: "20%",
        position: "absolute",
        top: "50%",
        left: "10%",
        backgroundColor: Colors.background,
    },
    imageTextContainer: {
        backgroundColor: Colors.purple,
        width: "100%",
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    imageTwo: {
        width: "100%",
        height: "100%",
    },
    imageOne: {
        width: "100%",
        height: "100%",
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
    imageOneContainer: {
        position: "absolute",
        top: "0%",
        right: "10%",
        width: "70%",
        height: "60%",
        backgroundColor: Colors.background,
    },
});
