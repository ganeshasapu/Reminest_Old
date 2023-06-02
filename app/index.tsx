import { Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import React from 'react'
import { useRouter, Redirect } from 'expo-router'

const index = () => {
    const router = useRouter()
  return (
    <Redirect href="(screens)/login" />
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    text:{
        fontSize: 20,
        color: '#fff',
    }
});


export default index
