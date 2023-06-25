import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FormContext } from "./_layout";

const initialization3 = () => {
    const [familyCode, setFamilyCode] = useState("");

    const router = useRouter();
    const context = useContext(FormContext);
    const { firstName, lastName, uid, birthday, phoneNumber } = context;

    const checkDocumentExists = async () => {
        const documentRef = doc(db, "families", familyCode);

        try {
            const documentSnapshot = await getDoc(documentRef);

            if (documentSnapshot.exists()) {
                console.log("Document data:", documentSnapshot.data());
                if (auth.currentUser === null) return;
                await updateDoc(documentRef, {
                    users: [
                        ...documentSnapshot.data()?.users,
                        auth.currentUser.uid,
                    ],
                });
                const userData = {
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    phoneNumber: phoneNumber,
                    families: [familyCode],
                    posts: [],
                    profile_picture: "",
                };
                try {
                    const userRef = doc(collection(db, "users"), uid);
                    await setDoc(userRef, userData);
                    console.log("Document written with ID:", uid);
                } catch (error) {
                    console.error("Error adding document:", error);
                }

                router.push("(screens)/home");
            } else {
                throw new Error("Document does not exist.");
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    color: "#000",
                }}
                onChangeText={(text) => setFamilyCode(text)}
                value={familyCode}
                placeholder="Enter Family Code..."
                placeholderTextColor={"#000"}
            />
            <Button title="Join Family" onPress={checkDocumentExists} />
            <Button
                title="Create new family"
                onPress={() => {
                    router.push("(screens)/(initializations2)/initialization4");
                }}
            />
        </SafeAreaView>
    );
};

export default initialization3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
