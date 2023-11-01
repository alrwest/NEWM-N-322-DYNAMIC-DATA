import React from 'react';
//Creating the Home Screen view for App
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SecondScreen from './SecondScreen';

export default function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}> Home Screen</Text>
      <TouchableOpacity
        style={styles.buttonText}
        title="Second Screen"
        onPress={() => navigation.navigate('SecondScreen')}>
        <Text style={styles.buttonText}> Second Screen </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0583F2',
    padding: 6,
  },
  paragraph: {
    flex: 0.4,
    textAlign: 'center',
    color: 'white',
    fontSize: 35,
  },

  buttonText: {
    textAlign: 'center',
    backgroundColor: '#05C7F2',
    color: 'white',
    fontSize: 25
  },
});