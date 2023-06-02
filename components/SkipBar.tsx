import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { styles } from "../app/stylesheets/styles";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

const SkipBar = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={localStyles.safeAreaContainer}>
            <View style={localStyles.barContainer}>
                <TouchableOpacity
                    onPress={() => {
                        console.log("skip");
                        router.push(
                            "(screens)/(initializations)/initialization1"
                        );
                    }}
                >
                    <Text style={styles.text}>Skip</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SkipBar;

const localStyles = StyleSheet.create({
    barContainer: {
        display: "flex",
        width: "100%",
        backgroundColor: Colors.background,
        flexDirection: "row-reverse",
        paddingTop: 15,
        marginRight: -40,
    },
    safeAreaContainer: {
        backgroundColor: Colors.background,
    },
    skipText: {
        padding: 10,
    },
});
