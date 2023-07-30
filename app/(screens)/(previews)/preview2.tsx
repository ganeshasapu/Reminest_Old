import { Text, View, StyleSheet, SafeAreaView, Dimensions, Image} from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
import PreviewLoading2 from "../../../assets/vectors/PreviewLoading2";
import ArrowNavigation from "../../../components/ArrowNavigation";

const h = Dimensions.get("window").height;
const w = Dimensions.get("window").width;

const preview2 = () => {
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
                    source={require("../../../assets/images/preview2.png")}
                    style={[localStyles.image]}
                />
            </View>

            <View style={localStyles.textContainer}>
                <Text style={[styles.bigtext, localStyles.centerText]}>
                    Suggest prompts for future weeks
                </Text>
            </View>
            <PreviewLoading2 width={30} height={20} />
            <ArrowNavigation
                left={{
                    route: "(screens)/(previews)/preview1",
                }}
                right={{
                    route: "(screens)/(previews)/preview3",
                }}
            />
        </SafeAreaView>
    );
};

export default preview2;

const localStyles = StyleSheet.create({
    centerText: {
        textAlign: "center",
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
        zIndex: -1,
        marginBottom: 15,
        height: h * 0.7,
        width: "100%",
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
