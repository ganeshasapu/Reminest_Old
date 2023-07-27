import React, { useContext, useEffect } from 'react'
import { Redirect } from 'expo-router'
import { FirebaseContext } from './auth';
import Loading from './(screens)/loading';

const index = () => {

  const { checkLoginStatus, loading, user } = useContext(FirebaseContext);

  useEffect(() => {
      checkLoginStatus();
  }, []);

  if (loading) {
      return <Loading />;
  }

  if (user){
    return <Redirect href="(screens)/feed" />;
  }


  return (
      // <Redirect href="(screens)/register" />
      // <Redirect href="(screens)/home" />
      <Redirect href="(screens)/(initializations)/signUpSignIn" />
      // <Redirect href="(screens)/(initializations3)/familyLoginRegister" />
      // <Redirect href="(screens)/feed" />
      // <Redirect href="(screens)/(previews)/preview2" />
  );
}


export default index
