
import {View, Text, StyleSheet, Image} from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

//importing utilites
import {sizing, Roboto} from '../utils/utils';

export default function Logo() {
  return (
    <View style = {styles.container}>
      <Image style = {styles.img} source={require('../assets/leaf-logo.png')}/> 
            <Text style = {styles.title}> MyList Application </Text>
    </View>

  );
  
}

const styles = StyleSheet.create({ 
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  img: {
    maxWidth: 35,
    maxHeight: 35
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Roboto',
  }
});
