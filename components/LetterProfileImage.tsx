import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

interface LetterProfileImageProps {
    name: string;
    index: number;
}

const colors: string[] = [Colors.pink, Colors.purple, Colors.blue];

const LetterProfileImage = ({name, index}: LetterProfileImageProps) => {
  return (
      <View style={[localStyles.profilePicture, { zIndex: 2 }, {backgroundColor: colors[index]}]}>
          <Text style={[localStyles.profileLetterText, { marginTop: 5 }]}>
              {name[0]}
          </Text>
      </View>
  );
}

export default LetterProfileImage

const localStyles = StyleSheet.create({
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
    },
    profileLetterText: {
        color: "#fff",
        fontSize: 30,
        fontFamily: "gabriel-sans",
        textAlign: "center",
    },
});
