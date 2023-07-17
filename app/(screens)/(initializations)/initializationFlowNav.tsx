import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import Colors from "../../../constants/Colors";
import { usePathname, useRouter } from "expo-router";
import ADIcon from "@expo/vector-icons/AntDesign";
import { hexToRGBA } from "../../../utility/hexToRGBA";
import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { UserFormContext, RouteContext, FamilyFormContext } from "./_layout";
import { FirebaseContext } from "../../auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { db, firebaseConfig } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { collections } from "../../schema";

const baseRoute = "(screens)/(initializations)/";
const routes = [
    "signUpSignIn",
    "userInitialization",
    "smsconfirmation",
    "familyLoginRegister",
    "familyName",
    "familyInterests",
    "startReminest"
];

const InitializationFlowNav = () => {
    const router = useRouter();
    const pathName = usePathname();

    const { currentRouteIndex, setCurrentRouteIndex } =
        useContext(RouteContext);

    const {
        firstName,
        lastName,
        phoneNumber,
        countryCode,
        setUserInitializationPressedNext,
    } = useContext(UserFormContext);

    const {familyName, setFamilyNamePressedNext} = useContext(FamilyFormContext)


    useEffect(() => {
        if (pathName === "/familyLoginRegister") {
            setCurrentRouteIndex(3);
        }
        else if (pathName === "/familyName") {
            setCurrentRouteIndex(4);
        }
    }, [pathName]);


    const previous = () => {
        setCurrentRouteIndex(currentRouteIndex - 1);
        router.push(baseRoute + routes[currentRouteIndex - 1]);
    };

    const next = async () => {
        if (pathName === "/userInitialization") {
            if (firstName === "" || lastName === "" || phoneNumber === "") {
                Alert.alert("Please fill out all fields")
                setUserInitializationPressedNext(true)
                return
            }
            else if (phoneNumber.length != 10) {
                Alert.alert("Please enter a valid phone number")
                setUserInitializationPressedNext(true)
                return
            }

             const q = query(
                 collection(db, collections.users),
                 where("phoneNumber", "==", countryCode + phoneNumber)
             );

             const querySnapshot = await getDocs(q);

             if (!querySnapshot.empty) {
                 Alert.alert("This phone number is already registered");
                 return;
             } else {
                 setCurrentRouteIndex(currentRouteIndex + 1);
                 router.push(baseRoute + routes[currentRouteIndex + 1]);
             }
        }
        else if (pathName === "/familyName"){
            if (familyName === "") {
                Alert.alert("Please fill out all fields")
                setFamilyNamePressedNext(true)
            }
            else{
                setCurrentRouteIndex(currentRouteIndex + 1);
                router.push(baseRoute + routes[currentRouteIndex + 1]);
            }
        }
        else if (currentRouteIndex < routes.length - 1) {
            setCurrentRouteIndex(currentRouteIndex + 1);
            router.push(baseRoute + routes[currentRouteIndex + 1]);
        }
    };

    return (
        <View style={styles.buttonGroupContainer}>
            <View style={styles.buttonGroup}>
                {currentRouteIndex != 0 ? (
                    <TouchableOpacity
                        onPress={previous}
                        style={[
                            styles.navigationButton,
                            { backgroundColor: hexToRGBA(Colors.blue, 0.5) },
                        ]}
                    >
                        <ADIcon name="arrowleft" size={30} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
                {currentRouteIndex != 0 && currentRouteIndex != 2 && currentRouteIndex != 3  && currentRouteIndex != 6 ? <TouchableOpacity
                    onPress={next}
                    style={[
                        styles.navigationButton,
                        { backgroundColor: Colors.blue },
                    ]}
                >
                    <ADIcon name="arrowright" size={30} color="#fff" />
                </TouchableOpacity> : null}
            </View>
        </View>
    );
};

export default InitializationFlowNav;

const styles = StyleSheet.create({
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
        backgroundColor: Colors.background,
    },
    navigationButton: {
        padding: 10,
        borderRadius: 65 / 2,
        width: 65,
        height: 65,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonGroupContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 36,
        zIndex: -1,
        backgroundColor: Colors.background,
        paddingBottom: 36,
        width: "100%",
    },
});
