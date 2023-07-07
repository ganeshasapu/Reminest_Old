import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "archivo",
    },
    buttonText: {
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
        lineHeight: 40,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
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
