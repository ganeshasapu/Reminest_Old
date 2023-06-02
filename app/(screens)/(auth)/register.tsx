import { StyleSheet, Text, TextInput, View, Button} from 'react-native'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const register = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onSetPassword] = useState("");

  const register = () => {
    console.log(email, password)
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);

            const userData = {
                email: user.email,
                uid: user.uid,
            };

            const usersRef = collection(db, "users");
            addDoc(usersRef, userData)
        })
        .catch((error) => {
            console.log(error);
        });

  };

  return (
      <View style={styles.container}>
          <Text style={styles.text}>Register</Text>
          <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
          />
          <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={onSetPassword}
              value={password}
              placeholder="Password"
          />
          <Button title="Register" onPress={register} />
      </View>
  );
}

export default register

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
