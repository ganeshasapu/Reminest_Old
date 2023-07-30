import { DocumentReference } from "firebase/firestore";

export const collections = {
    users: "users",
    families: "families",
    weekly_post_collections: "weekly_post_collections",
    posts: "posts",
};

export interface UserType {
    birthday: Date;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    families: string[];
    posts: DocumentReference[];
    profilePicture: string;
}

export interface FamilyType {
    creator: string;
    familyInterests: string[];
    familyName: string;
    users: string[];
    weekly_posts_collections: string[];
}

export interface WeeklyPostsCollectionsType {
    prompt: string;
    posts: DocumentReference[];
    usersResponded: string[];
    comments: string[];
    highlightedWord: string;
    family: DocumentReference;
}

export interface mediaType {
    url: string;
    type: "VIDEO" | "IMAGE";
}

export interface PostType {
    like_count: number;
    media: mediaType[];
    timestamp: Date;
    author: DocumentReference;
}
