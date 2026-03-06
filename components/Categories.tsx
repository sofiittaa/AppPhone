import theme from "@/constants/theme";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Categories({ categories }: { categories: any[] }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productContainer: {
    alignItems: "center",
    minWidth: 90,
    height: 50,
    borderRadius: 15,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginRight: 10,
  },

  productName: {
    fontSize: 14,
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
  },
});
