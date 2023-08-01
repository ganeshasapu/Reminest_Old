import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import { AuthContext } from "./authProvider";
import Loading from './(screens)/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {

  const { checkLoginStatus, loading, user } = useContext(AuthContext);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean | null>(null);

  async function checkFirstTimeUser() {
      const firstTime = await AsyncStorage.getItem('isFirstTimeUser');
      if (firstTime === null) {
          AsyncStorage.setItem("isFirstTimeUser", "true");
          setIsFirstTimeUser(true);
      } else {
          setIsFirstTimeUser(false);
      }
  }

  useEffect(() => {
      checkLoginStatus();
      checkFirstTimeUser();
  }, []);



  if (loading || isFirstTimeUser === null) {
      return <Loading />;
  }

  if (isFirstTimeUser) {
   return <Redirect href="(screens)/(previews)/preview1" />;
  }

  if (!user){
    //   return <Redirect href="(screens)/(initializations)/signUpSignIn" />;
    //   return <Redirect href="(screens)/(admin)/test" />;
    return <Redirect href="(screens)/home" />;

  }


  return (
      // <Redirect href="(screens)/register" />
    //   <Redirect href="(screens)/home" />
      // <Redirect href="(screens)/(posting)/confirmPost" />
      <Redirect href="(screens)/home" />
      // <Redirect href="(screens)/(initializations)/userInitialization" />
      // <Redirect href="(screens)/(previews)/preview1" />
  );
}


export default index
