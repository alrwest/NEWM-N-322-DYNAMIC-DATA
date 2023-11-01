import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { useFonts, roboto } from '@expo-google-fonts/roboto';

const Stack = createNativeStackNavigator();

//importing DetailListScreen
import DetailListScreen from './components/DetailListScreen';
import MainList from './components/MainList';
import Logo from './components/Logo';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
    <LinearGradient  colors= {['#BDF5FD', '#452894']} style = {styles.container}>
    <Card>
      <Logo />
    </Card>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainList} />
          <Stack.Screen
            name="DetailList"
            component={DetailListScreen}
            options={{ title: 'Detail List' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  }
});
