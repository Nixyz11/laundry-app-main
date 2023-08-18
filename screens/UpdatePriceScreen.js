import { useState } from "react";
import { Button, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const UpdatePriceScreen = ({route}) => {
    const navigation = useNavigation();
    const {productId, productData} = route.params;
    const [newPrice, setNewPrice] = useState('');

    const handleUpdatePrice = async () => {
        // Ažuriranje cene proizvoda u Firebase kolekciji
        await updateDoc(doc(db, "types", productId), {
          price: parseFloat(newPrice)
        });
        // Vratite se na prethodni ekran
        navigation.goBack();
      };

    const handleDeleteProduct = async () => {
      await deleteDoc(doc(db, 'types', productId));
      navigation.goBack();
    } 

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Update Price for {productData.name}</Text>
          <Text style={styles.price}>Price: ${productData.price}</Text>
          <TextInput
            style={styles.input}
            placeholder="New Price"
            onChangeText={setNewPrice}
            keyboardType="numeric"
          />
          <Pressable
            style={styles.updateButton}
            onPress={handleUpdatePrice}
          >
            <Text style={styles.updateButtonText}>Update Price</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDeleteProduct}>
            <Text style={styles.deleteButtonText}>Delete Product</Text>
          </Pressable>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      price: {
        fontSize: 18,
        marginBottom: 20,
      },
      input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      updateButton: {
        backgroundColor: '#088F8F',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      updateButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
      },
      deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
    
    export default UpdatePriceScreen;
    
    

