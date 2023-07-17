import "dotenv/config";

export default {
    expo: {
        name: "Reminest",
        slug: "Reminest",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        splash: {
            image: "./assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#302929",
        },
        assetBundlePatterns: ["**/*"],
        extra: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID:
                process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
            FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
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
                backgroundColor: "#ffffff",
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
        ],
    },
};
