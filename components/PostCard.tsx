import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import PostCardSlide from "./PostCardSlide";
import PostCardCover from "./PostCardCover";
import { PostCardCoverProps } from "./PostCardCover";
import { Media, PostsType } from "../schema";
import { fetchMediaFromPostId, fetchPostsFromPostCollectionId } from "../db";
import Loading from "../app/(screens)/loading";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

interface PostCardProps extends PostCardCoverProps {}

const PostCard = ({
    userHasSubmitted,
    postCollection,
    postCollectionIndex,
    usersResponded,
}: PostCardProps) => {
    const [postsData, setPostsData] = useState<PostsType[] | null>(null);
    const [intervals, setIntervals] = React.useState(1);
    const [interval, setInterval] = React.useState(0);
    const [width, setWidth] = React.useState(0);
    const [media, setMedia] = React.useState<Media[][] | null>(null)

    const init = (w: number) => {
        if (!postsData) {
            return;
        }
        setWidth(w);
    };


    const getInterval = (offset: any) => {
        for (let i = 1; i <= intervals; i++) {
            if (offset < (width / intervals) * i) {
                return i - 1;
            }
            if (i == intervals) {
                return i - 1;
            }
        }
        return 0;
    };

    useEffect(() =>{
        async function fetchData() {
            if (!postCollection.id) return
            const posts = await fetchPostsFromPostCollectionId(postCollection.id)
            setPostsData(posts)

            if (!posts) return


            let postMedia: Media[][] = []
            if (userHasSubmitted){
                for (let i = 0; i < posts.length; i++){
                    const post_id = posts[i].id
                    if (!post_id) return
                    const media = await fetchMediaFromPostId(post_id)
                    if (!media) return
                    postMedia.push(media)
                }
            }
            setMedia(postMedia)
        }

        fetchData()
    }, [])


    if (!postsData) return null

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
                onContentSizeChange={(w, h) => {
                    init(w);
                }}
            >
                <PostCardCover
                    userHasSubmitted={userHasSubmitted}
                    postCollection={postCollection}
                    postCollectionIndex={postCollectionIndex}
                    usersResponded={usersResponded}
                />
                {userHasSubmitted && media && media.length > 0
                    ? postsData.map((post, index) =>
                          media[index].map((media, index) => (
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
