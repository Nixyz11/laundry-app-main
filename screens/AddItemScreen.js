import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const AddItemScreen = () => {
    const [newProductId, setNewProductId] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newProductImage, setNewProductImage] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const navigation = useNavigation();

    const handleAddItem = async () => {
        await addDoc(collection(db, "types"), {
            id: newProductId,
            name: newProductName,
            image: newProductImage,
            price: newProductPrice,
            quantity: 0
        });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Id"
                value={newProductId}
                onChangeText={setNewProductId}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={newProductName}
                onChangeText={setNewProductName}
            />
            <TextInput
                style={styles.input}
                placeholder="Product Image URL"
                value={newProductImage}
                onChangeText={setNewProductImage}
            />
            <TextInput
                style={styles.input}
                placeholder="Product Price"
                value={newProductPrice}
                onChangeText={setNewProductPrice}
                keyboardType="numeric"
            />
            <Button title="Add Item" onPress={handleAddItem} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
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
  });

export default AddItemScreen;