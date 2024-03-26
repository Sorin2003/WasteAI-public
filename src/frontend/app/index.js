import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect } from 'expo-router'

    const index = () => {
      return (
      <SafeAreaView style = {{flex:1}}>
        
        <View style = {{alignItems: 'center', justifyContent: 'flex-start', flex: 1}}>
            <Image source={require('../assets/icoana.jpg')} style={{ width: 200, height: 200 }} />
          </View>

         
          <Link href ="/login"
          style = {{alignSelf:'center', backgroundColor:'#DE0C0C', padding:15, borderRadius:30, marginTop:10,width:200,marginBottom:250,textAlign:'center'}}>
            <Text style={{color:'white', alignSelf:'center', textAlign:'center'}}>Login</Text>
          </Link>

      </SafeAreaView>
      );
    };

    export default index
