import React, { createContext, useState } from "react";
import { Navigator, Slot } from "expo-router";
import { ImagePickerAsset } from "expo-image-picker";


interface PostContextProps {
    video: string;
    setVideo: React.Dispatch<React.SetStateAction<string>>;
    image: ImagePickerAsset | null;
    setImage: React.Dispatch<React.SetStateAction<ImagePickerAsset | null>>;
    thumbnailUri: string;
    setThumbnailUri: React.Dispatch<React.SetStateAction<string>>;
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    highlight: string;
    setHighlight: React.Dispatch<React.SetStateAction<string>>;
    collectionID: number | null;
    setCollectionID: React.Dispatch<React.SetStateAction<number | null>>;
}

export const PostContext = createContext({} as PostContextProps);

const _layout = () => {
    const [video, setVideo] = useState("");
    const [image, setImage] = useState<ImagePickerAsset | null>(null);
    const [thumbnailUri, setThumbnailUri] = useState("");
    const [prompt, setPrompt] = useState("");
    const [highlight, setHighlight] = useState("");
    const [collectionID, setCollectionID] = useState<number | null>(null);

    const postValue = {
        video,
        setVideo,
        image,
        setImage,
        thumbnailUri,
        setThumbnailUri,
        prompt,
        setPrompt,
        collectionID,
        setCollectionID,
        highlight,
        setHighlight,
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
