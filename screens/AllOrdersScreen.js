import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, Pressable, Alert } from "react-native";
import { auth, db } from "../firebase";
import { StyleSheet } from "react-native";
import { format } from "date-fns";

const AllOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const userUid = auth.currentUser.email;

  useEffect(() => {
    let items = [];
    console.log(userUid);

    const fetchProducts = async () => {

      const colRef = collection(db, "orders");
      const docsSnap = await getDocs(colRef);
      console.log(docsSnap.size);
      docsSnap.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
        try {
          if (doc.data().user.email == userUid)
          items.push(doc);
        } catch {}
        
        
      });
      setDataLoaded(true);
      setOrders(items);
      console.log(orders);
    }

    fetchProducts();
  });

  const handleDeleteOrder = async (orderId) => {
    await deleteDoc(doc(db, "orders", orderId));
    useEffect();
  };

  const renderItem = ({ item }) => {
    let sum = 0;
    console.log(item.data().orders);
    return (
    <View style={styles.orderContainer}>
      <Text style={styles.pickUpDate}>Pick Up Date: {format(item.data().pickUpDetails.pickUpDate.toDate(), "yyyy-MM-dd")}</Text>
      <Text style={styles.selectedTime}>Selected Time: {item.data().pickUpDetails.selectedTime}</Text>
      <Text style={styles.totalPrice}>Total Price: ${item.data().total}</Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert("Delete Order", "Are you sure you want to delete this order?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => handleDeleteOrder(item.id), style: "destructive" },
          ]);
        }}
      >
        <Text style={styles.deleteButtonText}>Delete Order</Text>
      </Pressable>
    </View>
  )};


if(dataLoaded && orders.size != 0) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
} else if(dataLoaded && orders.size == 0) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>There is no order.</Text>
      </View>
  )
} else {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
  )
}
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    marginTop: 40
  },
  orderContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickUpDate: {
    fontSize: 16,
    marginBottom: 8,
  },
  selectedTime: {
    fontSize: 16,
    marginBottom: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#088F8F",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AllOrdersScreen;
