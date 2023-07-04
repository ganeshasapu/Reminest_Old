import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { FirebaseContext } from "../auth";

const home = () => {
    const router = useRouter();
    const { user, logoutUser } = useContext(FirebaseContext);

    useEffect(() => {
        // router.push("(screens)/(initializations3)/userInitialization");
        router.push("(screens)/(previews)/preview1");
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
                <Button
                    title="Go to Initialization2"
                    onPress={() => {
                        router.push(
                            "(screens)/(initializations)/initialization2"
                        );
                    }}
                />
                <TouchableOpacity style={styles.pictureButton} />
                <Button title="Sign out" onPress={logoutUser} />
                <Button
                    title="Go to Camera Page"
                    onPress={() => {
                        router.push("(screens)/camera");
                    }}
                />
                <Button
                    title="Go to Video Page"
                    onPress={() => {
                        router.push("(screens)/video");
                    }}
                />
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
