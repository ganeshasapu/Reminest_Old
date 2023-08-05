import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { AuthContext } from "../authProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const home = () => {
    const router = useRouter();
    const { user, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        // router.push("(screens)/(initializations)/userInitialization");
        // router.push("(screens)/(initializations)/smsconfirmation");
        // router.push("(screens)/(initializations)/signUpSignIn");
        // router.push("(screens)/(initializations)/familyLoginRegister");
        // router.push("(screens)/(initializations)/familyName");
        // router.push("(screens)/(initializations)/familyInterests");
        // router.push("(screens)/(initializations)/startReminest");
        // router.push("(screens)/(previews)/preview1");
        // router.push("(screens)/feed")
        // router.push("(screens)/(posting)/addMedia")
        // router.push("(screens)/(posting)/confirmPost");
        // router.push("(screens)/camera")
        // router.push("(screens)/(auth)/register")
    }, []);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.text}>Welcome {user?.email}</Text>
                <Button
                    title="Go to preview1"
                    onPress={() => {
                        router.push("(screens)/(previews)/preview1");
                    }}
                />
                <TouchableOpacity style={styles.pictureButton} />
                <Button title="Sign out" onPress={logoutUser} />
                <Button
                    title="Go to Feed Page"
                    onPress={() => {
                        router.push("(screens)/feed");
                    }}
                />
            </View>
        </View>
    );
};

export default home;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        borderRadius: 20,
        backgroundColor: Colors.background,
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "open-sans",
    },
    camera: {
        flex: 1,
        padding: 20,
    },
    pictureButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 37,
        width: 75,
        height: 75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
