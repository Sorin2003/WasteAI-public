import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Link,  } from 'expo-router'

const AppBarRecipes = () => {


    return (
        <View style={{flexDirection:'row', justifyContent:'flex-start', backgroundColor: '#DE0C0C', alignItems:'center', paddingVertical:10 }}>
            <Link href="/pantry" style={{marginLeft:10, marginVertical:10, marginRight:45}}>
                    <View style={{borderRadius:100, backgroundColor:'transparent', width:30, height:30, borderRadius:100 }}>
                        <ImageBackground source={require('../assets/arrow.png')} resizeMode="contain"
                        style={{flex:1, justifyContent:'center'}}/>
                    </View>
            </Link>

            <View style={{paddingVertical:10, paddingHorizontal:20, marginLeft:35}}>
                <Text style={{borderColor:'#ffffff', fontSize:18, fontWeight:'700'}}>Find a recipe</Text>
            </View>
        </View>
    )
}

export default AppBarRecipes;