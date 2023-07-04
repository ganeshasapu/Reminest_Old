import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { styles } from "../../stylesheets/styles";
import Colors from "../../../constants/Colors";
import PreviewLoading2 from "../../../assets/vectors/PreviewLoading2";
import PreviewPromptCard from "../../../components/PreviewPromptCard";

const preview2 = () => {
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
            <PreviewPromptCard
                text="What is the story of the first time you met your partner?"
                rotation="2deg"
                cardWidth={210}
                cardHeight={240}
                cardLeft={25}
                cardTop={140}
                highlightLeft={13}
                highlightTop={106}
                highlightHeight={25}
                highlightWidth={120}
                color={Colors.orange}
            />
            <PreviewPromptCard
                text="What was school like for you?"
                rotation="5deg"
                cardWidth={200}
                cardHeight={180}
                cardLeft={130}
                cardTop={20}
                highlightLeft={13}
                highlightTop={68}
                highlightHeight={25}
                highlightWidth={86}
                color={Colors.pink}
            />
            <PreviewPromptCard
                text="What is your favourite holiday tradition?"
                rotation="-1deg"
                cardWidth={210}
                cardHeight={240}
                cardLeft={160}
                cardTop={280}
                highlightLeft={13}
                highlightTop={105}
                highlightHeight={52}
                highlightWidth={130}
                color={Colors.purple}
            />

            <View style={localStyles.emptySpacing}></View>
            <View style={localStyles.textContainer}>
                <Text style={[styles.bigtext, localStyles.centerText]}>
                    Suggest prompts for future weeks
                </Text>
            </View>
            <PreviewLoading2 width={30} height={20} />
        </SafeAreaView>
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
});
