import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { FormContext } from './_layout';
import { styles } from '../../stylesheets/styles';
import TwoColumnScrollView from '../../../components/TwoColumnScrollView';
import Colors from '../../../constants/Colors';
import { useRouter } from 'expo-router';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';


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

const initialization4 = () => {
    const [historyOptions, setHistoryOptions] = useState(initialHistoryOptions);
    const [activityOptions, setActivityOptions] = useState(
        initialActivityOptions
    );
    const [milestoneOptions, setMilestoneOptions] = useState(
        initialMilestoneOptions
    );

    const context = useContext(FormContext);
    const {
        familyInterests,
        firstName,
        lastName,
        familyName,
        familyCode,
        uid,
        birthday,
        phoneNumber,
        setFamilyInterests,
        setFamilyCode,
        setFamilyName,
    } = context;

    const router = useRouter()

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

    const generateRandomNumber = () => {
        const min = 100000; // Minimum 6-digit number
        const max = 999999; // Maximum 6-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const addFamily = async (familyCode: string) => {
        const selectedHistoryOptions = historyOptions
            .filter((option) => option.selected)
            .map((option) => option.title);

        const selectedActivityOptions = activityOptions
            .filter((option) => option.selected)
            .map((option) => option.title);

        const selectedMilestoneOptions = milestoneOptions
            .filter((option) => option.selected)
            .map((option) => option.title);

        const selectedTitles = [
            ...selectedHistoryOptions,
            ...selectedActivityOptions,
            ...selectedMilestoneOptions,
        ];

        try {
            const familyData = {
                familyName: familyName,
                familyInterests: selectedTitles,
                weekly_posts_collections: [],
                users: [uid],
                creator: uid,
            };

            const familyRef = await doc(collection(db, "families"), familyCode);
            await setDoc(familyRef, familyData);
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

    const adduser = async (familyCode: string) => {
        const userData = {
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            phoneNumber: phoneNumber,
            families: [familyCode],
            posts: [],
            profile_picture: "",
        };
         try {
             const userRef = doc(collection(db, "users"), uid);
             await setDoc(userRef, userData);
             console.log("Document written with ID:", uid);
         } catch (error) {
             console.error("Error adding document:", error);
         }
    };

    const handleSubmit = async () => {
        const familyCode = generateRandomNumber().toString();
        await addFamily(familyCode);
        await adduser(familyCode);

        router.push("(screens)/home");

    };
  return (
      <SafeAreaView style={[styles.mainContainer]}>
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
          <TextInput
              placeholder="Enter your family name"
              value={familyName}
              onChangeText={(text) => setFamilyName(text)}
              style={localStyles.textInput}
          />
          <Button title="Submit" onPress={handleSubmit} />
      </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
    textInput: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        textAlign: "center",
        color: "#fff",
    },
});

export default initialization4

