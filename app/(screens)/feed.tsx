import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../auth";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserType, FamilyType, WeeklyPostsCollectionsType } from "../schema";
import { collections } from "../schema";
import LogoName from "../../assets/vectors/LogoName";
import { styles } from "../stylesheets/styles";
import Colors from "../../constants/Colors";
import FamilyCode from "../../components/FamilyCode";
import PostCard from "../../components/PostCard";
import { useRouter } from "expo-router";

const feed = () => {
    const [userData, setUserData] = useState<UserType | null>(null);
    const [familyData, setFamilyData] = useState<FamilyType | null>(null);
    const [weeklyPostsCollections, setWeeklyPostsCollections] = useState<
        WeeklyPostsCollectionsType[]
    >([]);
    const [isLoading, setLoading] = useState(true);

    const { user } = useContext(FirebaseContext);

    // const router = useRouter();
    // useEffect(() => {
    //     router.push("/(screens)/home");
    // }, []);

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
                const weeklyPostsCollectionsData = await Promise.all(
                    familyData.weekly_posts_collections.map(async (id) => {
                        const docSnap = await getDoc(
                            doc(db, collections.weekly_post_collections, id)
                        );

                        if (docSnap.exists()) {
                            return docSnap.data();
                        } else {
                            console.log(`No such document with id ${id}`);
                            return null;
                        }
                    })
                );

                setWeeklyPostsCollections(
                    weeklyPostsCollectionsData as WeeklyPostsCollectionsType[]
                );
            }
        };
        fetchWeeklyPostsCollections();
    }, [familyData]); // familyData is the dependency


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
                    <ScrollView contentContainerStyle={localStyles.scrollView} showsVerticalScrollIndicator={false} >
                        {weeklyPostsCollections.reverse().map((post, index) => (
                            <PostCard
                                userHasSubmitted={post.usersResponded.includes(user.uid)}
                                post={post}
                                weeklyPostIndex={weeklyPostsCollections.length - index - 1}
                                familyData={familyData}
                                key={index}
                            />
                        ))}
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
    scrollView: {
        alignItems: "center",
        justifyContent: "center",
    },
});
