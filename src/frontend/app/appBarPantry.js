import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, Text, Modal, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const SERVER_ADDRESS = 'http://192.168.1.24:8000';

const AppBarPantry = () => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  };

  const [product, setProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const items = ['Vegetables', 'Fruits', 'Animal products'];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleItemSelected = (item) => {
    setSelectedItem(item);
    toggleModal();
  };

  const getItems = async () => {
    const auth = `Bearer ${await getToken()}`;
    console.log("Token is this: ", auth);

    try {
      const response = await axios.get(`${SERVER_ADDRESS}/api/v1/get_items`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
        },
      });
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#DE0C0C', alignItems: 'center', paddingVertical: 10 }}>
        <Link href="/home" style={{ marginLeft: 10, marginVertical: 10 }}>
          <View style={{ borderRadius: 100, backgroundColor: 'transparent', width: 30, height: 30, borderRadius: 100 }}>
            <ImageBackground source={require('../assets/arrow.png')} resizeMode="contain" style={{ flex: 1, justifyContent: 'center' }} />
          </View>
        </Link>

        <View style={{ borderRadius: 30, paddingVertical: 10, paddingHorizontal: 20 }}>
          <Text style={{ borderColor: '#ffffff', fontSize: 18, fontWeight: '700' }}>Pantry</Text>
        </View>

        <View>
          <TouchableOpacity onPress={toggleModal} style={{ marginRight: 10, marginVertical: 10 }}>
            <View style={{ borderRadius: 100, backgroundColor: 'transparent', width: 30, height: 30, borderRadius: 100 }}>
              <ImageBackground source={require('../assets/filter.png')} resizeMode="contain" style={{ flex: 1, justifyContent: 'center' }} />
            </View>
          </TouchableOpacity>

          <Modal
            animationType='slide'
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={{
              alignItems: 'flex-end',
              marginTop: 45
            }}>
              {items.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleItemSelected(item)} style={{ paddingVertical: 12, paddingHorizontal: 20, backgroundColor: '#ffffff', borderColor: '#ccc', alignItems: 'center', marginRight: 0, width: 160, borderWidth: 1, opacity: 0.9 }}>
                  <Text style={{ textAlign: 'center' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products:</Text>
        {product.map((products, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <Text>Product Name: {products.products.name || 'N/A'}</Text>
            <Text>Date of Expiry: {products.date_of_expiry}</Text>
            <Text>Notes: {products.notes || 'None'}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AppBarPantry;
