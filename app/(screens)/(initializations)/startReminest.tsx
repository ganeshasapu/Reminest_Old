import {
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
import { FamilyFormContext } from "./_layout";
import { AuthContext } from "../../authProvider";
import { createNewFamily } from "../../../db";

const logo = require("../../../assets/images/fadedLogoIcon.png");

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const startReminest = () => {
    const router = useRouter();

    const { heritageOptions, activityOptions, milestoneOptions, familyName } = useContext(FamilyFormContext);
    const { user } = useContext(AuthContext);
    const [pressDisabled, setPressDisabled] = useState(false);

    function getFamilyInterests() {
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

        return selectedTitles
    }

    async function handlePress() {
        setPressDisabled(true)
        await createNewFamily(getFamilyInterests(), familyName)
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
