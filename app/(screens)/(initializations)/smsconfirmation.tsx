import { Alert, Dimensions, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Colors from '../../../constants/Colors';
import { styles } from '../../stylesheets/styles';
import LogoDark from '../../../assets/vectors/LogoDark';
import { UserFormContext } from "./_layout";
import BasicInput from '../../../components/BasicInput';
import { AuthContext } from '../../authProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ArrowNavigation from '../../../components/ArrowNavigation';
import { supabase } from '../../../supabase';
import { UserType } from '../../../schema';
import { User } from '@supabase/supabase-js';

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const CELL_COUNT = 6;

const smsconfirmation = () => {
    const { login } = useLocalSearchParams();
    const { phoneNumber, countryCode, birthday, firstName, lastName } = useContext(UserFormContext);
    const [code, setCode] = useState<string>("");
    const { verifyUser, sendVerification} = useContext(AuthContext);
    const router = useRouter();

    async function createUserProfile(user: User){
        if (!user) return;

        const userData = {
            id: user.id,
            birthday: birthday,
            phoneNumber: countryCode + phoneNumber,
            firstName: firstName,
            lastName: lastName,
        } as UserType

        const { error: createError, data } = await supabase
            .from("users")
            .insert(userData)
            .match({ id: user.id });

        if (createError) {
            Alert.alert("Error", createError.message);
        }
    }

    const register = () => {
        verifyUser(code)
            .then((user) => {
                if (!user) return;
                if (login) {
                    router.push("(screens)/feed")
                }
                else {
                    createUserProfile(user);
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
        if (code.length === CELL_COUNT) {
            Keyboard.dismiss();
            register();
        }
    }, [code]);

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
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
              <ArrowNavigation
                  left={{
                      route: "(screens)/(initializations)/userInitialization",
                  }}
              />
          </SafeAreaView>
      </TouchableWithoutFeedback>
  );
}

export default smsconfirmation

const localStyles = StyleSheet.create({
});
