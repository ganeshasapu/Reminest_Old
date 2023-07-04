import { Text, View, StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
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
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        paddingBottom: 10,
    },
    emptySpacing: {
        height: "100%",
    }
});
