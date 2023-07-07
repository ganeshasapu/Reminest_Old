import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import PostCardSlide from "./PostCardSlide";
import PostCardCover from "./PostCardCover";
import { PostCardCoverProps } from "./PostCardCover";
import { DocumentReference, doc, getDoc } from "firebase/firestore";
import { PostType, collections } from "../app/schema";
import { db } from "../app/firebase";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;


interface PostCardProps extends PostCardCoverProps {

}

const PostCard = ({
    userHasSubmitted,
    post,
    index,
    familyData,
}: PostCardProps) => {

    return (
        <View style={localStyles.postContainer}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                scrollEventThrottle={100}
                style={localStyles.scrollView}
            >
                <PostCardCover
                    userHasSubmitted={userHasSubmitted}
                    post={post}
                    index={index}
                    familyData={familyData}
                />
                {userHasSubmitted
                    ? post.posts.map((postId, index) => (
                          <PostCardSlide
                              key={index}
                              imageIndex={index}
                              postId={postId as DocumentReference<PostType>}
                          />
                      ))
                    : null}
            </ScrollView>
        </View>
    );
};

export default PostCard;

const localStyles = StyleSheet.create({
    scrollView: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    postContainer: {
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
