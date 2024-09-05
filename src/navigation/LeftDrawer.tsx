import React, { useRef } from 'react'
import { DrawerLayoutAndroid, StyleSheet, Text, View } from 'react-native'

const LeftDrawer = () => {
  console.log("enter");
    const drawer = useRef<DrawerLayoutAndroid>(null);
    const navigationView = () => {
        return (
            <View style={style.container}>
                <Text>It's Open</Text>
            </View>
        )
    };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}>
    </DrawerLayoutAndroid>
  )
}

export default LeftDrawer;

const style = StyleSheet.create({
    container: {
      flex:1,
      padding:16,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#ecf0f1',
    }
})