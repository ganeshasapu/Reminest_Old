import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Image,
    Dimensions,
} from "react-native";
import React, { useContext } from 'react'
import Colors from '../../../constants/Colors'
import { styles } from '../../stylesheets/styles'
import AppName from "../../../assets/vectors/AppName";
import { useRouter } from "expo-router";
import { FamilyFormContext, UserFormContext } from "./_layout";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const logo = require("../../../assets/images/fadedLogoIcon.png");

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const startReminest = () => {
    const router = useRouter();

    const { heritageOptions, activityOptions, milestoneOptions, familyName } = useContext(FamilyFormContext);
    const { firstName, lastName, birthday, phoneNumber } = useContext(UserFormContext);
    const { uid } = useContext(UserFormContext);

    async function createFamily(familyCode: string) {
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
                weekly_posts_collections: [],
                users: [uid],
                creator: uid,
            };

            const familyRef = await doc(collection(db, "families"), familyCode);
            await setDoc(familyRef, familyData);
        } catch (error) {
            console.error("Error adding document:", error);
        }

    }

    async function createUser(familyCode: string) {
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
    }

    const generateRandomNumber = () => {
        const min = 10000; // Minimum 6-digit number
        const max = 99999; // Maximum 6-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    async function handlePress() {
        const familyCode = generateRandomNumber().toString();
        await createFamily(familyCode);
        await createUser(familyCode);
        router.push("(screens)/feed");
    }
  return (
      <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
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
