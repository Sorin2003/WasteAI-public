import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AppBarRecipes from './appBarRecipes';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize } from 'react-native-app-auth';

const SERVER_ADDRESS = 'http://192.168.1.24:8000';

const RecipesScreen = () => {

  const getToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  };

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  const callApi = async () => {

    const message = newMessage;
    const data = JSON.stringify({
      msg: message,
    });

    const response = await axios.post(`${SERVER_ADDRESS}/api/v1/chat`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
    setMessages([...messages, response.data['msg']]);
    
  };

  const addMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
      setAsked(true);
    }
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <View style = {{flex:1, justifyContent:'space-between'}}>
        <AppBarRecipes />

        <View style={{flex:1, alignContent:'flex-end', marginTop:20}}>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Text style={{fontSize: 16,
                borderRadius:30,
                color: 'black',
                borderWidth: 1,
                borderColor:'#A9A9A9',
                marginVertical: 5,
                paddingVertical: 5,  paddingHorizontal: 10, marginHorizontal: 7}}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        
        <View style = {{flexDirection:'row', alignContent:'center'}}>
            <TextInput
              style={{height: 40, flex: 1,
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius:30,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      margin: 10,}}
              placeholder="Add a new message"
              onChangeText={(text) => setNewMessage(text)}
              value={newMessage}
            />
            <TouchableOpacity style={{margin:10, backgroundColor:'#016AD2', borderRadius: 30, paddingHorizontal:20, paddingVertical:10}} onPress={
                callApi
              }>
              <Text>Ask</Text>
            </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    margin: 10,
  },
});

export default RecipesScreen;