import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Colors from '../../../constants/Colors';
import FAIcon from '@expo/vector-icons/FontAwesome';

const initialization4 = () => {
    const [familyName, setFamilyName] = useState("");

    let { name } = useLocalSearchParams();
    if (!name) {
        name = "Jennifer Smith";
    }

    const router = useRouter()

    const next = () => {
        router.push({pathname: "(screens)/(initializations)/initialization5", params: {name: name, familyName: familyName}});
    };

    const previous = () => {
        router.push("(screens)/(initializations)/initialization3");
    };

  return (
      <View style={styles.container}>
          <Text style={styles.text}>initialization4</Text>
          <Image
              source={require("../../../assets/images/icon.png")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={styles.text}>Welcome</Text>
          <Text style={styles.bigText}>{name}</Text>
          <Text style={styles.text}>What's Your Family Name?</Text>
          <TextInput
              style={styles.input}
              onChangeText={setFamilyName}
              value={familyName}
              autoCapitalize="none"
              placeholder="Start typing..."
              placeholderTextColor={"#000"}
          ></TextInput>
          <View style={styles.buttonGroup}>
              <TouchableOpacity
                  onPress={previous}
                  style={[styles.navigationButton, { opacity: 0.5 }]}
              >
                  <FAIcon name="angle-left" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={next} style={styles.navigationButton}>
                  <FAIcon name="angle-right" size={30} color="#fff" />
              </TouchableOpacity>
          </View>
      </View>
  );
}

export default initialization4

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    bigText: {
        fontSize: 30,
        color: "#fff",
    },
    text: {
        fontSize: 20,
        color: "#fff",
    },
    input: {
        width: "80%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        color: "#000",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    navigationButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
        marginTop: 20,
    },
});
