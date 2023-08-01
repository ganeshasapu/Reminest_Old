import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";
import { Alert } from "react-native";
import { User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    logoutUser: () => void;
    sendVerification: (fullNumber: string) => void;
    verifyUser: (code: string) => Promise<User | null>;
    checkLoginStatus: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

const FirebaseProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");

    const router = useRouter();

    const sendVerification = async (fullNumber: string) => {
        try {
            const { error, data } = await supabase.auth.signInWithOtp({
                phone: fullNumber,
            });
            if (error) {
                Alert.alert("Error", error.message);
            } else {
                setPhoneNumber(fullNumber);
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    const checkLoginStatus = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        } catch (error) {
            console.log("Error checking login status:", error);
        }
    };

    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            Alert.alert("Error logging out", error.message);
        }

        await AsyncStorage.removeItem("user").then(() =>{
            setUser(null);
            router.push("(screens)/(initializations)/signUpSignIn");
        })

    };

    const verifyUser = async (code: string): Promise<User | null> => {
        try {
            // Verify the phone number with the confirmation code
            const { error, data } = await supabase.auth.verifyOtp({
                phone: phoneNumber,
                token: code,
                type: "sms",
            });

            if (error) {
                Alert.alert("Error", error.message);
                return null
            } else {
                // User successfully verified the phone number
                setUser(data.user);
                await AsyncStorage.setItem("user", JSON.stringify(data.user));
                return data.user;
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
            return null
        }
    };

    const value = {
        user,
        loading,
        logoutUser,
        sendVerification,
        verifyUser,
        checkLoginStatus,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { AuthContext, FirebaseProvider };
