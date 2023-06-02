import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";

const Login = () => {
    const [email, onChangeEmail] = useState("");
    const [password, onSetPassword] = useState("");

    const router = useRouter();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          // Navigate to the home screen or perform any other actions
          router.push("(screens)/home");
        }
      });
    }
    , []);

    const login = () => {
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // Navigate to the home screen or perform any necessary action after successful login
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                autoCapitalize="none"
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={onSetPassword}
                value={password}
                placeholder="Password"
            />
            <Button title="Login" onPress={login} />
        </View>
    );
};

export default Login;

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
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
});
