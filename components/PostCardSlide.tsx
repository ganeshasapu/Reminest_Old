import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import {  PostType, UserType, mediaType } from "../app/schema";
import { ResizeMode, Video } from "expo-av";
import { getDoc } from "firebase/firestore";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

interface PostCardSlideProps {
    imageIndex: number;
    post: PostType;
    media: mediaType;
}

const PostCardSlide = ({
    imageIndex,
    post,
    media,
}: PostCardSlideProps) => {
    const [author, setAuthor] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            const author = await getDoc(post.author);
            setAuthor(author.data() as UserType);
        };

        fetchAuthors();
    }, [post]);

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

    if (!post || !media || !author) {
        return null;
    }


    return (
        <View style={localStyles.container}>
            {media.type == "IMAGE" ? (
                <Image
                    key={imageIndex}
                    style={localStyles.image}
                    source={media.url}
                />
            ) : (
                <Video
                    style={localStyles.image}
                    source={{ uri: media.url }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={true}
                />
            )}
            <View style={localStyles.captionContainer}>
                <Text style={localStyles.nameText}>{author.firstName}</Text>
                <Text style={localStyles.dateText}>
                    {getFormattedDate(new Date(post.timestamp))}
                </Text>
            </View>
        </View>
    );
};

export default PostCardSlide;

const localStyles = StyleSheet.create({
    container: {
        width: w * 0.9,
        height: h * 0.8,
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
