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
    const [intervals, setIntervals] = React.useState(1);
    const [interval, setInterval] = React.useState(0);
    const [width, setWidth] = React.useState(0);


    const init = (w: number) => {
        if (!postsData){
            return;
        }
        setWidth(w);
    }

    const getInterval = (offset: any) => {
        for (let i = 1; i <= intervals; i++) {
            if (offset < (width / intervals) * i) {
                return i - 1;
            }
            if (i == intervals) {
                return i - 1;
            }
        }
        return 0
    };

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

    useEffect(() =>{
        if (!postsData) {
            return;
        }

        let count = 0;

        postsData.forEach((item) => {
            count += item.media.length;
        });

        setIntervals(count + 1);
    }, [postsData, width])

    if (!post || !postsData) {
        return null;
    }

    return (
        <View style={localStyles.postContainer}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                onScroll={(data) => {
                    setInterval(getInterval(data.nativeEvent.contentOffset.x));
                }}
                scrollEventThrottle={300}
                style={localStyles.scrollView}
                onContentSizeChange={(w, h) => {init(w)}}
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
                                currentInterval={interval}
                                  post={post}
                                  media={media}
                                  key={index}
                                  slideIndex={index}
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
