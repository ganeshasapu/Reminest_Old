import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    Dimensions,
} from "react-native";
import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { styles } from "../../stylesheets/styles";
import BasicInput from "../../../components/BasicInput";
import Colors from "../../../constants/Colors";
import { useRouter } from "expo-router";
import AppName from "../../../assets/vectors/AppName";
import { RouteContext, UserFormContext } from "./_layout";
import { AntDesign } from "@expo/vector-icons";
import {
    CountryButton,
    CountryItem,
    CountryPicker,
} from "react-native-country-codes-picker";
import { db } from "../../firebase";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { collections, UserType } from "../../schema";
import { FirebaseContext } from "../../auth";

const logo = require("../../../assets/images/fadedLogoIcon.png");

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

const signUpSignIn = () => {
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState("🇨🇦");
    const [pressedLogIn, setPressedLogIn] = useState(false);
    const router = useRouter();

    const {checkLoginStatus} = useContext(FirebaseContext);
    const { setCurrentRouteIndex } = useContext(RouteContext);
    const { setCountryCode, countryCode, phoneNumber, setPhoneNumber } =
        useContext(UserFormContext);


    const handleLogIn = async () => {
        if (phoneNumber.length != 10) {
            Alert.alert("Please enter a valid phone number");
            setPressedLogIn(true);
            return;
        }

        const q = query(
            collection(db, collections.users),
            where("phoneNumber", "==", countryCode + phoneNumber)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            Alert.alert("This phone number is not registered");
            return;
        }

        router.push({
            pathname: "/(screens)/(initializations)/smsconfirmation",
            params: { login: true },
        });
        setCurrentRouteIndex(2);
    };
    const handleSignUp = () => {
        router.push("(screens)/(initializations)/userInitialization");
        setCurrentRouteIndex(1);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background }}
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
                <View style={styles.mainContainer}>
                    <View
                        style={{
                            position: "absolute",
                            left: "28%",
                            top: "15%",
                        }}
                    >
                        <Image
                            source={logo}
                            style={{
                                width: 150,
                                height: 150,
                                position: "absolute",
                                left: "12%",
                                top: "15%",
                            }}
                        />
                        <AppName width={200} height={200} />
                    </View>
                    <View
                        style={{ position: "absolute", left: "25%", top: "0%" }}
                    ></View>
                    <View style={localStyles.emptySpacing} />
                    <Text style={styles.text}>Welcome Back:</Text>
                    <View style={localStyles.phoneNumberContainer}>
                        <TouchableOpacity
                            style={localStyles.countryCodeContainer}
                            onPress={() => setShow(true)}
                        >
                            <Text style={{ fontSize: 20, lineHeight: 35 }}>
                                {flag}
                            </Text>
                            <Text style={{ lineHeight: 35, marginRight: 5 }}>
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
                                        pressedLogIn && phoneNumber.length != 10
                                            ? "red"
                                            : Colors.blue,
                                }}
                                placeholder="Phone Number"
                                maxLength={10}
                            ></BasicInput>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.button, { marginTop: 10 }]}
                        onPress={handleLogIn}
                    >
                        <Text style={[styles.buttonText, { marginRight: 10 }]}>
                            Log In
                        </Text>
                    </TouchableOpacity>

                    <Text style={[styles.text, { marginTop: 60 }]}>
                        Join Reminest:
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, { marginTop: 10 }]}
                        onPress={handleSignUp}
                    >
                        <Text style={[styles.buttonText, { marginRight: 10 }]}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default signUpSignIn;

const localStyles = StyleSheet.create({
    emptySpacing: {
        height: "45%",
    },
    phoneNumberContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        gap: 5,
        marginTop: 10,
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
});
