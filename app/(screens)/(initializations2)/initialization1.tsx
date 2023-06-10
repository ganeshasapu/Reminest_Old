import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const initialization1 = () => {

    const router = useRouter()

  return (
      <View style={styles.container}>
          <Button
              title="Sign In"
              onPress={() => router.push("(screens)/login")}
          />
          <Button
              title="Sign Up"
              onPress={() => router.push("(screens)/register")}
          />
      </View>
  );
}

export default initialization1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
