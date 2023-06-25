import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDoc, doc, DocumentReference } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
    collections,
    PostType,
    UserType,
    WeeklyPostsCollectionsType,
} from "../schema";
import { ResizeMode, Video } from "expo-av";

const postCollectionScreen = () => {
    const { collectionId } = useLocalSearchParams();
    const [collectionData, setCollectionData] =
        useState<WeeklyPostsCollectionsType | null>(null);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [authors, setAuthors] = useState<UserType[]>([]);

    const router = useRouter();

    if (!collectionId) return <Text>No post collection</Text>;

    useEffect(() => {
        const fetchWeeklyPostCollection = async () => {
            const weeklyPostCollectionRef = await getDoc(
                doc(
                    db,
                    collections.weekly_post_collections,
                    collectionId.toString()
                )
            );
            if (weeklyPostCollectionRef.exists()) {
                setCollectionData(
                    weeklyPostCollectionRef.data() as WeeklyPostsCollectionsType
                );
            }
        };
        fetchWeeklyPostCollection();
    }, []);

    useEffect(() => {
        if (!collectionData) return console.log("No collection data");
        const retrievePostData = async () => {
            if (collectionData?.posts.length > 0) {
                const docSnap = await getDoc(collectionData.posts[0]);
                if (docSnap.exists()) {
                    // Document data is available
                    const data = docSnap.data();
                    setPosts([...posts, data as PostType]);
                    // Use the 'data' object for further processing
                } else {
                    // Document doesn't exist
                    console.log("No such document!");
                }
            }
        };
        retrievePostData();
    }, [collectionData]);

    useEffect(() => {
        if (!posts) return console.log("No posts");
        const retrieveAuthorData = async () => {
            if (posts.length > 0) {
                posts.forEach(async (post) => {
                    const docSnap = await getDoc(post.author);
                    if (docSnap.exists()) {
                        // Document data is available
                        const data = docSnap.data();
                        console.log("Document data:", data);
                        setAuthors((prevAuthors) => [
                            ...prevAuthors,
                            data as UserType,
                        ]);
                        // Use the 'data' object for further processing
                    } else {
                        // Document doesn't exist
                        console.log("No such document!");
                    }
                });
            }
        };
        retrieveAuthorData();
    }, [posts]);
    if (!collectionData || !posts || authors.length != posts.length)
        return <Text>Loading...</Text>;

    if (posts.length == 0 || authors.length == 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>{collectionData.prompt}</Text>
                <Button
                    title="Add image"
                    onPress={() => {
                        router.push({
                            pathname: "(screens)/addImage",
                            params: {
                                collectionID: collectionId.toString(),
                                prompt: collectionData.prompt,
                            },
                        });
                    }}
                ></Button>
                <Button
                    title="Add Video"
                    onPress={() => {
                        router.push({
                            pathname: "(screens)/addVideo",
                            params: {
                                collectionID: collectionId.toString(),
                                prompt: collectionData.prompt,
                            },
                        });
                    }}
                ></Button>
                <Button
                    title="Add Media"
                    onPress={() => {
                        router.push({
                            pathname: "(screens)/addMedia",
                            params: {
                                collectionID: collectionId.toString(),
                                prompt: collectionData.prompt,
                            },
                        });
                    }}
                ></Button>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>{collectionData.prompt}</Text>
            <ScrollView style={styles.scrollView}>
                {posts.map((post, postIndex) => (
                    <ScrollView
                        key={postIndex}
                        horizontal={true}
                        style={{ height: 500 }}
                    >
                        <Text>
                            {authors[postIndex].firstName +
                                " " +
                                authors[postIndex].lastName}
                        </Text>
                        {post.media.map((media, mediaIndex) =>
                            media.type === "IMAGE" ? (
                                <View key={mediaIndex}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: post.media[0].url }}
                                    />
                                </View>
                            ) : media.type === "VIDEO" ? (
                                <View key={mediaIndex}>
                                    <Video
                                        source={{ uri: post.media[0].url }}
                                        style={styles.video}
                                        useNativeControls
                                        resizeMode={ResizeMode.COVER}
                                    />
                                </View>
                            ) : null
                        )}
                    </ScrollView>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default postCollectionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    postWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
    },
    image: {
        width: 500,
        height: 500,
        resizeMode: "cover",
    },
    video: {
        width: 500,
        height: 500,
        backgroundColor: "black",
    },
});
