import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import * as Clipboard from "expo-clipboard";
import { styles } from "../app/stylesheets/styles";


interface FamilyCodeProps {
    code: number;
}

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const FamilyCode = ({ code }: FamilyCodeProps) => {

    const codeString = code.toString();

    return (
        <View style={{ marginVertical: 10 }}>
            <Text
                onPress={() => {
                    Clipboard.setStringAsync(codeString).then(() => {
                        Alert.alert("Copied!", "Send this code to your family");
                    });
                }}
                style={[
                    styles.text,
                    {
                        textAlign: "center",
                        color: Colors.blue,
                        marginBottom: 10,
                    },
                ]}
            >
                Click to copy code
            </Text>
            <View style={localStyles.codeContainer}>
                {codeString.split("").map((character, index) => (
                    <View style={localStyles.numberContainer} key={index}>
                        <Text style={localStyles.number}>{character}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default FamilyCode;

const localStyles = StyleSheet.create({
    codeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: w * 0.5,
        height: 70,
        gap: 10,
    },
    numberContainer: {
        width: w * 0.1,
        height: "100%",
        borderWidth: 1,
        borderColor: Colors.blue,
        backgroundColor: "white",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    number: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "gabriel-sans",
    },
});
