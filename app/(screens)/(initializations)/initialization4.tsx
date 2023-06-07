import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Colors from '../../../constants/Colors';
import { styles } from '../../stylesheets/styles';
import BasicInput from '../../../components/BasicInput';
import ProfileBorder from '../../../assets/vectors/ProfileBorder';

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
      <View
          style={[
              styles.mainContainer,
              {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
              },
          ]}
      >
          <View
              style={{
                  position: "absolute",
                  left: "26%",
                  top: "20%",
                  width: "100%",
                  height: "40%",
              }}
          >
              <ProfileBorder width={200} height={200} />
              <Image
                  source={require("../../../assets/images/icon.png")}
                  style={{
                      width: 125,
                      height: 125,
                      borderRadius: 67.5,
                      position: "absolute",
                      left: "11%",
                      top: "12.5%",
                  }}
              />
          </View>
          <View style={localStyles.emptySpace} />
          <View style={localStyles.textContainer}>
              <Text style={[styles.text, { paddingBottom: 5 }]}>Welcome</Text>
              <Text style={styles.titletext}>{name}</Text>
          </View>
          <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={160}
              style={localStyles.inputContainer}
          >
              <Text style={styles.text}>What's Your Family Name?</Text>
              <BasicInput
                  changeTextHandler={setFamilyName}
                  value={familyName}
              />
          </KeyboardAvoidingView>
      </View>
  );
}

export default initialization4

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    textContainer: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "45%",
        width: "100%",
        height: "20%",
    },
    inputContainer: {
        width: "100%",
        paddingTop: "17.5%",
    },
    emptySpace: {
        height: "70%",
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
