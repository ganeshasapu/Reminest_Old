import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "../app/stylesheets/styles";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const SkipBar = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={localStyles.safeAreaContainer}>
            <View style={localStyles.barContainer}>
                <TouchableOpacity
                    onPress={() => {
                        router.push(
                            "(screens)/(initializations)/signUpSignIn"
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
        height: h * 0.03,
        flexDirection: "row-reverse",
        marginRight: -(w * 0.08),
    },
    safeAreaContainer: {
        backgroundColor: Colors.background,
    },
    skipText: {
        padding: 10,
    },
});
