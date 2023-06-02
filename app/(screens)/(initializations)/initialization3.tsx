import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../constants/Colors'
import FAIcon from '@expo/vector-icons/FontAwesome'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const OptionItem = ({ title, selected, onSelect, color }: any) => {
    return (
        <TouchableOpacity
            onPress={() => onSelect(title)}
            style={[
                styles.optionButton,
                { opacity: selected ? 1: 0.5, backgroundColor: color },
            ]}
        >
            <Text
                style={[
                    styles.optionText,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}


const initialization3 = () => {

    const initialHistoryOptions = [
        { title: "Ancestry", selected: false },
        { title: "Growing Up Stories", selected: false },
        { title: "Education", selected: false },
        { title: "Immigration Story", selected: false },
        { title: "Language", selected: false },
        { title: "Culture", selected: false },
    ];

    const initialActivityOptions = [
        { title: "Arts and Crafts", selected: false },
        { title: "Baking and Cooking", selected: false },
        { title: "Travel", selected: false },
        { title: "Books and Games", selected: false },
        { title: "Sports", selected: false },
    ];

    const initialMilestoneOptions = [
        { title: "Birthdays", selected: false },
        { title: "Vacation Memories", selected: false },
        { title: "New Family", selected: false },
        { title: "Wedding", selected: false },
        { title: "School and Career", selected: false },
        { title: "Anniversaries", selected: false },
    ];


    const [historyOptions, setHistoryOptions] = useState(initialHistoryOptions);
    const [activityOptions, setActivityOptions] = useState(initialActivityOptions);
    const [milestoneOptions, setMilestoneOptions] = useState(initialMilestoneOptions);

    const router = useRouter();
    const { name } = useLocalSearchParams();

    const next = () => {
        router.push({
            pathname: "(screens)/(initializations)/initialization4",
            params: { name: name },
        });
    };

    const previous = () => {
        router.push("(screens)/(initializations)/initialization2");
    };

    const toggleHistoryOption = (title: string) => {
        const newHistoryOptions = historyOptions.map((option) => {
            if (option.title === title) {
                return {
                    ...option,
                    selected: !option.selected,
                };
            }
            return option;
        });
        setHistoryOptions(newHistoryOptions);
    };

    const toggleActivityOptions = (title: string) => {
        const newActivityOptions = activityOptions.map((option) => {
            if (option.title === title) {
                return {
                    ...option,
                    selected: !option.selected,
                };
            }
            return option;
        });
        setActivityOptions(newActivityOptions);
    };

    const toggleMilestoneOptions = (title: string) => {
        const newMilestoneOptions = milestoneOptions.map((option) => {
            if (option.title === title) {
                return {
                    ...option,
                    selected: !option.selected,
                };
            }
            return option;
        });
        setMilestoneOptions(newMilestoneOptions);
    };

  return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.text}>initialization3</Text>
          <Text style={styles.bigText}>Interests</Text>
          <Text style={styles.subText}>
              Pick things your family would be interested in.
          </Text>

          <Text style={styles.subText}>Heritage & History</Text>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled={true}
              alwaysBounceVertical={false}
          >
              <FlatList
                  contentContainerStyle={{ alignSelf: "flex-start" }}
                  numColumns={Math.ceil(historyOptions.length / 2)}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={historyOptions}
                  renderItem={({ item, index }) => {
                      return (
                          <OptionItem
                              key={index}
                              title={item.title}
                              selected={item.selected}
                              onSelect={toggleHistoryOption}
                              color={Colors.blue}
                          />
                      );
                  }}
              />
          </ScrollView>
          <Text style={styles.subText}>Activities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                  contentContainerStyle={{ alignSelf: "flex-start" }}
                  numColumns={Math.ceil(activityOptions.length / 2)}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={activityOptions}
                  renderItem={({ item, index }) => {
                      return (
                          <OptionItem
                              key={index}
                              title={item.title}
                              selected={item.selected}
                              onSelect={toggleActivityOptions}
                              color={Colors.purple}
                          />
                      );
                  }}
              />
          </ScrollView>
          <Text style={styles.subText}>Milestone and Events</Text>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled={true}
              alwaysBounceVertical={false}
          >
              <FlatList
                  contentContainerStyle={{ alignSelf: "flex-start" }}
                  numColumns={Math.ceil(milestoneOptions.length / 2)}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={milestoneOptions}
                  renderItem={({ item, index }) => {
                      return (
                          <OptionItem
                              key={index}
                              title={item.title}
                              selected={item.selected}
                              onSelect={toggleMilestoneOptions}
                              color={Colors.orange}
                          />
                      );
                  }}
              />
          </ScrollView>
          <View style={styles.buttonGroup}>
              <TouchableOpacity
                  onPress={previous}
                  style={[styles.navigationButton, { opacity: 0.5 }]}
              >
                  <FAIcon name="angle-left" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={next} style={styles.navigationButton}>
                  <FAIcon name="angle-right" size={30} color="#fff" />
              </TouchableOpacity>
          </View>
      </SafeAreaView>
  );
}

export default initialization3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        padding: 40,

    },
    bigText: {
        fontSize: 30,
        color: "#fff",
    },
    text: {
        fontSize: 20,
        color: "#fff",
    },
    subText: {
        fontSize: 15,
        color: "#fff",
    },
    uploadButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 37,
        width: 75,
        height: 75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
        marginTop: 20,
    },
    input: {
        width: "80%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        color: "#000",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    optionButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    optionText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    optionsContainer: {
        rowGap: 10,
        gap: 5,
    },
});

