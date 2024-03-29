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
import { createUserProfile } from '../../../db';
import { UsersType } from '../../../schema';

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const CELL_COUNT = 6;

const smsconfirmation = () => {
    const { login } = useLocalSearchParams();
    const { phoneNumber, countryCode, birthday, firstName, lastName } = useContext(UserFormContext);
    const [code, setCode] = useState<string>("");
    const { verifyUser, sendVerification} = useContext(AuthContext);
    const router = useRouter();


    async function register(){
        try{
            const user = await verifyUser(code)

            if (!user) {
                Alert.alert("Invalid verification code");
                return
            }

            if(login){
                router.push("(screens)/feed")
                return
            }

            const userData = {
                id: user.id,
                created_at: new Date,
                first_name: firstName,
                last_name: lastName,
                birthday: birthday,
                phone_number: countryCode + phoneNumber,
            } as UsersType

            createUserProfile(user, userData);
            router.push("(screens)/(initializations)/familyLoginRegister");
        } catch(error){
            let message = "Unknown Error";
            if (error instanceof Error) message = error.message;
            console.error(message)
            Alert.alert(message)
        }
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
