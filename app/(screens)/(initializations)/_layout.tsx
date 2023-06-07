import React, { useState } from "react";
import { Navigator, Slot, useRouter } from "expo-router";
import InitializationScreenNav from "../../../components/InitializationScreenNav";

const _layout = () => {
    return (
        <Navigator initialRouteName="(screens)/(initializations)/initialization1">
            <Slot />
            <InitializationScreenNav />
        </Navigator>
    );
};

export default _layout;
