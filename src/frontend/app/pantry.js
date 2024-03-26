import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import ProductText from './productText.js';
import AppBarPantry from './appBarPantry.js'

const PantryScreen = () => {

    return (
        <SafeAreaView>
            <View>
                <AppBarPantry></AppBarPantry>
            </View>
            <View>
                
            </View>
        </SafeAreaView>
    )
}

export default PantryScreen;