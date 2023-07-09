import {
    Button,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
} from "react-native";
import React, { useContext, useState } from 'react'
import { styles } from '../../stylesheets/styles'
import Colors from '../../../constants/Colors'
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FirebaseContext } from '../../auth';
import { storage, db } from '../../firebase';
import { mediaType, collections } from '../../schema';
import { PostContext } from "./_layout";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const addMedia = () => {
  const { user } = useContext(FirebaseContext);
  const { imageUri, setImageUri } = useContext(PostContext)
  const router = useRouter();

  if (!user) return <Text>No User Found</Text>;

  const selectImage = async () => {
      const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
          console.log("Permission not granted!");
          return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
      });

      if (!result.canceled) {
          setImageUri(result.assets[0].uri);
      }
  };

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <View style={styles.mainContainer}>
              <View style={localStyles.previewTextBox}>
                  <Text style={localStyles.previewText}>Add Photos</Text>
              </View>
              {imageUri && (
                  <Image
                      source={{ uri: imageUri }}
                      style={{ width: 200, height: 200 }}
                  />
              )}
              <Button title="Select Image" onPress={selectImage} />
              <Button
                  title="Upload Image"
                  onPress={() => {
                      console.log("Test");
                  }}
                  disabled={!imageUri}
              />
          </View>
      </SafeAreaView>
  );
}

export default addMedia

const localStyles = StyleSheet.create({
  previewTextBox: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    previewText: {
        fontSize: 18,
        fontFamily: "gabriel-sans",
    },
})
