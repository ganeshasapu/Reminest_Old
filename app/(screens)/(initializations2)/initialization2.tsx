import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const initialization2 = () => {
    const [familyCode, setFamilyCode] = useState("");
    const router = useRouter()


  return (
    <View>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setFamilyCode(text)}
            value={familyCode}
            placeholder='Phone Code'
         />
    </View>
  )
}

export default initialization2

const styles = StyleSheet.create({})
