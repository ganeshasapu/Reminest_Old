import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../constants/Colors';
import Icon from "@expo/vector-icons/FontAwesome";
import { useRouter } from 'expo-router';

const initialization1 = () => {
    const [familyCode, onChangeFamilyCode] = useState("");

    const router = useRouter();
    const createFamily = () => {
        router.push("(screens)/(initializations)/initialization2");
    };

  return (
      <View style={styles.container}>
          <Text style={styles.text}>initialization1</Text>
          <View style={styles.bigTextContainer}>
              <Text style={styles.bigText}>
                  Start recording your family stories today
              </Text>
          </View>
          <Text style={styles.text}>Have a family code?</Text>
          <TextInput
              style={styles.input}
              onChangeText={onChangeFamilyCode}
              value={familyCode}
              autoCapitalize="none"
              placeholder="Start typing..."
              placeholderTextColor={"#000"}
          ></TextInput>
          <Text style={styles.text}>Don't Have One?</Text>
          <TouchableOpacity
              style={styles.familyCodeButton}
              onPress={createFamily}
          >
              <View style={styles.innerButtonContainer}>
                  <Text style={styles.buttonText}>Create New Family</Text>
                  <Icon name="send" size={20} color="#fff" />
              </View>
          </TouchableOpacity>

      </View>
  );
}

export default initialization1

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
    bigTextContainer: {
      width: '65%'
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        color: "#000",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        color: "#fff",
    },
    familyCodeButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 10,
        width: '80%',
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        marginRight: 10,
    },
    innerButtonContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    }
});

