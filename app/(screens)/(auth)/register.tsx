import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { firebaseConfig } from "../../firebase";
import { useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { countries } from "./countryvalues";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormContext } from "../(initializations2)/_layout";

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { FirebaseContext } from "../../auth";

const initialFamilyOptions = [
    { title: "Son", selected: false },
    { title: "Daughter", selected: false },
    { title: "Child", selected: false },
    { title: "Mother", selected: false },
    { title: "Father", selected: false },
    { title: "Parent", selected: false },
    { title: "Grandmother", selected: false },
    { title: "Grandfather", selected: false },
    { title: "Grandparent", selected: false },
];

const register = () => {
    const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(
        null
    );
    const [countryCode, setCountryCode] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [familyOptions, setFamilyOptions] = useState(initialFamilyOptions);

    const CELL_COUNT = 6;
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const router = useRouter();

    const context = useContext(FormContext);
    const {
        phoneNumber,
        firstName,
        lastName,
        birthday,
        relationship,
        setPhoneNumber,
        setUid,
        setFirstName,
        setLastName,
        setBirthday,
        setRelationship,
    } = context;

    const { sendVerification, registerUser } = useContext(FirebaseContext);

    const register = () => {
        registerUser(value)
            .then((result: any) => {
                setUid(result.user.uid);
                setPhoneNumber(countryCode + phoneNumber);
                router.push("(screens)/(initializations2)/initialization3");
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const onChange = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate === undefined) return;
        setBirthday(selectedDate);
    };

    const toggleFamilyOption = (title: string) => {
        const newFamilyOptions = familyOptions.map((option) => {
            if (option.title === title) {
                return {
                    ...option,
                    selected: true,
                };
            }
            return {
                ...option,
                selected: false,
            };
        });
        setFamilyOptions(newFamilyOptions);
    };

    useEffect(() => {
        if (value.length === CELL_COUNT) {
            register();
        }
    }, [value]);

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={true}
            />
            <TextInput
                placeholder="Enter your first name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                style={styles.textInput}
                placeholderTextColor={"#fff"}
            />
            <TextInput
                placeholder="Enter your last name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                style={styles.textInput}
                placeholderTextColor={"#fff"}
            />
            <View style={styles.optionsContainer}>
                {familyOptions.map((option) => (
                    <TouchableOpacity
                        style={[
                            styles.familyCodeButton,
                            { opacity: option.selected ? 1 : 0.5 },
                        ]}
                        key={option.title}
                        onPress={() => {
                            toggleFamilyOption(option.title);
                        }}
                    >
                        <Text style={styles.familyOptionText}>
                            {option.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <DateTimePicker
                testID="dateTimePicker"
                value={birthday}
                mode={"date"}
                is24Hour={true}
                onChange={onChange}
            />
            <Text style={styles.otpText}>Login Using Phone Number</Text>
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
                onPress={() =>
                    sendVerification(
                        recaptchaVerifier as MutableRefObject<FirebaseRecaptchaVerifierModal>,
                        countryCode + phoneNumber
                    )
                }
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

export default register;

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
