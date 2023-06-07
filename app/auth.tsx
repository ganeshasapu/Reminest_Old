import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "expo-router";

interface FirebaseContextProps {
    user: User | null;
    loading: boolean;
    loginUser: (email:string, password:string) => void;
    logoutUser: () => void;
}

const FirebaseContext = createContext({} as FirebaseContextProps);

const FirebaseProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        checkLoginStatus();
    }, []);


    const checkLoginStatus = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            console.log(storedUser)
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                router.push("(screens)/home");
            }
            setLoading(false);
        } catch (error) {
            console.log("Error checking login status:", error);
        }
    };

    const loginUser = async (email:string, password:string) => {
        try {

            const response = await signInWithEmailAndPassword(auth, email, password);
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
            router.push("(screens)/(auth)/login");
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    const value = {
        user,
        loading,
        loginUser,
        logoutUser,
    };

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
};

export { FirebaseContext, FirebaseProvider };
