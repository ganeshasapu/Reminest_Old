import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { Video, ResizeMode } from 'expo-av';
import { styles } from '../../stylesheets/styles';
import Colors from '../../../constants/Colors';
import { PostContext, RouteContext } from './_layout';
import * as VideoThumbnails from "expo-video-thumbnails";
import ArrowNavigation from '../../../components/ArrowNavigation';
import { useRouter } from 'expo-router';

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const VideoPreview = () => {

    const videoRef = useRef<Video>(null);

    const { setThumbnailUri, videoUri, setVideoUri} = useContext(PostContext)

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

   async function pressedBack() {
        await Alert.alert(
            "Attention!",
            "If you go back you will lose the current recording",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        setVideoUri("");
                    },
                },
            ]
        );
        return false;
    }

  return (
      <SafeAreaView
          style={{
              flex: 1,
              backgroundColor: Colors.background,
          }}
      >
          <View style={styles.mainContainer}>
              <View style={localStyles.previewTextBox}>
                  <Text style={localStyles.previewText}>Preview Video</Text>
              </View>
              <View style={[{ height: h * 0.73, marginTop: 10 }]}>
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
          <ArrowNavigation
              right={{ route: "(screens)/(posting)/addMedia" }}
              left={{
                  route: "(screens)/(posting)/recordVideo",
                  callback: pressedBack,
              }}
          />
      </SafeAreaView>
  );
}

export default VideoPreview;

const localStyles = StyleSheet.create({
    videoPreviewBox: {
        borderRadius: 20,
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
