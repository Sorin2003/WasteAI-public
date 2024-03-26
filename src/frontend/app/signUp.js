import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios'; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_ADDRESS = 'http://192.168.1.24:8000'; // Replace with your server's address

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const role = 'user'; // Set the role to 'user'

  const handleSignUp = async () => {
    try {
      // Make aplication/json string from input data
        // "username": "name",
        //"email": "example@email.com",
        //"role": "user",
        //"password": "ppassword"
        const userData = JSON.stringify({
            username: name,
            email: email,
            role: role,
            password: password,
            });

      const response = await axios.post(`${SERVER_ADDRESS}/api/v1/users`, userData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      // Check if the signup was successful (you may need to adjust the response status code)
      if (response.status === 200) {
        console.log('Signup successful');
        const formData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('username', email);
        formData.append('password', password);
        const response = await axios.post(`${SERVER_ADDRESS}/api/v1/login/access-token`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            });
            console.log('Login response:', response.data);

        await AsyncStorage.setItem('access_token', response.data.access_token);
        if(response.status === 200) {
          console.log('Login successful');
          router.replace('/home');
          }

        // Optionally, you can redirect the user to the login screen or perform other actions.
      } else {
        console.log('Signup failed');
        // Handle the case where signup failed, e.g., display an error message to the user.
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Handle any errors that may occur during the signup process.
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Image source={require('../assets/icoana.jpg')} style={{ width: 200, height: 200 }} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: 'black',
            shadowOpacity: 0.05,
            textAlign: 'center',
            alignContent: 'center',
            width: 350,
            height: 50,
            alignSelf: 'center',
            borderRadius: 30,
            marginBottom: 10,
          }}
          placeholder="Username"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: 'black',
            shadowOpacity: 0.05,
            textAlign: 'center',
            alignContent: 'center',
            width: 350,
            height: 50,
            alignSelf: 'center',
            borderRadius: 30,
            marginBottom: 10,
          }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: 'black',
            shadowOpacity: 0.05,
            textAlign: 'center',
            alignContent: 'center',
            width: 350,
            height: 50,
            alignSelf: 'center',
            borderRadius: 30,
            marginBottom: 10,
          }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            alignSelf: 'center',
            backgroundColor: '#DE0C0C',
            padding: 10,
            width: 200,
            borderRadius: 30,
            marginTop: 10,
          }}
        >
          <Text style={{ color: 'white', alignSelf: 'center' }}>SignUp</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Text style={{ alignSelf: 'center' }}>Already have an account?</Text>
        <Link
          href="/login"
          style={{
            backgroundColor: 'grey',
            padding: 10,
            alignSelf: 'center',
            borderRadius: 30,
            marginBottom: 50,
            width: 200,
            textAlign: 'center',
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
