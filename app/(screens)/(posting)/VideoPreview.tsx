import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { Video, ResizeMode } from 'expo-av';
import { styles } from '../../stylesheets/styles';
import Colors from '../../../constants/Colors';
import { PostContext, RouteContext } from './_layout';
import * as VideoThumbnails from "expo-video-thumbnails";
import { useRouter } from 'expo-router';

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const VideoPreview = () => {

    const videoRef = useRef<Video>(null);

    const { setThumbnailUri, videoUri} = useContext(PostContext)

    useEffect(() => {
       const generateThumbnail = async () => {
           try {
               const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {time: 1000});
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
              <View style={[{ flex: 1, marginTop: 10 }]}>
                  <View style={localStyles.videoPreviewBox}>
                      <Video
                            ref={videoRef}
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
        flex: 1,
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
