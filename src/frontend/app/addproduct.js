import React, { useState } from 'react';
import { SafeAreaView, View, ImageBackground, TextInput, Text, ScrollView } from 'react-native';
import AppBarAddProduct from './appBarAddProduct';
import { Link } from 'expo-router'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [note, setNote] = useState('');

    const description = "Edi Moga"

    const expirationDate = "2024-01-01"

    return(
        <SafeAreaView>
            <View>
                <AppBarAddProduct></AppBarAddProduct>
            </View>

            <View style={{paddingHorizontal:40, paddingVertical:10}}>
                <View style={{height:300}}>
                    <ImageBackground source={require('../assets/icoana.jpg')} resizeMode="contain"
                            style={{flex:1, justifyContent:'center'}}/>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginBottom:20, justifyContent:'space-between'}}>
                    <Text style={{fontSize:18}}>Name:</Text>
                    <TextInput style={{backgroundColor:"#EEE2E2", borderRadius:30,
                    paddingVertical:10, width:200, fontSize:18, textAlign:'center'}}
                        placeholder="Insert Name..."
                        value={name}
                        onChange={setName}
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
                    <Text style={{fontSize:18}}>User note:</Text>
                    <TextInput style={{backgroundColor:"#EEE2E2", borderRadius:30,
                    paddingVertical:10, width:200, fontSize:18, textAlign:'center'}}
                        placeholder="Insert Note..."
                        value={note}
                        onChange={setNote}
                    />
                </View>
                <View>
                    <Text style={{fontSize:18}}>Description:</Text>
                    <ScrollView style={{maxHeight:100}}>
                        <Text>
                            {`\u2022 ${description}`}
                        </Text>
                    </ScrollView>
                </View>
                <View style={{marginTop:30, marginBottom:30}}>
                    <Text style={{fontSize:18}}>Expiration Date:</Text>
                    <Text>
                        {`\u2022 ${expirationDate}`}
                    </Text>
                </View>
                <Link href="/pantry" style={{borderRadius:30, backgroundColor:'#DE0C0C', textAlign:'center', marginHorizontal:40, paddingVertical:15}}>
                    <Text style={{fontSize:18, color:'white'}}>Add</Text>
                </Link>
            </View>
            
        </SafeAreaView>
    );
}

export default AddProduct;