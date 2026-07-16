import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchVar from "../components/SearchVar";

import { theme } from "../constants/theme";
import { Product, useGetProductsQuery } from "../services/ShopServices";

const ProductsScreen = () => {
  const navigation: any = useNavigation();

  const { data: productos = [], isLoading, error } = useGetProductsQuery();
  const productosValidos = productos.filter(
    (producto) => producto && producto.nombre && producto.imagen,
  );

  return (
    <ScrollView>
      <View>
        <SearchVar />
        <View style={styles.line}>
          {productosValidos.map((producto: Product) => (
            <View key={producto.id} style={styles.productContainer}>
              <Pressable
                onPress={() =>
                  navigation.navigate("vista", { product: producto })
                }
              >
                <Image
                  source={{ uri: producto.imagen }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <Text style={styles.productName}>{producto.nombre}</Text>
                <Text style={styles.productPrice}>${producto.precio}</Text>
              </Pressable>
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
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 20,
  },
  button: {
    borderRadius: 25,
    width: 100,
    height: 40,
    marginTop: 10,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: theme.fonts.text,
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
    fontSize: 20,
    marginTop: 10,
    fontFamily: theme.fonts.text,
    marginBottom: 20,
    textAlign: "center",
  },
  line: {
    marginLeft: -9,
    padding: 10,
    marginBottom: 10,
    width: 500,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  productImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  productContainer: {
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    width: 165,
    padding: 10,
  },
  productPrice: {
    color: theme.colors.primary,
    fontSize: 15,
    marginTop: "auto",
    fontFamily: theme.fonts.text,
  },
});
