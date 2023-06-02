import { StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import LogoDark from '../../../assets/vectors/LogoDark';

const initialization5 = () => {

  const router = useRouter()

  const { name } = useLocalSearchParams();

  return (
      <TouchableWithoutFeedback onPress={() => {router.push("(screens)/home");}}>
        <View style={styles.container}>
            <Text style={styles.text}>initialization5</Text>
            <LogoDark width={50} height={50} />
            <Text style={styles.text}>Welcome</Text>
            <Text style={styles.bigText}>{name}</Text>

            <Text style={styles.text}>CLICK ANYWHERE TO BEGIN YOUR</Text>
            <Text style={styles.heroText}>Reminest</Text>
        </View>
      </TouchableWithoutFeedback>
  );
}

export default initialization5

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
    bigText: {
        fontSize: 30,
        color: "#fff",
    },
    heroText: {
        fontSize: 40,
        color: "#fff",
        fontWeight: "bold",
    },
});

