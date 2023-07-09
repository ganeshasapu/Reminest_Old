import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Video, ResizeMode } from 'expo-av';
import { styles } from '../../stylesheets/styles';
import Colors from '../../../constants/Colors';
import { PostContext } from './_layout';
import * as VideoThumbnails from "expo-video-thumbnails";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const VideoPreview = () => {

    const {videoUri, setThumbnailUri} = useContext(PostContext)

    useEffect(() => {
       const generateThumbnail = async () => {
           try {
               const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri);
               setThumbnailUri(uri);
           } catch (e) {
               console.warn(e);
           }
       };
         generateThumbnail();
    }, [])

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <View style={styles.mainContainer}>
              <View style={localStyles.previewTextBox}>
                  <Text style={localStyles.previewText}>Preview Video</Text>
              </View>
              <View style={[{ flex: 1, marginVertical: 10 }, styles.shadow]}>
                  <View style={localStyles.videoPreviewBox}>
                      <Video
                          style={localStyles.videoPreview}
                          source={{ uri: videoUri }}
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                          shouldPlay={true}
                      />
                  </View>
              </View>
          </View>
      </SafeAreaView>
  );
}

export default VideoPreview;

const localStyles = StyleSheet.create({
    videoPreviewBox: {
        borderRadius: 20,
        width: w * 0.9,
        height: w * 0.9 * (16 / 9),
        overflow: "hidden",
    },
    videoPreview: {
        width: "100%",
        height: "100%",
    },
    previewTextBox: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    previewText: {
        fontSize: 18,
        fontFamily: "gabriel-sans",
    },
});
