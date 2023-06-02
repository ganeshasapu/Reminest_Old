import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkAppStatus = async () => {
  try {
    const value = await AsyncStorage.getItem("appOpened");
    if (value !== null) {
      // App has been opened before
      console.log("App has been opened before")
      return true;
    } else {
      // App is being opened for the first time
      console.log("App is being opened for the first time")
      await AsyncStorage.setItem("appOpened", "true");
      return false;
    }
  } catch (error) {
    // Error handling
    console.log("Error:", error);
    return false;
  }
};

export const clearAppOpened = async () => {
    try {
        await AsyncStorage.removeItem("appOpened");
        console.log("App status cleared");
    } catch (error) {
        // Error handling
        console.log("Error:", error);
    }
};
