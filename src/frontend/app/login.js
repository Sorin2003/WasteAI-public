import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect, router } from 'expo-router';
import axios from 'axios';
// Async storage for react native
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { access } from 'fs';

const SERVER_ADDRESS = 'http://192.168.1.24:8000'; // Replace with your server's address

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      router.replace('/home');
        // Make aplication/x-www-form-urlencoded string from input data
        // grant_type=password 
        // username={username}
        // password={password}

        const formData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('username', email);
        formData.append('password', password);

        // Post the form to the server
        const response = await axios.post(`${SERVER_ADDRESS}/api/v1/login/access-token`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        });


        await AsyncStorage.setItem('access_token', response.data.access_token);
        console.log(response.data.access_token);
        if(response.status === 200) {
          console.log('Login successful');
          router.replace('/home');
          }
    
        } catch (error) {
        console.error('Login error:', error);
        setError('Login failed. Please check your credentials.');
        console.log(error.response);
        }
        
        
  };


  const handleFrogotPass = () => {
    // TODO: Implement forgot password logic
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
            marginBottom: 10,
            borderRadius: 30,
          }}
          placeholder="Email/Username"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: 'black',
            textAlign: 'center',
            shadowOpacity: 0.05,
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

        {error && <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>}

        <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 10 }} onPress={handleFrogotPass}>
          <Text style={{ fontSize: 16 }}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={{ alignSelf: 'center', backgroundColor: '#DE0C0C', padding: 10, borderRadius: 30, marginTop: 10, width: 200 }}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>Login</Text>
        </TouchableOpacity>

        <Link href="/signUp" style={{ alignSelf: 'center', backgroundColor: '#DE0C0C', padding: 10, borderRadius: 30, marginTop: 10, width: 200, marginBottom: 10, textAlign: 'center' }}>
          <Text style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>SignUp</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;