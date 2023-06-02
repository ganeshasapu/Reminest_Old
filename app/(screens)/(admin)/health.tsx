import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { checkAppStatus, clearAppOpened } from "../../appStatus";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const health = () => {
    const [appStatus, setAppStatus] = useState<boolean | null>(null);
    useEffect(() => {
      checkAppStatus().then((status) => {
          setAppStatus(status);
      });
    }
    , []);

    const createRandomDoc = async () => {
        const docRef = await addDoc(collection(db, "tests"), {
            message: "Hello world!" + Math.random(),
        });
        console.log("Document written with ID: ", docRef.id);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>health</Text>
            <Text style={styles.text}>{appStatus ? "Not First" : "First"}</Text>
            <Button title="Create Random Doc" onPress={createRandomDoc} />
            <Button title="Clear App Opened" onPress={clearAppOpened} />
            <Button title="Sign Out" onPress={() => signOut(auth)} />
        </View>
    );
};

export default health;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    text: {
        fontSize: 20,
        color: "#fff",
    },
});
