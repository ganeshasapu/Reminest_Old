import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialization3 = () => {
    const [familyCode, setFamilyCode] = useState("");

    const router = useRouter()

  return (
      <SafeAreaView style={styles.container}>
          <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, color: "#000" }}
              onChangeText={(text) => setFamilyCode(text)}
              value={familyCode}
              placeholder="Enter Family Code..."
              placeholderTextColor={"#000"}
          />
          <Button
              title="Create new family"
              onPress={() => {
                  router.push("(screens)/(initializations2)/initialization4");
              }}
          />
      </SafeAreaView>
  );
}

export default initialization3

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center',
    },
})
