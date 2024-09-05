import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height - 180;

  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : "#fff"};
  console.log("test", isDarkMode, backgroundStyle)

  const [selectedId, setSelectedId] = useState('');

  const Item = ({item, onPress, isDarkMode} : ItemProps) => (
    <View style={[styles.itemWrap, {backgroundColor: isDarkMode ? "#222" : "#fff"}]}>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Image source={item.url} style={{ width:350, height:300}}/>
        <View style={{flexDirection:'row', paddingVertical:5}}>
          <View style={{flexDirection:'row', width:'auto', justifyContent:'space-between', paddingVertical:5, paddingHorizontal:5}}>
            <Icon name='heart' size={20} color='red'/>
            <Text style={[styles.title, {color: isDarkMode ? "#fff" : "#222"}]}>100</Text>
          </View>
          <View style={{flexDirection:'row', width:'auto', justifyContent:'space-between', paddingVertical:5, paddingHorizontal:5}}>
            <Icon name='comment' size={20} color={isDarkMode ? "#fff" : "#222"}/>
            <Text style={[styles.title, {color:isDarkMode ? "#fff" : "#222"}]}>55</Text>
          </View>
          <View style={{flexDirection:'row', width:'auto', justifyContent:'space-between', paddingVertical:5, paddingHorizontal:5}}>
            <Icon name='paper-plane' size={20} color={isDarkMode ? "#fff" : "#222"}/>
          </View>
        </View>
        <View style={[styles.title, {flexDirection:'row'}]}>
          <Text style={{fontWeight:'bold', color:isDarkMode ? "#fff" : "#222", marginRight:5}}>{item.userID}</Text>
          <Text style={{color:isDarkMode ? "#fff" : "#222"}}>{item.title}</Text>
        </View>
        <Text style={[styles.title, {color:isDarkMode ? "#fff" : "#222"}]}>{item.date}</Text>
      </TouchableOpacity>
    </View>
  );
  
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
    <SafeAreaView style={[backgroundStyle, {borderWidth:1}]}>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      <FlatList
        style={{height}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        extraData={selectedId}
      />
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow:1,
    alignItems:'center',
  },
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