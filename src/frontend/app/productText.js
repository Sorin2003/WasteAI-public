import React from 'react';
import { View, Text } from 'react-native';
import * as Constants from './constants';
import { Link } from 'expo-router';

const ProductText = ({ productName, type, expirationDate }) => {

    let borderColor = '#4D4D4D';
    if (type === 1) {
        borderColor = '#3C6A06';
    } else if (type === 2) {
        borderColor = '#116380';
    } else if (type === 3) {
        borderColor = '#A85353';
    }
  return (
    
        <View style={{marginVertical: 15,
        borderWidth:3, marginHorizontal:30, paddingVertical:10,
        borderRadius:30, borderColor: borderColor}}> 
            <Link href='/productdescription'>
                <View style={{paddingHorizontal:20, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text>{productName}</Text>
                    <Text>{expirationDate}</Text>
                </View>
            </Link>
            <View style={{ padding: 20 }}>
        {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products:</Text> */}
        {/* {products.map((product, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <Text>Date of Expiry: {product.date_of_expiry}</Text>
            <Text>Item ID: {product.item_id}</Text>
            <Text>Notes: {product.notes || 'None'}</Text>
            <Text>Owner ID: {product.owner_id}</Text>
            <Text>Product Name: {product.product_name || 'N/A'}</Text>
          </View>
        ))} */}
      </View>
        </View>
        
  );
};

export default ProductText;        