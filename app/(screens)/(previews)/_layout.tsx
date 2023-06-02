import React from 'react'
import { Navigator, Slot } from 'expo-router'
import PreviewScreenNav from '../../../components/PreviewScreenNav'
import SkipBar from '../../../components/SkipBar'


const _layout = () => {
  return (
    <Navigator initialRouteName="(screens)/(previews)/preview1">
        <SkipBar />
        <Slot />
        <PreviewScreenNav />
    </Navigator>
  )
}

export default _layout
