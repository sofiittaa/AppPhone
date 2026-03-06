import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CategoryItem = ({ item }: { item: any }) => {
  return (
    <View style={styles.productContainer}>
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  productContainer: {
    alignItems: "center",
    minWidth: 90,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Roboto",
  },
});
