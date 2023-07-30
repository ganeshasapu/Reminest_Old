import { StyleSheet, Text, TouchableOpacity, Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
    FamilyType,
    UserType,
    WeeklyPostsCollectionsType,
    collections,
} from "../schema";
import { useRouter } from "expo-router";
import Colors from "../constants/Colors";
import { styles } from "../app/stylesheets/styles";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../app/firebase";
import LetterProfileImage from "./LetterProfileImage";

export interface PostCardCoverProps {
    userHasSubmitted: boolean;
    post: WeeklyPostsCollectionsType;
    weeklyPostIndex: number;
    familyData: FamilyType;
}

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;

const PostCardCover = ({
    userHasSubmitted,
    post,
    weeklyPostIndex,
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
            for (let i = 1; i < Math.min(names.length, 2); i++) {
                namesString += ", " + names[i];
            }
            if (names.length > 3) {
                namesString += ", " + names[2] + ", and others";
            } else {
                namesString += " and " + names[2];
            }
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
        return [beforeHighlight, highlight, afterHighlight];
    };
    splitPrompt(post.prompt);

    return userHasSubmitted ? (
        <View
            key={weeklyPostIndex}
            style={[localStyles.postContainer, localStyles.submittedPost]}
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
            <View style={localStyles.profileContainer}>
                {respondedNames.slice(0, 3).map((name, index) => (
                    <LetterProfileImage
                        key={index + post.prompt}
                        name={name}
                        index={index}
                    />
                ))}
            </View>
        </View>
    ) : (
        <View
            key={weeklyPostIndex}
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
            <View style={localStyles.profileContainer}>
                {respondedNames.slice(0, 3).map((name, index) => (
                    <LetterProfileImage
                        key={index + post.prompt}
                        name={name}
                        index={index}
                    />
                ))}
            </View>

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
                            pathname: "(screens)/(posting)/recordVideo",
                            params: {
                                collectionId:
                                    familyData.weekly_posts_collections[
                                        weeklyPostIndex
                                    ],
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
        height: h * 0.8,
        width: w * 0.9,
        display: "flex",
        justifyContent: "flex-end"
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
        paddingTop: 40,
        paddingBottom: 20,
    },
    submittedNameText: {
        color: "#444",
        fontSize: 15,
        fontFamily: "open-sans",
        paddingTop: 40,
        paddingBottom: 20,
    },
    button: {
        backgroundColor: Colors.blue,
        borderRadius: 10,
        width: "100%",
        height: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
    },
    largeText: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "gabriel-sans",
        paddingVertical: 20,
    },
    profileContainer: {
        display: "flex",
        flexDirection: "row",
        gap: -10

    },
});
