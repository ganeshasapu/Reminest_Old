import {
    Alert,
    Dimensions,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "../../stylesheets/styles";
import Colors from "../../../constants/Colors";
import BasicInput from "../../../components/BasicInput";
import { FamilyFormContext, UserFormContext } from "./_layout";
import ArrowNavigation from "../../../components/ArrowNavigation";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const familyName = () => {

    const { firstName, lastName } = useContext(UserFormContext);
    const { familyName, setFamilyName } = useContext(FamilyFormContext);
    const [invalid, setInvalid] = useState<boolean>(false);

    async function checkValid(){
        if (familyName == ""){
            setInvalid(true)
            Alert.alert("Please enter a family name");
            return false
        }
        return true
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background }}
            >
                <View style={styles.mainContainer}>
                    <View style={localStyles.emptySpacing} />
                    <View style={localStyles.textContainer}>
                        <Text style={localStyles.welcomeText}>Hello</Text>
                        <Text style={localStyles.nameText}>
                            {firstName + " " + lastName}
                        </Text>
                    </View>
                    <Text
                        style={[
                            localStyles.labelText,
                            { marginTop: 40, marginBottom: 5 },
                        ]}
                    >
                        What Is Your Family Name?
                    </Text>
                    <BasicInput
                        changeTextHandler={setFamilyName}
                        autoFocus={true}
                        autoCapitalize="words"
                        value={familyName}
                        style={{
                            marginTop: 5,
                            borderColor:
                                invalid && familyName == ""
                                    ? "red"
                                    : Colors.blue,
                        }}
                        placeholder="Family Name"
                    ></BasicInput>
                </View>
                <ArrowNavigation
                    left={{
                        route: "(screens)/(initializations)/familyLoginRegister",
                    }}
                    right={{
                        callback: checkValid,
                        route: "(screens)/(initializations)/familyInterests",
                    }}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default familyName;

const localStyles = StyleSheet.create({
    emptySpacing: {
        height: h * 0.3,
    },
    nameText: {
        fontFamily: "gabriel-sans",
        fontSize: 34,
        textAlign: "center",
    },
    welcomeText: {
        fontSize: 24,
        fontFamily: "open-sans",
        textAlign: "center",
    },
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    labelText: {
        color: "#442626",
        fontFamily: "archivo",
        fontSize: 16,
    },
});
