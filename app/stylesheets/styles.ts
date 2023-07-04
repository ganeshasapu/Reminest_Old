import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    text: {
        color: "#000",
        fontSize: 16,
        fontFamily: "archivo",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "open-sans",
    },
    bigtext: {
        color: "#000",
        fontSize: 24,
        fontFamily: "gabriel-sans",
    },
    titletext: {
        color: "#000",
        fontSize: 34,
        fontFamily: "gabriel-sans",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    button: {
        backgroundColor: Colors.blue,
        borderRadius: 10,
        width: "100%",
        height: 45,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
