import React, { createContext, useState } from "react";
import { Navigator, Slot } from "expo-router";
import PreviewScreenNav from "../../../components/PreviewScreenNav";
import PostingFlowNav from "./postingFlowNav";

interface RouteContextProps {
    currentRouteIndex: number;
    setCurrentRouteIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const RouteContext = createContext({
} as RouteContextProps);

interface PostContextProps {
    videoUri: string;
    setVideoUri: React.Dispatch<React.SetStateAction<string>>;
    imageUri: string;
    setImageUri: React.Dispatch<React.SetStateAction<string>>;
    thumbnailUri: string;
    setThumbnailUri: React.Dispatch<React.SetStateAction<string>>;
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    collectionId: string;
    setCollectionId: React.Dispatch<React.SetStateAction<string>>;
}

export const PostContext = createContext({} as PostContextProps);

const _layout = () => {
    const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
    const [videoUri, setVideoUri] = useState("");
    const [imageUri, setImageUri] = useState("");
    const [thumbnailUri, setThumbnailUri] = useState("");
    const [prompt, setPrompt] = useState("");
    const [collectionId, setCollectionId] = useState("");

    const routeValue = {
        currentRouteIndex,
        setCurrentRouteIndex,
    };

    const postValue = {
        videoUri,
        setVideoUri,
        imageUri,
        setImageUri,
        thumbnailUri,
        setThumbnailUri,
        prompt,
        setPrompt,
        collectionId,
        setCollectionId,
    };


    return (
        <Navigator initialRouteName="(screens)/(previews)/preview2">
            <RouteContext.Provider value={routeValue}>
                <PostContext.Provider value={postValue}>
                    <Slot />
                    <PostingFlowNav />
                </PostContext.Provider>
            </RouteContext.Provider>
        </Navigator>
    );
};

export default _layout;
