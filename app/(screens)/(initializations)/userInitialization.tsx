import {
    Alert,
    Button,
    Dimensions,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../../constants/Colors";
import { styles } from "../../stylesheets/styles";
import LogoDark from "../../../assets/vectors/LogoDark";
import BasicInput from "../../../components/BasicInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
    CountryPicker,
    CountryButton,
    CountryItem,
} from "react-native-country-codes-picker";
import { UserFormContext } from "./_layout";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ArrowNavigation from "../../../components/ArrowNavigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { collections } from "../../../schema";
import { AuthContext } from "../../authProvider";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

function ListHeaderComponent({
    countries,
    lang,
    onPress,
}: {
    countries: CountryItem[];
    lang: string;
    onPress: (country: CountryItem) => any;
}) {
    return (
        <View
            style={{
                paddingBottom: 20,
            }}
        >
            <Text>Popular countries</Text>
            {countries?.map((country: CountryItem, index: number) => {
                return (
                    <CountryButton
                        key={index}
                        item={country}
                        name={country?.name?.[lang || "en"]}
                        onPress={() => onPress(country)}
                    />
                );
            })}
        </View>
    );
}

const userInitialization = () => {
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState("🇨🇦");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const {
        firstName,
        lastName,
        setFirstName,
        setLastName,
        phoneNumber,
        setPhoneNumber,
        birthday,
        setBirthday,
        setRelationships,
        relationships,
        setCountryCode,
        countryCode,
    } = useContext(UserFormContext);

    const {sendVerification} = useContext(AuthContext)

    const handleConfirm = (date: Date) => {
        setBirthday(date);
        setDatePickerVisibility(false);
    };

    async function checkValid() {
        if (firstName === "" || lastName === "" || phoneNumber === "") {
            Alert.alert("Please fill out all fields");
            setInvalid(true);
            return false;
        } else if (phoneNumber.length != 10) {
            Alert.alert("Please enter a valid phone number");
            setInvalid(true);
            return false;
        }

        const q = query(
            collection(db, collections.users),
            where("phoneNumber", "==", countryCode + phoneNumber)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            Alert.alert("This phone number is already registered");
            return false;
        }

        sendVerification(countryCode + phoneNumber)
        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView
                style={
                    {
                        flex: 1,
                        backgroundColor: Colors.background,
                        display: "flex",
                        alignItems: "center",
                    }
                }
            >
                {/* Modal */}
                <CountryPicker
                    show={show}
                    searchMessage="Test"
                    enableModalAvoiding
                    style={{
                        modal: {
                            height: h * 0.5,
                        },
                    }}
                    ListHeaderComponent={ListHeaderComponent}
                    // when picker button press you will get the country object with dial code
                    pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setFlag(item.flag);
                        setShow(false);
                    }}
                    onBackdropPress={() => setShow(false)}
                    lang="en"
                    popularCountries={["ca", "in", "cn"]}
                />
                {/* Modal */}

                <View style={[styles.mainContainer]}>
                    <View>
                        <LogoDark width={40} height={40} />
                    </View>
                    <Text style={[styles.titletext, { marginTop: 10 }]}>
                        Build Your Profile
                    </Text>

                    <View
                        style={{
                            justifyContent: "center",
                            height: h * 0.7,
                        }}
                    >
                        <Text style={[localStyles.labelText]}>
                            What's Your Name?
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                gap: 10,
                            }}
                        >
                            <BasicInput
                                autoCapitalize="words"
                                changeTextHandler={setFirstName}
                                value={firstName}
                                style={{
                                    marginTop: 5,
                                    borderColor:
                                        invalid && firstName == ""
                                            ? "red"
                                            : Colors.blue,
                                    flex: 1,
                                }}
                                placeholder="First Name"
                            ></BasicInput>
                            <BasicInput
                                autoCapitalize="words"
                                changeTextHandler={setLastName}
                                value={lastName}
                                style={{
                                    marginTop: 5,
                                    borderColor:
                                        invalid && lastName == ""
                                            ? "red"
                                            : Colors.blue,
                                    flex: 1,
                                }}
                                placeholder="Last Name"
                            ></BasicInput>
                        </View>
                        <Text
                            style={[
                                { marginTop: 20, marginBottom: 10 },
                                localStyles.labelText,
                            ]}
                        >
                            What's Your Phone Number?
                        </Text>

                        <View style={localStyles.phoneNumberContainer}>
                            <TouchableOpacity
                                style={localStyles.countryCodeContainer}
                                onPress={() => setShow(true)}
                            >
                                <Text style={{ fontSize: 20, lineHeight: 35 }}>
                                    {flag}
                                </Text>
                                <Text
                                    style={{
                                        lineHeight: 35,
                                        marginRight: 5,
                                    }}
                                >
                                    {countryCode}
                                </Text>
                                <View
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}
                                >
                                    <AntDesign
                                        name="caretdown"
                                        size={10}
                                        color={Colors.blue}
                                        style={{}}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <BasicInput
                                    keyboardType="phone-pad"
                                    changeTextHandler={setPhoneNumber}
                                    value={phoneNumber}
                                    style={{
                                        borderColor:
                                            invalid && phoneNumber.length != 10
                                                ? "red"
                                                : Colors.blue,
                                    }}
                                    placeholder="Phone Number"
                                    maxLength={10}
                                ></BasicInput>
                            </View>
                        </View>
                        <Text
                            style={[
                                { marginTop: 20, marginBottom: 10 },
                                localStyles.labelText,
                            ]}
                        >
                            What Is Your Birthday?
                        </Text>
                        <TouchableOpacity
                            style={localStyles.birthdayInput}
                            onPress={() => setDatePickerVisibility(true)}
                        >
                            {birthday ? (
                                <Text style={localStyles.birthdayText}>
                                    {birthday.getMonth() + 1}/
                                    {birthday.getDate()}/
                                    {birthday.getFullYear()}
                                </Text>
                            ) : null}
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={() => setDatePickerVisibility(false)}
                        />

                        <Text
                            style={[
                                localStyles.labelText,
                                { marginTop: 20, marginBottom: 10 },
                            ]}
                        >
                            Select All That Apply:
                        </Text>

                        <View style={localStyles.optionsContainer}>
                            {relationships.map((option) => (
                                <TouchableOpacity
                                    style={[
                                        localStyles.familyCodeButton,
                                        {
                                            backgroundColor: option.selected
                                                ? Colors.blue
                                                : "#442626",
                                            opacity: option.selected ? 1 : 0.5,
                                        },
                                    ]}
                                    key={option.title}
                                    onPress={() => {
                                        setRelationships(option.title);
                                    }}
                                >
                                    <Text style={localStyles.familyOptionText}>
                                        {option.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                <ArrowNavigation
                    left={{
                        route: "(screens)/(initializations)/signUpSignIn",
                    }}
                    right={{
                        callback: checkValid,
                        route: "(screens)/(initializations)/smsconfirmation",
                    }}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default userInitialization;

const localStyles = StyleSheet.create({
    labelText: {
        color: "#442626",
        fontFamily: "archivo",
        fontSize: 16,
    },
    familyCodeButton: {
        padding: 5,
        paddingHorizontal: 7,
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
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 10,
        gap: 5,
    },
    phoneNumberContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        gap: 5,
    },
    countryCodeContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: Colors.blue,
        borderRadius: 7,
        padding: 5,
        height: 45,
    },
    birthdayContainer: {
        display: "flex",
        flexDirection: "row",
    },
    birthdayInput: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: Colors.blue,
        borderRadius: 10,
        padding: 10,
        display: "flex",
        justifyContent: "center",
    },
    birthdayText: {
        color: "#000",
        fontFamily: "archivo",
        fontSize: 16,
    },
});
