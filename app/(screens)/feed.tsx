import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authProvider";
import LogoName from "../../assets/vectors/LogoName";
import { styles } from "../stylesheets/styles";
import Colors from "../../constants/Colors";
import FamilyCode from "../../components/FamilyCode";
import PostCard from "../../components/PostCard";
import Loading from "./loading";
import { FamiliesType, PostCollectionsType, UsersType } from "../../schema";
import {
    fetchFamilyFromUserId,
    fetchPostCollectionsFromFamilyId,
    fetchUsersRespondedFromPostCollection,
} from "../../db";

const feed = () => {
    const [family, setFamily] = useState<FamiliesType | null>(null);
    const [postCollections, setPostCollections] = useState<
        PostCollectionsType[]
    >([]);
    const [usersResponded, setUsersResponded] = useState<UsersType[][] | null>(null);

    const { user, logoutUser } = useContext(AuthContext);


    useEffect(() => {
        async function fetchFeedData() {
            if (user === null) return;
            // getting family
            const fetchedFamily = await fetchFamilyFromUserId(user.id);
            if (fetchedFamily === null || fetchedFamily.id == undefined) return;
            setFamily(fetchedFamily);

            //getting post collections
            const fetchedPostCollections =
                await fetchPostCollectionsFromFamilyId(fetchedFamily.id);
            if (fetchedPostCollections === null) return;
            setPostCollections(fetchedPostCollections);

            //getting users responded
            let postCollectionIds: number[] = [];
            fetchedPostCollections.forEach((postCollection) => {
                if (postCollection.id === undefined) return;
                postCollectionIds.push(postCollection.id);
            });

            let fetchedUsersResponded: UsersType[][] = [];
            for (let i = 0; i < postCollectionIds.length; i++) {
                const fetchedUsersRespondedForPostCollection =
                    await fetchUsersRespondedFromPostCollection(
                        postCollectionIds[i]
                    );
                if (fetchedUsersRespondedForPostCollection === null) return;
                fetchedUsersResponded.push(
                    fetchedUsersRespondedForPostCollection
                );
            }

            setUsersResponded(fetchedUsersResponded);
        }
        fetchFeedData();
    }, []);

    function checkHasSubmitted(postArr: UsersType[]){
        if (!postCollections || !postArr) return false;
        const respondedIds = postArr.map((user) => user.id);
        const hasSubmitted = respondedIds.includes(user?.id);
        return hasSubmitted;
    }


    if (!user || !usersResponded) return <Loading />;
    if (!family|| family.id == undefined) return <Loading />;
    if (postCollections.length === 0) return <Loading />;
    if (usersResponded.length === 0) return <Loading />;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.mainContainer}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        logoutUser();
                    }}
                >
                    <LogoName width={150} height={50} />
                </TouchableWithoutFeedback>
                <ScrollView
                    contentContainerStyle={localStyles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    {postCollections.reverse().map((post, index) => (
                        <PostCard
                            userHasSubmitted={checkHasSubmitted(usersResponded[index])}
                            postCollection={post}
                            postCollectionIndex={
                                postCollections.length - index - 1
                            }
                            usersResponded={usersResponded[index]}
                            key={index}
                        />
                    ))}
                    <FamilyCode code={family?.id} />
                    <Text>You've reached the end!</Text>
                    <Text style={{ textAlign: "center" }}>
                        Keep building your Reminest to collect more memories!
                    </Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default feed;

const localStyles = StyleSheet.create({
    scrollView: {
        alignItems: "center",
        justifyContent: "center",
    },
});
