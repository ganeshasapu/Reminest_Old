import {
    Alert,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useContext } from "react";
import Colors from "../../../constants/Colors";
import { styles } from "../../stylesheets/styles";
import LogoDark from "../../../assets/vectors/LogoDark";
import TwoColumnScrollView from "../../../components/TwoColumnScrollView";
import HeritageIcon from "../../../assets/vectors/HeritageIcon";
import ActivitiesIcon from "../../../assets/vectors/ActivitiesIcon";
import MilestonesIcon from "../../../assets/vectors/MilestonesIcon";
import { FamilyFormContext } from "./_layout";
import ArrowNavigation from "../../../components/ArrowNavigation";

const familyInterests = () => {

    const { heritageOptions, activityOptions, milestoneOptions, setHeritageOptions, setActivityOptions, setMilestoneOptions  } = useContext(FamilyFormContext);

    async function checkValid(){
        if (
            heritageOptions.filter((option) => option.selected).length +
                activityOptions.filter((option) => option.selected).length +
                milestoneOptions.filter((option) => option.selected).length < 3
        ) {
            Alert.alert("Please select at least 3 interests");
            return false;
        }
        return true
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.mainContainer}>
                <LogoDark width={40} height={40} />
                <Text style={[styles.titletext, { marginTop: 10 }]}>
                    Interests
                </Text>
                <Text
                    style={[
                        styles.text,
                        {
                            marginTop: 10,
                            fontFamily: "open-sans",
                            fontSize: 15,
                        },
                    ]}
                >
                    Pick things that your family would be interested in
                </Text>
                <Text style={[styles.text, { marginTop: 40 }]}>
                    <HeritageIcon width={20} height={20} /> Heritage & History
                </Text>
                <TwoColumnScrollView
                    data={heritageOptions}
                    toggleOptionFunc={setHeritageOptions}
                    optionColor={Colors.blue}
                />
                <Text style={[styles.text]}>
                    <ActivitiesIcon width={20} height={20} /> Activities
                </Text>
                <TwoColumnScrollView
                    data={activityOptions}
                    toggleOptionFunc={setActivityOptions}
                    optionColor={Colors.purple}
                />
                <Text style={[styles.text]}>
                    <MilestonesIcon width={20} height={20} /> Milestones and
                    Events
                </Text>
                <TwoColumnScrollView
                    data={milestoneOptions}
                    toggleOptionFunc={setMilestoneOptions}
                    optionColor={Colors.orange}
                />
            </View>
            <ArrowNavigation
                left={{ route: "(screens)/(initializations)/familyName" }}
                right={{ route: "(screens)/(initializations)/startReminest", callback: checkValid }}
            />
        </SafeAreaView>
    );
};

export default familyInterests;

const localStyles = StyleSheet.create({

});
