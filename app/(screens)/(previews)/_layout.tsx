import React from "react";
import { Navigator, Slot } from "expo-router";
import SkipBar from "../../../components/SkipBar";

const _layout = () => {
    return (
        <Navigator initialRouteName="(screens)/(previews)/preview2">
            <SkipBar />
            <Slot />
        </Navigator>
    );
};

export default _layout;
