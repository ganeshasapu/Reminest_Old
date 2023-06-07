import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../../constants/Colors";
import Icon from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { styles } from "../../stylesheets/styles";
import BasicInput from "../../../components/BasicInput";
import LogoBackgroundFaded from "../../../assets/vectors/LogoBackgroundFaded";


const initialization1 = ({ }: any) => {
    const [familyCode, onChangeFamilyCode] = useState<string>("");

    const router = useRouter();
    const createFamily = () => {
        router.push("(screens)/(initializations)/initialization2");
    };

    const handleFamilyCodeChange = (inputText: string) => {
        onChangeFamilyCode(inputText);
    };

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
                style={{
                    position: "absolute",
                    left: "10%",
                    top: "20%",
                    width: "100%",
                    height: "40%",
                }}
            >
                <View style={{ position: "absolute", left: "0%", top: "0%" }}>
                    <LogoBackgroundFaded width={325} height={325} />
                </View>
                <View style={localStyles.bigTextContainer}>
                    <Text style={[styles.titletext, { textAlign: "center" }]}>
                        Start recording your family stories today
                    </Text>
                </View>
            </View>
            <View style={localStyles.emptySpacing} />
            <KeyboardAvoidingView
                style={localStyles.inputContainer}
                keyboardVerticalOffset={50}
                behavior="padding"
            >
                <Text style={styles.text}>Have a family code?</Text>
                <BasicInput
                    value={familyCode}
                    style={{ marginBottom: 20, marginTop: 5 }}
                    changeTextHandler={handleFamilyCodeChange}
                />
            </KeyboardAvoidingView>
            <View style={localStyles.inputContainer}>
                <Text style={styles.text}>Don't Have One?</Text>
                <TouchableOpacity
                    style={localStyles.familyCodeButton}
                    onPress={createFamily}
                >
                    <View style={localStyles.innerButtonContainer}>
                        <Text style={[styles.text, { marginRight: 10 }]}>
                            Create New Family
                        </Text>
                        <Icon name="send" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default initialization1;

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    bigTextContainer: {
        width: "80%",
        position: "absolute",
        top: "40%",
        left: "5%",
    },
    emptySpacing: {
        height: "55%",
    },
    inputContainer: {
        width: "100%",
    },
    leftAlignedText: {
        textAlign: "left",
    },
    familyCodeButton: {
        backgroundColor: Colors.blue,
        borderRadius: 10,
        width: "100%",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        marginRight: 10,
    },
    innerButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
