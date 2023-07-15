import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import React, { useContext, useState } from 'react'
import { styles } from '../../stylesheets/styles';
import BasicInput from '../../../components/BasicInput';
import Colors from '../../../constants/Colors';
import { useRouter } from 'expo-router';
import AppName from '../../../assets/vectors/AppName';
import { RouteContext } from "./_layout";

const logo = require("../../../assets/images/fadedLogoIcon.png");


const signUpSignIn = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const router = useRouter();

    const { setCurrentRouteIndex } = useContext(RouteContext);

    const handlePhoneNumberChange = (inputText: string) => {
        setPhoneNumber(inputText);
    };

    const handleLogIn = () => {
        router.push("(screens)/(initializations)/initialization2");
        setCurrentRouteIndex(1)
    };
    const handleSignUp = () => {
        router.push("(screens)/(initializations3)/userInitialization");
        setCurrentRouteIndex(1)
    };
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <View style={styles.mainContainer}>
              <View style={{ position: "absolute", left: "28%", top: "15%" }}>
                  <Image
                      source={logo}
                      style={{
                          width: 150,
                          height: 150,
                          position: "absolute",
                          left: "12%",
                          top: "15%",
                      }}
                  />
                  <AppName width={200} height={200} />
              </View>
              <View
                  style={{ position: "absolute", left: "25%", top: "0%" }}
              ></View>
              <View style={localStyles.emptySpacing} />
              <Text style={styles.text}>Welcome Back:</Text>
              <BasicInput
                  placeholder="Phone Number"
                  value={phoneNumber}
                  style={{ marginTop: 10, borderColor: Colors.blue }}
                  changeTextHandler={handlePhoneNumberChange}
              ></BasicInput>
              <TouchableOpacity
                  style={[styles.button, { marginTop: 10 }]}
                  onPress={handleLogIn}
              >
                  <Text style={[styles.buttonText, { marginRight: 10 }]}>
                      Log In
                  </Text>
              </TouchableOpacity>

              <Text style={[styles.text, { marginTop: 60 }]}>
                  Join Reminest:
              </Text>
              <TouchableOpacity
                  style={[styles.button, { marginTop: 10 }]}
                  onPress={handleSignUp}
              >
                  <Text style={[styles.buttonText, { marginRight: 10 }]}>
                      Sign Up
                  </Text>
              </TouchableOpacity>
          </View>
      </SafeAreaView>
  );
}

export default signUpSignIn

const localStyles = StyleSheet.create({
    emptySpacing: {
        height: "45%",
    },
})
