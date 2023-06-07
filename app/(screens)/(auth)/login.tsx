import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../auth";


const Login = () => {
    const [email, onChangeEmail] = useState("");
    const [password, onSetPassword] = useState("");

    const { loginUser, loading } = useContext(FirebaseContext);

    const handleLogin = () => {
        loginUser(email, password);
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
            <Button title="Login" onPress={handleLogin} disabled={loading} />
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
