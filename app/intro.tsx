import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const intro = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>intro</Text>
    </View>
  );
}

export default intro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
});
