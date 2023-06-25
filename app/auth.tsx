import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    PhoneAuthProvider,
    User,
    UserCredential,
    signInWithCredential,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "expo-router";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { MutableRefObject } from "react";

interface FirebaseContextProps {
    user: User | null;
    loading: boolean;
    loginUser: (email: string, password: string) => void;
    logoutUser: () => void;
    sendVerification: (
        recaptchaVerifier: MutableRefObject<FirebaseRecaptchaVerifierModal>,
        fullNumber: string
    ) => void;
    confirmCode: (code: string) => void;
    registerUser: (code: string) => Promise<UserCredential>;
}

const FirebaseContext = createContext({} as FirebaseContextProps);

const FirebaseProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [verificationId, setVerificationId] = useState("");

    const router = useRouter();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const sendVerification = (
        recaptchaVerifier: MutableRefObject<FirebaseRecaptchaVerifierModal>,
        fullNumber: string
    ) => {
        if (recaptchaVerifier.current == null) return;
        const phoneProvider = new PhoneAuthProvider(auth);
        phoneProvider
            .verifyPhoneNumber(fullNumber, recaptchaVerifier.current)
            .then(setVerificationId);
    };

    const confirmCode = (code: string) => {
        if (!value) return;

        const credential = PhoneAuthProvider.credential(verificationId, code);

        signInWithCredential(auth, credential)
            .then((result) => {
                if (result.user === null) return;
                setUser(result.user);
                AsyncStorage.setItem("user", JSON.stringify(result.user));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const checkLoginStatus = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                router.push("(screens)/home");
            }
            setLoading(false);
        } catch (error) {
            console.log("Error checking login status:", error);
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(response.user);
            await AsyncStorage.setItem("user", JSON.stringify(response.user));
            router.push("(screens)/home");
        } catch (error) {
            console.log("Error logging in:", error);
        }
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            await AsyncStorage.removeItem("user");
            router.push("(screens)/(initializations2)/initialization1");
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    const registerUser = async (code: string) => {
        if (!code) {
            throw new Error("Invalid code");
        }
        const credential = PhoneAuthProvider.credential(verificationId, code);

        const result = await signInWithCredential(auth, credential);

        if (!result || !result.user) {
            throw new Error("Invalid result from Firebase authentication");
        }
        setUser(result.user);

        return result;
    };

    const value = {
        user,
        loading,
        loginUser,
        logoutUser,
        sendVerification,
        confirmCode,
        registerUser,
    };

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
};

export { FirebaseContext, FirebaseProvider };
