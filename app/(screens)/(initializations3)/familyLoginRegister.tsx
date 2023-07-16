import { Dimensions, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../../constants/Colors'
import { styles } from '../../stylesheets/styles'
import { UserFormContext } from "./_layout";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import Icon from "@expo/vector-icons/FontAwesome";
import { useRouter } from 'expo-router'

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const CELL_COUNT = 5;

const familiyLoginRegister = () => {
    const {firstName, lastName} = useContext(UserFormContext)
    const [familyCode, setFamilyCode] = useState<string>("");
    const ref = useBlurOnFulfill({ value: familyCode, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: familyCode,
        setValue: setFamilyCode,
    });

    const router = useRouter();

    const createFamily = () => {
        router.push("(screens)/(initializations3)/familyName");
    };

    useEffect(() => {
        if (familyCode.length === CELL_COUNT) {
            Keyboard.dismiss();
            console.log(familyCode);
        }
    }, [familyCode]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background }}
            >
                <View style={styles.mainContainer}>
                    <View style={localStyles.emptySpacing} />
                    <View style={localStyles.textContainer}>
                        <Text style={localStyles.welcomeText}>Welcome</Text>
                        <Text style={localStyles.nameText}>
                            {firstName + " " + lastName}
                        </Text>
                    </View>
                    <Text
                        style={[
                            localStyles.labelText,
                            { marginTop: 30, marginBottom: 10 },
                        ]}
                    >
                        Have A Family Code?
                    </Text>
                    <CodeField
                        {...props}
                        ref={ref}
                        value={familyCode}
                        onChangeText={setFamilyCode}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                style={[
                                    localStyles.cellContainer,
                                    styles.shadow,
                                    { shadowRadius: 5, shadowOpacity: 0.15 },
                                ]}
                            >
                                <Text
                                    key={index}
                                    style={[
                                        localStyles.cell,
                                        isFocused && localStyles.focusCell,
                                    ]}
                                    onLayout={getCellOnLayoutHandler(index)}
                                >
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                    <Text
                        style={[
                            localStyles.labelText,
                            { marginTop: 30, marginBottom: 10 },
                        ]}
                    >
                        Don't Have One?
                    </Text>
                    <TouchableOpacity
                        style={localStyles.familyCodeButton}
                        onPress={createFamily}
                    >
                        <View style={localStyles.innerButtonContainer}>
                            <Text
                                style={[
                                    styles.text,
                                    { marginRight: 10, color: "#fff" },
                                ]}
                            >
                                Create New Family
                            </Text>
                            <Icon name="send" size={20} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default familiyLoginRegister

const localStyles = StyleSheet.create({
    welcomeText: {
        fontSize: 24,
        fontFamily: "open-sans",
        textAlign: "center",
    },
    emptySpacing: {
        height: h * 0.3,
    },
    nameText: {
        fontFamily: "gabriel-sans",
        fontSize: 34,
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
    cellContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: w / 5 - 20,
        height: 90,
        borderWidth: 1,
        borderColor: Colors.blue,
    },
    cell: {
        lineHeight: 38,
        fontSize: 24,
        textAlign: "center",
        color: "#fff",
    },
    focusCell: {
        borderColor: "#000",
    },
    inputContainer: {
        width: "100%",
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
    innerButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
