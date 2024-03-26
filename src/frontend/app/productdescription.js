import React, { useState } from 'react';
import { SafeAreaView, View, ImageBackground, TextInput, Text, ScrollView } from 'react-native';
import AppBarProductDescription from './appBarProductDescription';
import { Link } from 'expo-router'

const ProductDescription = ({name, description, userNote, expirationDate, scannedOn}) => {
    return(
        <SafeAreaView>
            <View>
                <AppBarProductDescription name={name || 'Vali Spaider'}></AppBarProductDescription>
            </View>

            <View style={{paddingHorizontal:40, paddingVertical:10}}>
                <View style={{height:300}}>
                    <ImageBackground source={require('../assets/icoana.jpg')} resizeMode="contain"
                            style={{flex:1, justifyContent:'center'}}/>
                </View>
                <View>
                    <Text style={{fontSize:18}}>Description:</Text>
                    <ScrollView style={{maxHeight:100}}>
                        <Text>
                            {`\u2022 ${description}`}
                        </Text>
                    </ScrollView>
                </View>
                <View style={{marginTop:30, marginBottom:10}}>
                    <Text style={{fontSize:18}}>User note:</Text>
                    <ScrollView style={{maxHeight:100}}>
                        <Text>
                            {`\u2022 ${userNote}`}
                        </Text>
                    </ScrollView>
                </View>
                <View style={{marginTop:30, marginBottom:10}}>
                    <Text style={{fontSize:18}}>Expiration date:</Text>
                    <Text>
                        {`\u2022 ${expirationDate}`}
                    </Text>
                </View>
                <View style={{marginTop:30, marginBottom:10}}>
                    <Text style={{fontSize:18}}>Scanned on:</Text>
                    <Text>
                        {`\u2022 ${scannedOn}`}
                    </Text>
                </View>
            </View>
            
        </SafeAreaView>
    );
}

export default ProductDescription;