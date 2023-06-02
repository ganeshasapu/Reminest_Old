import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "open-sans",
    },
    bigtext: {
        color: "#fff",
        fontSize: 24,
        fontFamily: "gabriel-sans",
    },
    titletext: {
        color: "#fff",
        fontSize: 34,
        fontFamily: "gabriel-sans",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
});
