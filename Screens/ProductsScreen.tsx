import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import images from "../constants/images";
import products from "../constants/products";
import { theme } from "../constants/theme";

const ProductsScreen = () => {
  return (
    <ScrollView>
      <View>
        <View style={styles.line}>
          {products.map((product, index) => (
            <View key={index} style={styles.productContainer}>
              <Text style={styles.productName}>{product.name}</Text>
              <Image
                source={images[product.image]}
                style={styles.productImage}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  categorias: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    borderRadius: 25,
    width: 110,
    height: 40,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },

  title: {
    color: theme.colors.primary,
    fontSize: 30,
    marginLeft: 10,
    fontFamily: theme.fonts.title,
    marginTop: 10,
  },

  productName: {
    color: theme.colors.text,
    fontSize: 27,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: theme.fonts.text,
    marginBottom: 20,
  },

  line: {
    marginLeft: 20,
    padding: 10,
    marginBottom: 10,
    width: 400,
    display: "flex",
    flexDirection: "row",

    flexWrap: "wrap",
  },

  productImage: {
    width: 200,
    height: 100,
  },
  productContainer: {
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    width: 150,
    padding: 10,
  },
});
