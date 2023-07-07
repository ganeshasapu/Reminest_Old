import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { Image } from "expo-image";
import { DocumentReference, getDoc } from "firebase/firestore";
import { PostType, UserType } from "../app/schema";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

interface PostCardSlideProps {
    imageIndex: number;
    postId: DocumentReference<PostType>;
}

const PostCardSlide = ({
    imageIndex,
    postId,
}: PostCardSlideProps) => {

    const [postData, setPostData] = useState<PostType | null>(null);
    const [author, setAuthor] = useState<UserType | null>(null);

    useEffect(() => {
        getDoc(postId).then((doc) => {
            console.log("Doc: ", doc.data());
            setPostData(doc.data() as PostType);
        }
        );
    }, []);

    useEffect(() => {
        if (!postData) {
            return;
        }
        getDoc(postData.author).then((doc) => {
            console.log("Author: ", doc.data());
            setAuthor(doc.data() as UserType);
        })

    }, [postData]);

    if (!postData || !author) {
        return null;
    }

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const getFormattedDate = (date: Date): string =>{
         const formattedDate = `${
             monthNames[date.getMonth()]
         } ${date.getDate()}, ${date.getFullYear()}`;
         return formattedDate;
    }

    return (
        <View style={localStyles.container}>
            <Image
                key={imageIndex}
                style={localStyles.image}
                source={postData.media[0].url}
            />
            <View style={localStyles.captionContainer}>
                <Text style={localStyles.nameText}>{author.firstName}</Text>
                <Text style={localStyles.dateText}>{getFormattedDate(new Date(postData.timestamp))}</Text>
            </View>
        </View>
    );
};

export default PostCardSlide;

const localStyles = StyleSheet.create({
    scrollView: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    postContainer: {
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        height: h * 0.7,
        width: w * 0.8,
        display: "flex",
    },
    container: {
        width: w * 0.8,
        height: h * 0.7,
        borderRadius: 20,
        padding: 10,
    },
    image: {
        width: "100%",
        height: "90%",
        borderRadius: 20,
    },
    captionContainer: {
        width: "100%",
        height: "10%",
        backgroundColor: "#fff",
    },
    nameText: {
        fontFamily: "archivo-bold",
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 5,
    },
    dateText: {
        fontFamily: "archivo",
        fontWeight: "300",
        marginLeft: 5,
    },
});
