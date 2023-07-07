import { StyleSheet, Text, TouchableOpacity, Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
    FamilyType,
    UserType,
    WeeklyPostsCollectionsType,
    collections,
} from "../app/schema";
import { useRouter } from "expo-router";
import Colors from "../constants/Colors";
import { styles } from "../app/stylesheets/styles";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../app/firebase";

export interface PostCardCoverProps {
    userHasSubmitted: boolean;
    post: WeeklyPostsCollectionsType;
    index: number;
    familyData: FamilyType;
}

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const PostCardCover = ({
    userHasSubmitted,
    post,
    index,
    familyData,
}: PostCardCoverProps) => {
    const router = useRouter();

    const [respondedNames, setRespondedNames] = useState<string[]>([]);

    useEffect(() => {
        if (post) {
            post.usersResponded.forEach(async (userId) => {
                const userRef = await getDoc(
                    doc(db, collections.users, userId)
                );
                if (userRef.exists()) {
                    const user = userRef.data() as UserType;
                    setRespondedNames((oldArray) => [
                        ...oldArray,
                        user.firstName,
                    ]);
                }
            });
        }
    }, []);

    const namesToString = (names: string[]) => {
        if (names.length === 0) {
            return "Be the first to respond!";
        }

        let namesString = names[0];

        if (names.length === 2) {
            namesString += " and " + names[1];
        } else if (names.length > 2) {
            for (let i = 1; i < names.length - 1; i++) {
                namesString += ", " + names[i];
            }
            namesString += ", and " + names[names.length - 1];
        }
        const verb = names.length === 1 ? "has" : "have";

        return namesString + " " + verb + " responded";
    };

    let beforeHighlight,
        highlight,
        afterHighlight = "";

    const splitPrompt = (prompt: string) => {
        const highlightIndex = prompt.indexOf(post.highlightedWord);
        beforeHighlight = prompt.slice(0, highlightIndex);
        highlight = prompt.slice(
            highlightIndex,
            highlightIndex + post.highlightedWord.length
        );
        afterHighlight = prompt.slice(
            highlightIndex + post.highlightedWord.length,
            prompt.length
        );
    };
    splitPrompt(post.prompt);

    return userHasSubmitted ? (
        <TouchableOpacity
            key={index}
            style={[localStyles.postContainer, localStyles.submittedPost]}
            activeOpacity={0.8}
            onPress={() =>
                router.push({
                    pathname: "(screens)/postCollectionScreen",
                    params: {
                        collectionId:
                            familyData.weekly_posts_collections[index],
                    },
                })
            }
        >
            <View style={localStyles.emptySpacing2} />
            <Text style={localStyles.submittedPromptText}>
                {beforeHighlight}
                <Text
                    style={[
                        localStyles.submittedPromptText,
                        { backgroundColor: "white" },
                    ]}
                >
                    {highlight}
                </Text>
                {afterHighlight}
            </Text>

            <Text style={localStyles.submittedNameText}>
                {namesToString(respondedNames)}
            </Text>
        </TouchableOpacity>
    ) : (
        <View
            key={index}
            style={[localStyles.postContainer, localStyles.unsubmittedPost]}
        >
            <View style={localStyles.emptySpacing} />
            <Text style={localStyles.unsubmittedPromptText}>
                {beforeHighlight}
                <Text
                    style={[
                        localStyles.unsubmittedPromptText,
                        { backgroundColor: Colors.orange },
                    ]}
                >
                    {highlight}
                </Text>
                {afterHighlight}
            </Text>

            <Text style={localStyles.unsubmittedNameText}>
                {namesToString(respondedNames)}
            </Text>

            <Text style={localStyles.largeText}>
                Post this weeks prompt to view this story
            </Text>
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100%",
                }}
            >
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "(screens)/postCollectionScreen",
                            params: {
                                collectionId:
                                    familyData.weekly_posts_collections[index],
                            },
                        })
                    }
                    style={localStyles.button}
                >
                    <Text style={styles.buttonText}>Post Your Story</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostCardCover;

const localStyles = StyleSheet.create({
    postContainer: {
        padding: 20,
        borderRadius: 20,
        height: h * 0.7,
        width: w * 0.8,
        display: "flex",
    },
    emptySpacing: {
        height: 0.1 * h,
    },
    emptySpacing2: {
        height: 0.4 * h,
    },
    unsubmittedPost: {
        backgroundColor: "#442626",
    },
    submittedPost: {
        backgroundColor: Colors.orange,
    },
    unsubmittedPromptText: {
        color: "#fff",
        fontSize: 40,
        fontFamily: "gabriel-sans",
        paddingVertical: 20,
        lineHeight: 50,
    },
    submittedPromptText: {
        color: "#000",
        fontSize: 40,
        fontFamily: "gabriel-sans",
        lineHeight: 50,
    },
    unsubmittedNameText: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "open-sans",
        paddingVertical: 40,
    },
    submittedNameText: {
        color: "#444",
        fontSize: 15,
        fontFamily: "open-sans",
        paddingVertical: 40,
    },
    button: {
        backgroundColor: Colors.blue,
        borderRadius: 10,
        width: "100%",
        height: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    largeText: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "gabriel-sans",
        paddingVertical: 20,
    },
});
