import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { Camera, CameraType } from "expo-camera";
import Colors from '../../constants/Colors';

const home = () => {
  const router = useRouter()

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
      // Camera permissions are still loading
      return <View />;
  }

  if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
          <View style={styles.outerContainer}>
              <Text style={{ textAlign: "center" }}>
                  We need your permission to show the camera
              </Text>
              <Button onPress={requestPermission} title="grant permission" />
          </View>
      );
  }

  return (
      <View style={styles.outerContainer}>
          <Camera style={styles.camera}>
              <View style={styles.innerContainer}>
                  <Text style={styles.text}>home</Text>
                  <Button
                      title="Go to preview1"
                      onPress={() => {
                          router.push("(screens)/(previews)/preview1");
                      }}
                  />
                  <Button
                      title="Go to Initialization4"
                      onPress={() => {
                          router.push(
                              "(screens)/(initializations)/initialization4"
                          );
                      }}
                  />
                  <TouchableOpacity style={styles.pictureButton} />

              </View>
          </Camera>
      </View>
  );
}

export default home

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        borderRadius: 20,
        backgroundColor: Colors.background,
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "open-sans",
    },
    camera: {
        flex: 1,
        padding: 20,
    },
    pictureButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 37,
        width: 75,
        height: 75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
