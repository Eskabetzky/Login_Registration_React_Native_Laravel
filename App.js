import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, AsyncStorage, Alert} from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const storedUser = await AsyncStorage.getItem(email);

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.password === password) {
        Alert.alert('Success', 'Login successful');
      } else {
        Alert.alert('Error', 'Invalid password');
      }
    } else {
      Alert.alert('Error', 'User not found');
    }
  };

  return (
    <View style={styles.container}>
        <Image
        source={require('./assets/M_Logo.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <View style={styles.Button}>
      <Button title="Login" onPress={handleLogin} style={{ marginRight: 10 }} color={'#5a5a94'}/>
      <Button title="Register" onPress={() => navigation.navigate('Register')} style={{ marginLeft: 10 }} color={'#5a5a94'}
      />
      </View>
    </View>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (email && password) {
      const newUser = { email, password };
      await AsyncStorage.setItem(email, JSON.stringify(newUser));
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <View style={styles.Button}>
      <Button title="Register" onPress={handleRegister} style={{ marginRight: 10 }} color={'#5a5a94'}/>
      <Button title="Back to Login" onPress={() => navigation.navigate('Home') } style={{ marginLeft: 10 }} color={'#5a5a94'}/>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:-150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    logo: {width: 200, 
    height: 150, 
    marginTop: 10,
  },

  Button:{width : 200,
    height : 60,
    marginBottom: 20,
    borderRadius: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20

  },

  input: {
    height: 50,
    width: 260,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    marginBottom: 10
  }
  
});
