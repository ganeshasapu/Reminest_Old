import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import { styles } from '../../stylesheets/styles'
import Colors from '../../../constants/Colors';
import PreviewLoading1 from '../../../assets/vectors/PreviewLoading1';

const preview1 = () => {
  return (
      <View
          style={[
              styles.mainContainer,
              {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
              },
          ]}
      >
          <View style={localStyles.imageOneContainer}>
              <ImageBackground
                  source={require("../../../assets/images/stock_image1.png")}
                  style={[localStyles.imageOne, localStyles.shadow]}
                  imageStyle={{ borderRadius: 10 }}
              />
          </View>
          <View style={[localStyles.imageTwoContainer, localStyles.shadow, {borderTopRightRadius: 10, borderTopLeftRadius: 10}]}>
              <ImageBackground
                  source={require("../../../assets/images/stock_image2.png")}
                  style={[
                      localStyles.shadow,
                      localStyles.imageTwo,
                  ]}
                    imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              />
              <View style={[localStyles.imageTextContainer, localStyles.shadow]}>
                  <Text
                      style={[
                          styles.text,
                          localStyles.centerText,
                          { padding: 5 },
                      ]}
                  >
                      What did you talk about the first time you met?
                  </Text>
              </View>
          </View>
          <View style={localStyles.emptySpacing} />
          <View style={localStyles.textContainer}>
              <Text style={[styles.bigtext, localStyles.centerText]}>
                  Respond to weekly prompts about your family
              </Text>
              <Text
                  style={[
                      styles.text,
                      localStyles.centerText,
                      { marginTop: 10 },
                  ]}
              >
                  Stay connected with your family through stories and memories
              </Text>
          </View>
          <PreviewLoading1 width={30} height={20} />
      </View>
  );
}

export default preview1

const localStyles = StyleSheet.create({
    centerText: {
        textAlign: "center",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    imageTwoContainer: {
        width: "60%",
        height: "20%",
        position: "absolute",
        top: "50%",
        left: "10%",
        backgroundColor: Colors.background,
    },
    imageTextContainer: {
        backgroundColor: Colors.purple,
        width: "100%",
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    imageTwo: {
        width: "100%",
        height: "100%",
    },
    imageOne: {
        width: "100%",
        height: "100%",
    },
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        paddingBottom: 10,
    },
    emptySpacing: {
        height: "100%",
    },
    imageOneContainer: {
        position: "absolute",
        top: "0%",
        right: "10%",
        width: "70%",
        height: "60%",
        backgroundColor: Colors.background,
    },
});
