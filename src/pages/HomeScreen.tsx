import React, { useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
import { data } from '../data';
import Icon from 'react-native-vector-icons/FontAwesome';

interface HomeScreenProps {
  isDarkMode: boolean;
}

type ItemProps = {
  item: any;
  onPress: () => void;
  isDarkMode: boolean;
};


const HomeScreen = (props: HomeScreenProps) => {
  const {isDarkMode} = props;
  const menus = [
    {
      id: 'menu_like',
      name: 'heart',
      size: 20,
      color: 'red'
    },
    {
      id: 'menu_comment',
      name: 'comment',
      size: 20,
      color: isDarkMode ? "#fff" : "#222"
    },
    {
      id: 'menu_send',
      name: 'paper-plane',
      size: 20,
      color: isDarkMode ? "#fff" : "#222"
    },
  ];

  const height = Dimensions.get('screen').height - 180;
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : "#fff"};

  const [selectedId, setSelectedId] = useState('');

  const Item = ({item, onPress, isDarkMode} : ItemProps) => {
    const color = isDarkMode ? "#fff" : "#222";

    return (
      <View style={[styles.itemWrap, {backgroundColor: isDarkMode ? "#222" : "#fff"}]}>
        <TouchableOpacity style={styles.item} onPress={onPress}>
          <Image source={item.url} style={{ width:350, height:300}}/>
          <View style={{flexDirection:'row', paddingVertical:5}}>
            { menus.map((menu) => {
              return (
              <View key={menu.id} style={{flexDirection:'row', width:'auto', padding:5}}>
                <Icon name={menu.name} size={menu.size} color={menu.color}/>
                <Text style={[styles.title, {color: menu.color}]}>100</Text>
              </View>
              )
            })}
          </View>
          <View style={[styles.title, {flexDirection:'row'}]}>
            <Text style={{fontWeight:'bold', color, marginRight:5}}>{item.userID}</Text>
            <Text style={{color}}>{item.title}</Text>
          </View>
          <Text style={[styles.title, {color}]}>{item.date}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  const renderItem = ({item} : {item: {[key:string]: string}}) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        isDarkMode={isDarkMode}
      />
    )
  };
    
  return (
    <SafeAreaView style={backgroundStyle}>
      <FlatList
        style={{height}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  itemWrap: {
    width:Dimensions.get('screen').width,
    borderWidth:1,
    borderColor:'#f2f2f2',
  },
  item: {
    padding:20,
    marginVertical:10
  },
  title:{
    fontSize: 15,
    marginLeft: 10,
  }
});