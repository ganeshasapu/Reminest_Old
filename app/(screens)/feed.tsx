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
import LogoName from "../../assets/vectors/LogoName";
import { styles } from "../stylesheets/styles";
import Colors from "../../constants/Colors";
import PostCardCover from "../../components/PostCardCover";
import FamilyCode from "../../components/FamilyCode";
import PostCard from "../../components/PostCard";

const feed = () => {
    const [userData, setUserData] = useState<UserType | null>(null);
    const [familyData, setFamilyData] = useState<FamilyType | null>(null);
    const [weeklyPostsCollections, setWeeklyPostsCollections] = useState<
        WeeklyPostsCollectionsType[]
    >([]);
    const [isLoading, setLoading] = useState(true);

    const { user } = useContext(FirebaseContext);

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
        return userPosts.some((item) => weeklyCollectionposts.includes(item));
    }

    if (user === null) return;

    if (
        isLoading ||
        !userData ||
        !familyData ||
        weeklyPostsCollections.length == 0
    )
        return <Text>Loading...</Text>;
    else {
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.background }}
            >
                <View style={styles.mainContainer}>
                    <LogoName width={150} height={50} />
                    <ScrollView contentContainerStyle={localStyles.scrollView}>
                        {/* <PostCard /> */}
                        {weeklyPostsCollections.map((post, index) => (
                            <PostCard
                                userHasSubmitted={post.usersResponded.includes(user.uid)}
                                post={post}
                                index={index}
                                familyData={familyData}
                                key={index}
                            />
                        ))}
                        {/* <PostSlide /> */}
                        <FamilyCode code={userData.families[0]} />
                        <Text>You've reached the end!</Text>
                        <Text style={{textAlign: "center"}}>Keep building your Reminest to collect more memories!</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
};

export default feed;

const localStyles = StyleSheet.create({
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
    },

    postPrompt: {
        fontSize: 16,
    },
});
