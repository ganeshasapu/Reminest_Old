import { Text,} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../constants/Colors'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../stylesheets/styles'
import LogoDark from '../../../assets/vectors/LogoDark'
import TwoColumnScrollView from '../../../components/TwoColumnScrollView'


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

    const { name } = useLocalSearchParams();

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

    const toggleActivityOption = (title: string) => {
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

    const toggleMilestoneOption = (title: string) => {
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
      <SafeAreaView style={[styles.mainContainer]}>
          <LogoDark width={35} height={40} />
          <Text style={[styles.titletext, { paddingTop: 10 }]}>Interests</Text>
          <Text
              style={[
                  styles.text,
                  { paddingTop: "7.5%", paddingBottom: "15%" },
              ]}
          >
              Pick things your family would be interested in.
          </Text>

          <Text style={styles.text}>Heritage & History</Text>
          <TwoColumnScrollView
              data={historyOptions}
              toggleOptionFunc={toggleHistoryOption}
              optionColor={Colors.blue}
          />
          <Text style={[styles.text, { paddingTop: 20 }]}>Activities</Text>
          <TwoColumnScrollView
              data={activityOptions}
              toggleOptionFunc={toggleActivityOption}
              optionColor={Colors.purple}
          />
          <Text style={[styles.text, { paddingTop: 20 }]}>
              Milestones and Events
          </Text>
          <TwoColumnScrollView
              data={milestoneOptions}
              toggleOptionFunc={toggleMilestoneOption}
              optionColor={Colors.orange}
          />
      </SafeAreaView>
  );
}

export default initialization3;
