import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Link,  } from 'expo-router'

const AppBarAddProduct = () => {


    return (
        <View style={{flexDirection:'row', justifyContent:'flex-start', backgroundColor: '#DE0C0C', alignItems:'center', paddingVertical:10 }}>
            <Link href="/pantry" style={{marginLeft:10, marginVertical:10, marginRight:45}}>
                    <View style={{borderRadius:100, backgroundColor:'transparent', width:30, height:30, borderRadius:100 }}>
                        <ImageBackground source={require('../assets/arrow.png')} resizeMode="contain"
                        style={{flex:1, justifyContent:'center'}}/>
                    </View>
                </Link>

            <Link href="/pantry" style = {{marginLeft:45}}>
                <View style={{paddingVertical:10,
                    paddingHorizontal:20}}>
                    <Text style={{borderColor:'#ffffff', fontSize:18, fontWeight:'700'}}>Add Product</Text>
                </View>
            </Link>
        </View>
    )
}

export default AppBarAddProduct;