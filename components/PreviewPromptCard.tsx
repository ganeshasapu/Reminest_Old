import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../app/stylesheets/styles'

interface PreviewPromptCardProps {
    cardWidth: number,
    cardHeight: number,
    cardLeft: number,
    cardTop: number,
    color: string,
    highlightTop: number,
    highlightLeft: number,
    highlightWidth: number,
    highlightHeight: number,
    text: string,
    rotation: string,
}

const PreviewPromptCard = ({cardWidth, cardHeight, cardLeft, cardTop, color, highlightLeft, highlightHeight, highlightTop, highlightWidth, text, rotation}: PreviewPromptCardProps) => {
  return (
      <View
          style={[
              localStyles.outerCard,
              localStyles.shadow,
              { width: cardWidth, height: cardHeight, left: cardLeft, top: cardTop, transform: [{rotate: rotation}] },
          ]}
      >
          <View
              style={[
                  localStyles.innerCard,
                  {
                      backgroundColor: color,
                      width: cardWidth - 10,
                      height: cardHeight - 10,
                  },
              ]}
          >
              <View style={localStyles.textBox}>
                  <View style={localStyles.emptySpacing} />
                  <View
                      style={[
                          localStyles.highlightBox,
                          {
                              height: highlightHeight,
                              width: highlightWidth,
                              left: highlightLeft,
                              top: highlightTop,
                          },
                      ]}
                  ></View>
                  <Text style={styles.bigtext}>
                      {text}
                  </Text>
              </View>
          </View>
      </View>
  );
}

export default PreviewPromptCard

const localStyles = StyleSheet.create({
    outerCard: {
        position: "absolute",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    innerCard: {
        borderRadius: 10,
    },
    highlightBox: {
      position: "absolute",
      backgroundColor: "white",
    },
    textBox: {
        display: "flex",
        justifyContent: "flex-end",
        padding: 20,
    },
    emptySpacing: {
        height: "20%",
    },
    shadow: {
        shadowColor: "#222",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
});
