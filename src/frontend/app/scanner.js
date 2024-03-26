import { Text, View, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Link } from 'expo-router'

  export default function scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };

      getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <View style={[styles.scannerContainer, { height: 500, width: 500 }]}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
        <View style={{paddingTop:40}}>
        <Link href ="/addproduct"
            style = {{alignSelf:'center', backgroundColor:'#DE0C0C', padding:10, borderRadius:30, marginTop:10,width:200,marginBottom:10,textAlign:'center'}}>
                <Text style={{color:'white', alignSelf:'center', textAlign:'center'}}>Add manually</Text>
            </Link>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    scannerContainer: {
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

