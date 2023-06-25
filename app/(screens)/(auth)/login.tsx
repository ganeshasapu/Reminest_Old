import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
} from "react-native";
import {
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { FirebaseContext } from "../../auth";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { firebaseConfig } from "../../firebase";
import { countries } from "./countryvalues";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Colors from "../../../constants/Colors";

const Login = () => {
    const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(
        null
    );
    const [countryCode, setCountryCode] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const CELL_COUNT = 6;
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [phoneNumber, setPhoneNumber] = useState("");

    const { sendVerification, confirmCode } = useContext(FirebaseContext);

    useEffect(() => {
        if (value.length === CELL_COUNT) {
            confirmCode(value);
        }
    }, [value]);

    return (
        <View style={styles.container}>
            <Text style={styles.otpText}>Login Using Phone Number</Text>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={true}
            />
            <Dropdown
                style={[
                    dropDownStyles.dropdown,
                    isFocus && { borderColor: "blue" },
                ]}
                placeholderStyle={dropDownStyles.placeholderStyle}
                selectedTextStyle={dropDownStyles.selectedTextStyle}
                inputSearchStyle={dropDownStyles.inputSearchStyle}
                iconStyle={dropDownStyles.iconStyle}
                data={countries}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select item" : "..."}
                searchPlaceholder="Search..."
                value={countryCode}
                onFocus={() => setIsFocus(true)}
                renderItem={(item: any, selected: any) => {
                    return (
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 5,
                                borderColor: "#ccc",
                                borderWidth: 1,
                                padding: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {item.emoji}
                                {item.label}
                            </Text>
                        </View>
                    );
                }}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    setCountryCode(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={dropDownStyles.icon}
                        color={isFocus ? "green" : "white"}
                        name="Safety"
                        size={20}
                    />
                )}
            />
            <TextInput
                placeholder="Phone Number with Country Code"
                value={countryCode + phoneNumber}
                keyboardType="phone-pad"
                autoComplete="tel"
                onChangeText={(text) =>
                    setPhoneNumber(text.replace(countryCode, ""))
                }
                style={styles.textInput}
            />
            <TouchableOpacity
                onPress={() => {
                    sendVerification(
                        recaptchaVerifier as MutableRefObject<FirebaseRecaptchaVerifierModal>,
                        countryCode + phoneNumber
                    );
                }}
                style={styles.sendVerification}
            >
                <Text style={styles.buttonText}>Send Verification</Text>
            </TouchableOpacity>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        textAlign: "center",
        color: "#fff",
    },
    sendVerification: {
        padding: 20,
        backgroundColor: "#3498db",
        borderRadius: 10,
    },
    sendCode: {
        padding: 20,
        backgroundColor: "#9b59b6",
        borderRadius: 10,
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
    },
    otpText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        margin: 20,
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: "#fff",
        textAlign: "center",
        color: "#fff",
    },
    focusCell: {
        borderColor: "#000",
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
    },
    placeholderStyles: {
        color: "grey",
    },
    familyCodeButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    familyOptionText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    optionsContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 10,
        gap: 5,
    },
});

const dropDownStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
    },
    dropdown: {
        width: 300,
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#fff",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#fff",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: "#000",
    },
});
