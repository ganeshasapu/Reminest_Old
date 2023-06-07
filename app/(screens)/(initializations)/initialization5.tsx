import { StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from '../../stylesheets/styles';
import ClickToBegin from '../../../assets/vectors/ClickToBegin';
import ProfileBorder from '../../../assets/vectors/ProfileBorder';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialization5 = () => {

  const router = useRouter()

  let { name } = useLocalSearchParams();

    if (!name) {
        name = "Jennifer Smith";
    }


  return (
      <TouchableWithoutFeedback
          onPress={() => {
              router.push("(screens)/home");
          }}
      >
          <SafeAreaView style={styles.mainContainer}>
              <View
                  style={{
                      display: "flex",
                      width: "100%",
                      height: "40%",
                      flexDirection: "row",
                  }}
              >
                  <View
                      style={{ width: 100, height: 100, position: "relative" }}
                  >
                      <ProfileBorder width={100} height={100} />

                      <Image
                          source={require("../../../assets/images/icon.png")}
                          style={{
                              width: 60,
                              height: 60,
                              borderRadius: 37.5,
                              position: "absolute",
                              left: 20,
                              top: 18,
                          }}
                      />
                  </View>
                  <View style={{ flex: 1 }}>
                      <Text
                          style={[
                              styles.text,
                              { paddingTop: 20, paddingBottom: 15 },
                          ]}
                      >
                          Welcome
                      </Text>
                      <Text style={styles.bigtext}>{name}</Text>
                  </View>
              </View>
              <View style={{position:"absolute", top:"25%", left:"5%", width:"100%", height:"100%"}}>
                  <ClickToBegin  />
              </View>
          </SafeAreaView>
      </TouchableWithoutFeedback>
  );
}

export default initialization5

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    bigTextContainer: {
        width: "80%",
        position: "absolute",
        top: "40%",
        left: "5%",
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

