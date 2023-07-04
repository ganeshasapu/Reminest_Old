import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, Slot, Navigator } from "expo-router";
import { useEffect } from "react";
import { FirebaseProvider } from "./auth";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "gabriel-sans": require("../assets/fonts/Gabriel-Sans-Bold.ttf"),
        "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-semibold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
        "open-sans-light": require("../assets/fonts/OpenSans-Light.ttf"),
        "archivo": require("../assets/fonts/Archivo-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    return (
        <>
            {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
            {!loaded && <SplashScreen />}
            {loaded && <RootLayoutNav />}
        </>
    );
}

function RootLayoutNav() {
    return (
        <>
            <FirebaseProvider>
                <Navigator>
                    <Slot />
                </Navigator>
            </FirebaseProvider>
        </>
    );
}
