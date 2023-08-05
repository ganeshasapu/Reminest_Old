type UUID = string;
type BIGINT = number;
type INT = number
type TIMESTAMP = Date; // or Date, depending on how you handle dates
type DATE = Date; // or Date
type TEXT = string;
type VARCHAR = string;
type INTEGER = number;
type SERIAL = number;

export type MediaType = "VIDEO" | "IMAGE";

export const tables = {
    users: "users",
    families: "families",
    familyMembers: "family_members",
    postCollections: "post_collections",
    usersResponded: "users_responded",
    posts: "posts",
    media: "media",
}

export interface UsersType {
    id?: UUID;
    created_at?: TIMESTAMP;
    birthday: DATE;
    first_name: VARCHAR;
    last_name: VARCHAR;
    phone_number: VARCHAR;
}

export interface FamiliesType {
    id?: INT;
    created_at?: TIMESTAMP;
    family_interests: TEXT[];
    family_name: TEXT;
}

export interface FamilyMembersType {
    user_id: UUID;
    family_id: BIGINT;
}

export interface PostCollectionsType {
    id?: BIGINT;
    created_at?: TIMESTAMP;
    family_id: BIGINT;
    prompt: TEXT;
    highlighted: TEXT;
}

export interface UsersRespondedType {
    user_id: UUID;
    post_collection_id: BIGINT;
}

export interface PostsType {
    id?: BIGINT;
    created_at: TIMESTAMP;
    author: UUID;
    like_count: INTEGER;
}

export interface Media {
    id?: SERIAL;
    type: MediaType;
    url: TEXT;
    post_id: BIGINT;
}
