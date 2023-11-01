import { useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { TextInput, Button, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//importing utilites
import {button, addButton, Roboto} from '../utils/utils';


export default function DetailListScreen({ navigation, route }) {
  let data = route.params;
  const [currentList, setCurrentList] = useState();
  const [allLists, setAllLists] = useState();
  const [currentItems, setCurrentItems] =  useState([]);

  const [itemName, setItemName] = useState('');

  useEffect( () => {
    getCurrentList();
  }, []);

 useEffect(() => {
    if (currentList) {
      setCurrentItems(currentList.items);
    }
  }, [currentList]);

//capitalize  & format data title
const formatedTitle = data.title.charAt(0).toUpperCase() + data.title.slice(1);

function formatListName(formatedTitle) {
  const givenTitle = formatedTitle.toLowerCase(); //remove case sensitivity for usability
  if (!givenTitle.includes("list")) {
    formatedTitle = formatedTitle + " List";
  } else {

    console.log("List already formatted.");
  }
  return formatedTitle;
}


const getCurrentList = async () => {
  console.log("load detail..");

 try {
      const lists = await AsyncStorage.getItem('lists');
      //console.log('Loading detail.. ', lists);
      if (!lists) {
        setNoListMessage('Please add a list.');
      } else {
        setCurrentList(JSON.parse(lists)[data.index]);
        console.log('Loading detail..', JSON.parse(lists)[data.index]);
        setAllLists(JSON.parse(lists));
      }
  } catch (e) {
    console.log("Error getting detail data", e);
  }
};

const saveData = async () => {
  currentList.items.push({itemTitle: itemName});
  setCurrentItems(currentList.items);
  //console.log("Displaying Current List Items:", currentList.items);

  allLists[data.index].items = currentList.items;
  await AsyncStorage.setItem('lists', JSON.stringify(allLists));


  setItemName('');
  console.log(currentList);
}


const updateArray = async (filterArray) => {
  console.log("Update items:", filterArray);
  console.log("Update current items:", currentItems);

  // Update the main list data and save it to AsyncStorage
  allLists[data.index].items = filterArray;
  await AsyncStorage.setItem('lists', JSON.stringify(allLists));
};

return (
  <View>
    <View>
    <h2 style = {styles.container}> {formatListName(formatedTitle)} </h2>
    </View>
   
    <View style = {styles.container}>
      <TextInput placeholder= "Add item to list..." onChangeText={setItemName} value = {itemName} />
      <Button onPress ={saveData}> <Text style = {addButton}> Add Item </Text> </Button>
    </View>
    <View styles = {styles.listItems}>
      {currentItems.map((item, idx) => (
        <List.Item style = {styles.lists} title = {item.itemTitle} //onPress = {() =>    
         // navigation.navigate('DetailList', { title: item.itemTitle, index: idx})
      //{}}
        right = {(props) => (
          <IconButton onPress = {() => {
            setCurrentItems(currentItems.filter((a) => a.itemTitle !== item.itemTitle));
            updateArray(currentItems.filter((a) => a.itemTitle !== item.itemTitle));
          }}
          icon ="trash-can"
          color = "#452894"
          size = {20}
          style = {styles.icons}
          />
        )}
        />
      ))}
         <TouchableOpacity style = {button} title = "About" onPress = {() => navigation.navigate('Home')}>
              <Text> Back to All Lists </Text>
        </TouchableOpacity> 
    </View>
   </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  
  listItems: {
    fontFamily: 'Roboto',
    padding: 20
  },
  lists: {
    padding: 20
  },
  icons: {
    backgroundColor: '#DDD5E4',
  }
});

