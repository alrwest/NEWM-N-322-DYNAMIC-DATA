import {SafeAreaView, StyleSheet } from 'react-native';

import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreenScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Home" component={HomeScreen} />
          <Stack.Screen name = "AboutScreen" component={AboutScreen} options = {{title: "About"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0583F2',
    padding: 8,
  }
});


