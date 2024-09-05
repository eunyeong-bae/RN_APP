import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './src/pages/ProfileScreen';
import HomeScreen from './src/pages/HomeScreen';
import UpdateScreen from './src/pages/UpdateScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

interface MyTabsProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const screens = [
  { name: 'Home', component: HomeScreen, options: { tabBarBadge: 4, 
    tabBarIcon: () => ( <Icon name='home' size={20} color="#000"/>)}
  },
  { name: 'Update', component: UpdateScreen, options: { tabBarBadge: 10, 
    tabBarIcon: () => ( <Icon name='bell' size={20} color="#000"/>)}},
  { name: 'Profile', component: ProfileScreen, options: { 
    tabBarIcon: () => ( <Icon name='user' size={20} color="#000"/>)}}
];

const Tab = createBottomTabNavigator();
function MyTabs(props: MyTabsProps) {
  const {isDarkMode, setIsDarkMode} = props;
  const toggleSwitch = () => setIsDarkMode((prev: boolean) => !prev);

  const HeaderRight = () => {
    return (
      <View style={styles.modeWrap}>
        <Text style={{fontWeight:600, fontSize:13, color:"#000"}}>{isDarkMode ? '라이트모드' : '다크모드'}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
    )
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {alignContent:'center'},
        headerStyle: {backgroundColor: '#fff'},
        headerRight: () => <HeaderRight />
      }}
    >
      { screens.map((screen, idx) => {
        return (
          <Tab.Screen 
            key={screen.name + idx} 
            name={screen.name} 
            component={(props: any) => <screen.component {...props} isDarkMode={isDarkMode}/> }
            options={screen.options}
          />
        )
      })}
    </Tab.Navigator>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  return (
    <NavigationContainer>
      <MyTabs isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modeWrap : { 
    flexDirection:'row', alignItems:'center', 
  },
});