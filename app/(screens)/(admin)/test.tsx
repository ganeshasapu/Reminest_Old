import { StyleSheet, Text, View, Button, Alert } from "react-native";
import BasicInput from "../../../components/BasicInput";
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../../../supabase'

const Test = () => {
    const [phoneNumber, setPhoneNumber] = useState("+15197194919");
    const [confirmationCode, setConfirmationCode] = useState("");

    const handleSignUp = async () => {
        if (phoneNumber) {
            try {
                // Send the phone number to sign up with OTP
                const { error, data } = await supabase.auth.signInWithOtp({
                    phone: phoneNumber,
                });


                if (error) {
                    Alert.alert("Error", error.message);
                } else {
                    // User successfully signed up with OTP
                    Alert.alert(
                        "Success",
                        "A confirmation code has been sent to your phone number."
                    );
                }
            } catch (error: any) {
                Alert.alert("Error", error.message);
            }
        } else {
            Alert.alert("Warning", "Please enter a valid phone number.");
        }
    };

    const handleVerifyCode = async () => {
        if (confirmationCode) {
            try {
                // Verify the phone number with the confirmation code
                const { error, data } = await supabase.auth.verifyOtp({phone: phoneNumber, token: confirmationCode, type: 'sms'});

                if (error) {
                    Alert.alert("Error", error.message);
                } else {
                    // User successfully verified the phone number
                    Alert.alert(
                        "Success",
                        "Phone number verification successful."
                    );
                }
            } catch (error: any) {
                Alert.alert("Error", error.message);
            }
        } else {
            Alert.alert(
                "Warning",
                "Please enter the 6-digit confirmation code."
            );
        }
    };

    return (
        <SafeAreaView>
            <Text>Enter Phone Number:</Text>
            <BasicInput
                changeTextHandler={setPhoneNumber}
                value={phoneNumber}
            />
            <Button title="Create User" onPress={handleSignUp} />

            <Text>Enter Confirmation Code:</Text>
            <BasicInput
                changeTextHandler={setConfirmationCode}
                value={confirmationCode}
            />
            <Button title="Verify Code" onPress={handleVerifyCode} />
        </SafeAreaView>
    );
};

export default Test;

const styles = StyleSheet.create({});
