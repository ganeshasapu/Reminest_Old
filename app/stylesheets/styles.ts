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
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
});
