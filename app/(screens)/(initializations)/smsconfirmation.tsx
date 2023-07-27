import { Alert, Dimensions, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import Colors from '../../../constants/Colors';
import { styles } from '../../stylesheets/styles';
import LogoDark from '../../../assets/vectors/LogoDark';
import { UserFormContext } from "./_layout";
import BasicInput from '../../../components/BasicInput';
import { FirebaseRecaptchaVerifierModal,   } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../firebase';
import { FirebaseContext } from '../../auth';
import { useLocalSearchParams, useRouter } from 'expo-router';

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const CELL_COUNT = 6;

const smsconfirmation = () => {
    const { login } = useLocalSearchParams();
    const { phoneNumber, countryCode } = useContext(UserFormContext);
    const [code, setCode] = useState<string>("");
    const { registerUser, sendVerification } = useContext(FirebaseContext);
    const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(
        null
    );
    const router = useRouter();

    const register = () => {
        registerUser(code)
            .then((result: any) => {
                if (login) {
                    router.push("(screens)/feed")
                }
                else {
                    router.push("(screens)/(initializations)/familyLoginRegister");
                }
            })
            .catch((error: any) => {
                console.log(error);
                if (error.code === "auth/invalid-verification-code") {
                    Alert.alert("Invalid verification code");
                }
            });
    };

    useEffect(() => {
        if (!recaptchaVerifier.current) return;
        sendVerification(
            recaptchaVerifier as MutableRefObject<FirebaseRecaptchaVerifierModal>,
            countryCode + phoneNumber
        );
    }, [recaptchaVerifier]);

    useEffect(() => {
        if (code.length === CELL_COUNT) {
            Keyboard.dismiss();
            register();
        }
    }, [code]);

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
              <FirebaseRecaptchaVerifierModal
                  ref={recaptchaVerifier}
                  firebaseConfig={firebaseConfig}
                //   attemptInvisibleVerification={true}
              />
              <View style={styles.mainContainer}>
                  <LogoDark width={40} height={40} />
                  <Text style={[styles.titletext, { marginTop: 10 }]}>
                      We Sent You An SMS Message
                  </Text>
                  <Text style={[styles.text, { marginTop: 10 }]}>
                      Please type the verification code sent to
                      <Text style={{ color: Colors.blue }}>
                          {" " + countryCode + phoneNumber}
                      </Text>
                  </Text>
                  <View style={{ height: h * 0.1 }} />
                  <BasicInput
                      changeTextHandler={setCode}
                      value={code}
                      style={{ borderColor: Colors.blue }}
                      autoFocus={true}
                      keyboardType="numeric"
                  />

                  <Text
                      onPress={() => {
                          sendVerification(
                              recaptchaVerifier as MutableRefObject<FirebaseRecaptchaVerifierModal>,
                              countryCode + phoneNumber
                          );
                      }}
                      style={[
                          styles.text,
                          {
                              textAlign: "center",
                              color: Colors.blue,
                              textDecorationLine: "underline",
                              marginTop: 20,
                          },
                      ]}
                  >
                      Resend Code
                  </Text>
              </View>
          </SafeAreaView>
      </TouchableWithoutFeedback>
  );
}

export default smsconfirmation

const localStyles = StyleSheet.create({
});
