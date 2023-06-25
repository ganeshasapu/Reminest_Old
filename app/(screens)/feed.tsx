import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../auth";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserType, FamilyType, WeeklyPostsCollectionsType } from "../schema";
import { collections } from "../schema";
import { useRouter } from "expo-router";

const feed = () => {
    const [userData, setUserData] = useState<UserType | null>(null);
    const [familyData, setFamilyData] = useState<FamilyType | null>(null);
    const [weeklyPostsCollections, setWeeklyPostsCollections] = useState<
        WeeklyPostsCollectionsType[]
    >([]);
    const [isLoading, setLoading] = useState(true);

    const { user } = useContext(FirebaseContext);

    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userRef = await getDoc(
                    doc(db, collections.users, user.uid)
                );
                if (userRef.exists()) {
                    setUserData(userRef.data() as UserType);
                }
            }
        };
        fetchUserData();
    }, [user]); // user is the dependency

    useEffect(() => {
        const fetchFamilyData = async () => {
            if (userData && userData.families) {
                const familyRef = await getDoc(
                    doc(db, collections.families, userData.families[0])
                );
                if (familyRef.exists()) {
                    setFamilyData(familyRef.data() as FamilyType);
                    setLoading(false);
                }
            }
        };
        fetchFamilyData();
    }, [userData]); // userData is the dependency

    useEffect(() => {
        const fetchWeeklyPostsCollections = async () => {
            if (familyData && familyData.weekly_posts_collections) {
                familyData.weekly_posts_collections.forEach(
                    async (weeklyPostCollection) => {
                        const weeklyPostCollectionRef = await getDoc(
                            doc(
                                db,
                                collections.weekly_post_collections,
                                weeklyPostCollection
                            )
                        );
                        if (weeklyPostCollectionRef.exists()) {
                            setWeeklyPostsCollections([
                                ...weeklyPostsCollections,
                                weeklyPostCollectionRef.data() as WeeklyPostsCollectionsType,
                            ]);
                        }
                    }
                );
            }
        };
        fetchWeeklyPostsCollections();
    }, [familyData]); // familyData is the dependency

    function userSubmittedPost(
        userPosts: string[],
        weeklyCollectionposts: string[]
    ): boolean {
        console.log(userPosts, weeklyCollectionposts);
        return userPosts.some((item) => weeklyCollectionposts.includes(item));
    }

    if (user === null) return;

    console.log(isLoading, userData, familyData, weeklyPostsCollections)
    if (
        isLoading ||
        !userData ||
        !familyData ||
        weeklyPostsCollections.length == 0
    )
        return <Text>Loading...</Text>;
    else {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.welcome}>
                    {"Welcome " + userData.firstName + ", " + userData.lastName}
                </Text>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {weeklyPostsCollections.map((post, index) =>
                        userSubmittedPost(
                            userData.posts.map((postRef) => postRef.path),
                            post.posts.map((postRef) => postRef.path)
                        ) ? (
                            <TouchableOpacity
                                key={index}
                                style={styles.postContainer}
                                onPress={() =>
                                    router.push({
                                        pathname:
                                            "(screens)/postCollectionScreen",
                                        params: {
                                            collectionId:
                                                familyData
                                                    .weekly_posts_collections[
                                                    index
                                                ],
                                        },
                                    })
                                }
                            >
                                <Text style={styles.postPrompt}>
                                    {post.prompt}
                                </Text>
                                <Text>View Posts</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                key={index}
                                style={styles.postContainer}
                                onPress={() =>
                                    router.push({
                                        pathname:
                                            "(screens)/postCollectionScreen",
                                        params: {
                                            collectionId:
                                                familyData
                                                    .weekly_posts_collections[
                                                    index
                                                ],
                                        },
                                    })
                                }
                            >
                                <Text style={styles.postPrompt}>
                                    {post.prompt}
                                </Text>
                                <Text>Not Submitted Yet, click to submit</Text>
                            </TouchableOpacity>
                        )
                    )}
                    <Text>
                        {user.uid === familyData.creator
                            ? userData.families[0]
                            : ""}
                    </Text>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    welcome: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
    },
    scrollView: {
        alignItems: "center",
        justifyContent: "center",
    },
    postContainer: {
        backgroundColor: "#F5F5F5",
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        height: 300,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    postPrompt: {
        fontSize: 16,
    },
});
