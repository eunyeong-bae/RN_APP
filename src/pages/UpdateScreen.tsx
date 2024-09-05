import React from 'react'
import { Image, Text, View } from 'react-native'

const UpdateScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Updates!</Text>
      <Image source={{ uri: `../assets/grick.jpg`, width:400, height:300 }} />
    </View>
  )
}

export default UpdateScreen