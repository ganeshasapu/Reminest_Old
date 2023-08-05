import { User } from "@supabase/supabase-js";
import {
    FamiliesType,
    FamilyMembersType,
    Media,
    MediaType,
    PostCollectionsType,
    PostsType,
    UsersType,
    tables,
} from "./schema";
import { supabase } from "./supabase";
import { Alert } from "react-native";

// Currently used when the user enters a sms confirmation
export async function createUserProfile(user: User, userProps: UsersType) {
    if (!user) {
        Alert.alert("Error", "No user found");
        return false;
    }

    const userData = {
        id: user.id,
        first_name: userProps.first_name,
        last_name: userProps.last_name,
        phone_number: userProps.phone_number,
        birthday: userProps.birthday,
    } as UsersType;

    const { error: createError, data } = await supabase
        .from(tables.users)
        .insert(userData)
        .match({ id: user.id });

    if (createError) {
        Alert.alert("Error", createError.message);
        return false;
    }
    return true;
}

export async function joinFamily(familyCode: number, user: User) {
    if (!user) {
        Alert.alert("Error", "No user found");
        return false;
    }

    const familyMemberData = {
        family_id: familyCode,
        user_id: user.id,
    } as FamilyMembersType;

    const { error: InsertFamilyMemberError } = await supabase
        .from(tables.familyMembers)
        .insert([familyMemberData]);

    if (InsertFamilyMemberError) {
        Alert.alert("Error", InsertFamilyMemberError.message);
        return false;
    }
    return true;
}

function generateFamilyCode() {
    const min = 10000; // Minimum 6-digit number
    const max = 99999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createFirstPostCollection(familyCode: number) {
    const postCollectionData: PostCollectionsType = {
        highlighted: "look up to",
        prompt: "Who did you look up to growing up?",
        family_id: familyCode,
    };

    const { data, error: InsertError } = await supabase
        .from(tables.postCollections)
        .insert([postCollectionData]).select("id");

    if (InsertError) {
        Alert.alert("Error", InsertError.message);
        return false;
    }

    if (!data) {
        Alert.alert("Error", "No data returned");
        return false;
    }

    return true;
}

async function createFamily(
    familyCode: number,
    familyInterests: string[],
    familyName: string
) {
    const familyData = {
        id: familyCode,
        family_interests: familyInterests,
        family_name: familyName,
    } as FamiliesType;

    const { data, error: InsertError } = await supabase
        .from(tables.families)
        .insert([familyData])
        .select("id");

    if (InsertError) {
        Alert.alert("Error", InsertError.message);
        return false;
    }

    if (!data) {
        Alert.alert("Error", "No data returned");
        return false;
    }

    const familyMemberData = {
        family_id: familyCode,
        user_id: (await supabase.auth.getUser()).data.user?.id,
    } as FamilyMembersType;

    const { error: InsertFamilyMemberError } = await supabase
        .from(tables.familyMembers)
        .insert([familyMemberData]);

    if (InsertFamilyMemberError) {
        Alert.alert("Error", InsertFamilyMemberError.message);
        return false;
    }

    return true;
}

export async function createNewFamily(
    familyInteresta: string[],
    familyName: string
) {
    const familyCode = generateFamilyCode();
    await createFamily(familyCode, familyInteresta, familyName);
    await createFirstPostCollection(familyCode);
}

export async function fetchFamilyFromUserId(user_id: string) {
    const { data: families_id, error } = await supabase
        .from(tables.familyMembers)
        .select("family_id")
        .eq("user_id", user_id);

    if (error) {
        Alert.alert("Error", error.message);
        return null;
    }

    const { data: family, error: familyError } = await supabase
        .from(tables.families)
        .select("*")
        .eq("id", families_id[0].family_id);


    if (familyError) {
        Alert.alert("Error", familyError.message);
        return null;
    }

    return family[0] as FamiliesType;
}

export async function fetchPostCollectionsFromFamilyId(family_id: number) {
    const { data: postCollections, error: postCollectionError } = await supabase
        .from("post_collections")
        .select("*")
        .eq("family_id", family_id);

    if (postCollectionError) {
        Alert.alert("Error", postCollectionError.message);
        return null;
    }

    return postCollections as PostCollectionsType[];
}

export async function fetchUsersRespondedFromPostCollection(postCollection_id: number){
    const { data: usersResponded, error: usersRespondedError } = await supabase
        .from("users_responded")
        .select("user_id")
        .eq("post_collection_id", postCollection_id);

    if (usersRespondedError) {
         Alert.alert("Error", usersRespondedError.message);
         return null;
    }

    // return usersResponded.map((userResponded) => userResponded.user_id);

    let usersRespondedData = [];

    for (let userResponded of usersResponded) {
        let { data: users, error: userError } = await supabase
            .from(tables.users)
            .select("*")
            .eq("id", userResponded.user_id).limit(1).single()

        if (userError){
             Alert.alert("Error", userError.message);
             return null;
        }

        if (!users) {
            continue;
        }

        usersRespondedData.push(users);
    }

    return usersRespondedData as UsersType[];
}

export async function createNewPost(videoDownloadUrl: string, imageDownloadUrl: string, post_collection_id: number, user: User){
    const postData = {
        author: user.id,
        like_count: 0,
        post_collection_id: post_collection_id
    }

    const {data, error} = await supabase.from(tables.posts).insert([postData]).select("id");

    if (error){
        Alert.alert("Error", error.message);
        return false;
    }

    const imageMediaData = {
        post_id: data[0].id,
        type: "IMAGE" as MediaType,
        url: imageDownloadUrl
    }

    const {error: imageMediaError} = await supabase.from(tables.media).insert([imageMediaData]);

    if (imageMediaError){
        Alert.alert("Error", imageMediaError.message);
        return false;
    }

    const videoMediaData = {
        post_id: data[0].id,
        type: "VIDEO" as MediaType,
        url: videoDownloadUrl
    }

    const {error: videoMediaError} = await supabase.from(tables.media).insert([videoMediaData]);

    if (videoMediaError){
        Alert.alert("Error", videoMediaError.message);
        return false;
    }

    const userRespondedData = {
        post_collection_id: post_collection_id,
        user_id: user.id
    }

    const {error: userRespondedError} = await supabase.from(tables.usersResponded).insert([userRespondedData]);

    if (userRespondedError){
        Alert.alert("Error", userRespondedError.message);
        return false;
    }
}

export async function fetchPostsFromPostCollectionId(post_collection_id: number) {
    const { data: posts, error: postsError } = await supabase
        .from(tables.posts)
        .select("*")
        .eq("post_collection_id", post_collection_id);

    if (postsError) {
        Alert.alert("Error", postsError.message);
        return null;
    }

    return posts as PostsType[];
}

export async function fetchMediaFromPostId(post_id: number){

    const { data: media, error: mediaError } = await supabase
        .from(tables.media)
        .select("*")
        .eq("post_id", post_id);


    if (mediaError) {
        Alert.alert("Error", mediaError.message);
        return null;
    }

    return media as Media[];
}


export async function fetchUserFromUserId(user_id: string) {
    const { data: users, error: usersError } = await supabase
        .from(tables.users)
        .select("*")
        .eq("id", user_id);

    if (usersError) {
        Alert.alert("Error", usersError.message);
        return null;
    }

    return users[0] as UsersType;
}
