import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image  } from 'react-native';
import { TextInput, Button, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainList({ navigation }) {

  const [listName, setListName] = useState();
  const [noListMessage, setNoListMessage] = useState('Add a List Below to Get Started!');
  const [allData, setAllData] = useState([]);
  

  useEffect(() => {
    getData();
  }, []);

  const saveData = async () => {
    console.log('Save list data: ', allData + ' ' + listName);

    let newArray = [];

    let newObj = { name: listName, items: [] };
    //console.log('Save New Obj', allData);
    if (allData.length != 0) {
      newArray = allData;
      newArray.push(newObj);
    } else {
      newArray.push(newObj);
    }
    
    setListName("");
    await AsyncStorage.setItem('lists', JSON.stringify(newArray));
    getData();

    //save changes
    setAllData(newArray);
  };

  const updateDeletedArray = async (filterArray) => {
    console.log('UpdatedDeleted:', filterArray);
    await AsyncStorage.setItem('lists', JSON.stringify(filterArray));
    getData();
  };

  const getData = async () => {
    try {
      const lists = await AsyncStorage.getItem('lists');
      console.log('Load list data: ', lists);
      if (!lists) {
        console.log("No user lists yet.")
          setNoListMessage('Add a List Below to Get Started!');    
      } else {
        setAllData(JSON.parse(lists));
        setNoListMessage('');
      }
    } catch (e) {
      console.log('Get Data Error:', e);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {noListMessage ? <Text style={styles.container}>{noListMessage}</Text> : ''}
     <TextInput
      placeholder={`Add a new list... ${listName || ''}`}
      onChangeText={setListName}
      value={listName}
      />
      <Button onPress={saveData}>Save List</Button>
      <Text>{listName ? listName : ''}</Text>
      {allData ? <Text>{allData.name}</Text> : <Text>No Data</Text>}
      </View>
      <View style = {styles.listItems}>
        {allData.map((list, idx) => (
          <List.Item
            style={styles.lists}
            title={list.name}
            onPress={() =>
              navigation.navigate('DetailList', {
                title: list.name,
                index: idx,
              })
            }
            right={(props) => (
              <IconButton
                onPress={() => {
                  setAllData(allData.filter((a) => a.name !== list.name));
                  updateDeletedArray(
                    allData.filter((a) => a.name !== list.name)
                  );
                }}
                icon="trash-can"
                color = "#452894"
                size={20}
                style = {styles.icons}
              />
            )}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  lists: {
    backgroundColor: '#DDD5E4',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  listItems: {
    padding: 10
  },
  icons: {
    backgroundColor: '#FFF',
  }
});
