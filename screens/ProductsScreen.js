import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const ProductsScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
    let items = [];
    // Učitavanje proizvoda iz Firebase-a
    const fetchProducts = async () => {
      
      const colRef = collection(db,"types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc);
        console.log(doc.id);
      });
      setDataLoaded(true);
      setProducts(items);
      console.log(products);
    }

    fetchProducts();
  }, []);

  useFocusEffect(() => {
    let items = [];
    // Učitavanje proizvoda iz Firebase-a
    const fetchProducts = async () => {
      
      const colRef = collection(db,"types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc);
        console.log(doc.id);
      });
      setDataLoaded(true);
      setProducts(items);
      console.log(products);
    }

    fetchProducts();
  })

  const handleProductPress = (product) => {
    // Ažuriranje cene proizvoda u Firebase-u
    navigation.navigate("UpdatePrice", { productId: product.id, productData: product.data() });
  };

  if(dataLoaded){
    return (
      
        <View style={styles.container}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleProductPress(item)}>
                <View style={styles.productContainer}>
                  <Image style={styles.productImage} source={{uri: item.data().image}} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.data().name}</Text>
                    <Text style={styles.productPrice}>${item.data().price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
            )}
          />
          <Button
            title="Add Item"
            onPress={() => navigation.navigate("AddItem")} // Navigacija na ekran za dodavanje proizvoda
            style={styles.addItemButton}
        />
        </View>
      
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  productImage: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 7,
  },
  productPrice: {
    color: 'gray',
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#088F8F',
  },
});

export default ProductsScreen;
