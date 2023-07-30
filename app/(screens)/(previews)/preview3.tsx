import { Text, View, StyleSheet, SafeAreaView, Dimensions, Image } from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
import PreviewLoading3 from "../../../assets/vectors/PreviewLoading3";
import ArrowNavigation from "../../../components/ArrowNavigation";

const h = Dimensions.get("window").height;
const w = Dimensions.get("window").width;

const preview3 = () => {
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
                    source={require("../../../assets/images/preview3.png")}
                    style={[localStyles.image]}
                />
            </View>

            <View style={localStyles.textContainer}>
                <Text style={[styles.bigtext, { textAlign: "center" }]}>
                    Capture your family’s unique story
                </Text>
            </View>
            <PreviewLoading3 width={30} height={20} />
            <ArrowNavigation
                left={{ route: "(screens)/(previews)/preview2" }}
            />
        </SafeAreaView>
    );
};

export default preview3;

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
        width: "100%",
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
    },
});
