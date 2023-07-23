import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, Animated} from 'react-native'
import React, { useEffect, useRef } from 'react'
import Colors from '../../constants/Colors';
import { styles } from '../stylesheets/styles';
import LogoName from '../../assets/vectors/LogoName';


const logo = require("../../assets/images/fadedLogoIcon.png");

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const Loading = () => {
    const fadeAnim = useRef<Animated.Value>(new Animated.Value(1)).current;

    useEffect(() => {
       const animation = Animated.loop(
           Animated.sequence([
               Animated.timing(fadeAnim, {
                   toValue: 0,
                   duration: 1000,
                   useNativeDriver: true,
               }),
               Animated.timing(fadeAnim, {
                   toValue: 1,
                   duration: 1000,
                   useNativeDriver: true,
               }),
           ])
       );

       animation.start();

       return () => {
           animation.stop();
       };
    }, [fadeAnim]);


  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <View style={styles.mainContainer}>
              <View style={localStyles.emptySpacing} />
              <Animated.View style={{ display: "flex", alignItems: "center", opacity: fadeAnim as unknown as number }}>
                  <Image
                      source={logo}
                      style={{
                          position: "absolute",
                          width: w * 0.6,
                          height: w * 0.6,
                      }}
                  />
                  <Text style={localStyles.clickText}>PREPARING YOUR</Text>
                  <View
                      style={{
                          position: "absolute",
                          top: w * 0.3,
                      }}
                  >
                      <LogoName width={w} height={45} />
                  </View>
              </Animated.View>
          </View>
      </SafeAreaView>
  );
}

export default Loading;

const localStyles = StyleSheet.create({
    clickText: {
        position: "absolute",
        top: w * 0.2,
        color: "#442626",
        fontSize: 18,
        fontFamily: "open-sans",
    },
    emptySpacing: {
        height: h * 0.25,
    }
});
