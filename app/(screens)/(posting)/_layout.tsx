import React, { createContext, useState } from "react";
import { Navigator, Slot } from "expo-router";


interface PostContextProps {
    videoUri: string;
    setVideoUri: React.Dispatch<React.SetStateAction<string>>;
    imageUri: string;
    setImageUri: React.Dispatch<React.SetStateAction<string>>;
    thumbnailUri: string;
    setThumbnailUri: React.Dispatch<React.SetStateAction<string>>;
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    collectionID: string;
    setCollectionID: React.Dispatch<React.SetStateAction<string>>;
}

export const PostContext = createContext({} as PostContextProps);

const _layout = () => {
    const [videoUri, setVideoUri] = useState("");
    const [imageUri, setImageUri] = useState("");
    const [thumbnailUri, setThumbnailUri] = useState("");
    const [prompt, setPrompt] = useState("");
    const [collectionID, setCollectionID] = useState("");

    const postValue = {
        videoUri,
        setVideoUri,
        imageUri,
        setImageUri,
        thumbnailUri,
        setThumbnailUri,
        prompt,
        setPrompt,
        collectionID,
        setCollectionID,
    };


    return (
        <Navigator initialRouteName="(screens)/(previews)/preview2">
                <PostContext.Provider value={postValue}>
                    <Slot />
                </PostContext.Provider>
        </Navigator>
    );
};

export default _layout;
