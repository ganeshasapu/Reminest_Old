import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import { PostType, UserType, mediaType } from "../app/schema";
import { ResizeMode, Video } from "expo-av";
import { getDoc } from "firebase/firestore";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

interface PostCardSlideProps {
    slideIndex: number;
    post: PostType;
    media: mediaType;
    currentInterval: number;
}

const PostCardSlide = ({ slideIndex, post, media, currentInterval }: PostCardSlideProps) => {
    const [author, setAuthor] = useState<UserType | null>(null);
    const videoRef = useRef<Video | null>(null);
    const handleVideoRef = useCallback((ref: Video | null) =>{
        if (ref) {
            videoRef.current = ref;
        }
    }, [])

    useEffect(() => {
        const fetchAuthors = async () => {
            const author = await getDoc(post.author);
            setAuthor(author.data() as UserType);
        };

        fetchAuthors();
    }, [post]);

     useEffect(() => {
         if (currentInterval == slideIndex + 1) {
             if (videoRef.current) {
                 videoRef.current.playFromPositionAsync(0);
             }
         }
     }, [currentInterval]);


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

    const getFormattedDate = (date: Date): string => {
        const formattedDate = `${
            monthNames[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
        return formattedDate;
    };

    if (!post || !media || !author) {
        return null;
    }

    return (
        <View style={localStyles.container}>
            {media.type == "IMAGE" ? (
                <View style={localStyles.imageContaienr}>
                    <Image
                        key={slideIndex}
                        style={localStyles.image}
                        source={media.url}
                    />
                </View>
            ) : (
                <Video
                    ref={handleVideoRef}
                    style={localStyles.video}
                    source={{ uri: media.url }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
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
    video: {
        width: w * 0.9 - 20,
        height: (w * 0.9 - 20) * (16 / 9),
        borderRadius: 20,
    },
    imageContaienr: {
        width: w * 0.9 - 20,
        height: (w * 0.9 - 20) * (16 / 9),
        display: "flex",
        justifyContent: "center",
    },
    image: {
        width: w * 0.9 - 20,
        height: w * 0.9 - 20,
        borderRadius: 10,
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
