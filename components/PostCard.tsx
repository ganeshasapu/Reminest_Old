import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import PostCardSlide from "./PostCardSlide";
import PostCardCover from "./PostCardCover";
import { PostCardCoverProps } from "./PostCardCover";
import { DocumentReference, getDoc } from "firebase/firestore";
import { PostType, UserType, mediaType } from "../app/schema";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

interface PostCardProps extends PostCardCoverProps {}

const PostCard = ({
    userHasSubmitted,
    post,
    weeklyPostIndex,
    familyData,
}: PostCardProps) => {
    const [postsData, setPostsData] = useState<PostType[] | null>(null);

    useEffect(() => {
        if (!post) {
            return;
        }
        const fetchPostsData = async () => {
            const postsData = await Promise.all(
                post.posts.map((postId) => getDoc(postId))
            );
            setPostsData(postsData.map((doc) => doc.data() as PostType));
        };
        fetchPostsData();
    }, [post]);

    // console.log("post", post)
    // console.log("postsData", postsData)
    // console.log(postsData)

    if (!post || !postsData) {
        return null;
    }

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
                    weeklyPostIndex={weeklyPostIndex}
                    familyData={familyData}
                />
                {userHasSubmitted
                    ? postsData.map((post, index) =>
                          post.media.map((media, index) => (
                              <PostCardSlide
                                  post={post}
                                  media={media}
                                  key={index}
                                  imageIndex={index}
                              />
                          ))
                      )
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
        height: h * 0.8,
        width: w * 0.9,
        display: "flex",
        marginVertical: 20,
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
