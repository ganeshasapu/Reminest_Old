import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Image,
    Dimensions,
    Alert,
} from "react-native";
import React, { useContext, useState } from 'react'
import Colors from '../../../constants/Colors'
import { styles } from '../../stylesheets/styles'
import AppName from "../../../assets/vectors/AppName";
import { Redirect, useRouter } from "expo-router";
import { FamilyFormContext, UserFormContext } from "./_layout";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserType, WeeklyPostsCollectionsType, collections } from "../../../schema";
import { AuthContext } from "../../authProvider";

const logo = require("../../../assets/images/fadedLogoIcon.png");

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const startReminest = () => {
    const router = useRouter();

    const { heritageOptions, activityOptions, milestoneOptions, familyName } = useContext(FamilyFormContext);
    const { firstName, lastName, birthday, phoneNumber, countryCode } = useContext(UserFormContext);
    const { user } = useContext(AuthContext);
    const [pressDisabled, setPressDisabled] = useState(false);

    async function createFamily(familyCode: string, weekly_post_id: string) {
        if (!user) return

        const selectedHeritageOptions = heritageOptions
            .filter((option) => option.selected)
            .map((option) => option.title);

        const selectedActivityOptions = activityOptions
            .filter((option) => option.selected)
            .map((option) => option.title);

        const selectedMilestoneOptions = milestoneOptions
            .filter((option) => option.selected)
            .map((option) => option.title);

        const selectedTitles = [
            ...selectedHeritageOptions,
            ...selectedActivityOptions,
            ...selectedMilestoneOptions,
        ];

        try {
            const familyData = {
                familyName: familyName,
                familyInterests: selectedTitles,
                weekly_posts_collections: [weekly_post_id],
                users: [user.id],
                creator: user.id,
            };

            const familyRef = await doc(collection(db, "families"), familyCode);
            await setDoc(familyRef, familyData);
        } catch (error) {
            console.error("Error adding document:", error);
        }

    }

    async function createUser(familyCode: string) {
        if (!user) return;
        const userData: UserType = {
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            phoneNumber: countryCode + phoneNumber,
            families: [familyCode],
            posts: [],
            profilePicture: ""
        };
         try {
             const userRef = doc(collection(db, collections.users), user.id);
             await setDoc(userRef, userData);
             console.log("Document written with ID:", user.id);
         } catch (error) {
             console.error("Error adding document:", error);
         }
    }

    async function createFirstPost(familyCode: string) {
        const weekly_post_collection_data: WeeklyPostsCollectionsType = {
            posts: [],
            comments: [],
            highlightedWord: "look up to",
            usersResponded: [],
            prompt: "Who did you look up to growing up?",
            family: doc(db, collections.families, familyCode)
        };

        try{
            const weeklyPostCollectionRef = doc(collection(db, collections.weekly_post_collections));
            await setDoc(weeklyPostCollectionRef, weekly_post_collection_data)
            return weeklyPostCollectionRef.id
        }
        catch (error) {
            console.log("Error adding document:", error);
        }
    }

    const generateRandomNumber = () => {
        const min = 10000; // Minimum 6-digit number
        const max = 99999; // Maximum 6-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    async function handlePress() {
        setPressDisabled(true)
        const familyCode = generateRandomNumber().toString();
        const weekly_post_id = await createFirstPost(familyCode);
        if (weekly_post_id === undefined) {
            console.log("Error creating first post");
            return;
        }
        await createFamily(familyCode, weekly_post_id);
        await createUser(familyCode);
        router.push("(screens)/feed");
    }

    if (!user){
        Alert.alert("Error", "User not found");
        return <Redirect href={"(screens)/(initializations)/signUpSignIn"} />
    }
  return (
      <TouchableWithoutFeedback onPress={handlePress} accessible={false} disabled={pressDisabled}>
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
              <View style={styles.mainContainer}>
                  <View style={localStyles.emptySpacing} />
                  <View style={{ display: "flex", alignItems: "center" }}>
                      <Image
                          source={logo}
                          style={{
                              position: "absolute",
                              width: w * 0.6,
                              height: w * 0.6,
                          }}
                      />
                      <Text style={localStyles.clickText}>
                          CLICK ANYWHERE TO BEGIN YOUR
                      </Text>
                      <View style={{position: "absolute", top: w * 0.3}} >
                          <AppName width={w} height={45} />
                      </View>
                  </View>
              </View>
          </SafeAreaView>
      </TouchableWithoutFeedback>
  );
}

export default startReminest

const localStyles = StyleSheet.create({
    emptySpacing: {
        height: h * 0.25,
    },
    clickText: {
        position: "absolute",
        top: w * 0.2,
        color: "#442626",
        fontSize: 18,
        fontFamily: "open-sans"
    },
});
