import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CartScreen = () => {
  return (
    <View>
      <Text style={styles.categoryText}>Categoria</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 16,
    fontFamily: "Roboto",
  },
});
