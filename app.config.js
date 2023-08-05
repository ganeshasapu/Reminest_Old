import "dotenv/config";

export default {
    expo: {
        name: "Reminest",
        slug: "Reminest",
        owner: "reminestinternaltesting",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        splash: {
            image: "./assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#FBF5EE",
        },
        assetBundlePatterns: ["**/*"],
        extra: {
            SUPABASE_URL: process.env.SUPABASE_URL,
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
            eas: {
                projectId: "8503928b-ceed-4938-88f6-6415585053e0",
            },
        },
        ios: {
            supportsTablet: true,
            infoPlist: {
                NSCameraUsageDescription:
                    "This app requires access to the camera.",
                NSPhotoLibraryUsageDescription:
                    "This app requires access to the photo library.",
            },
            bundleIdentifier: "com.reminest.app",
            googleServicesFile: "./GoogleService-Info.plist",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#FBF5EE",
            },
            permissions: [
                "CAMERA",
                "READ_EXTERNAL_STORAGE",
                "WRITE_EXTERNAL_STORAGE",
            ],
        },
        web: {
            bundler: "metro",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            [
                "expo-camera",
                {
                    cameraPermission: "Allow Reminest to access your camera.",
                },
            ],
            [
                "expo-build-properties",
                {
                    ios: {
                        useFrameworks: "static",
                    },
                },
            ],
            [
                "expo-screen-orientation",
                {
                    initialOrientation: "DEFAULT",
                },
            ],
        ],
    },
};
