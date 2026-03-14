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

import { theme } from "../constants/theme";
import { useGetProductsQuery } from "../services/ShopServices";

const ProductsScreen = () => {
  const navigation: any = useNavigation();

  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const validProducts = products.filter(
    (product) => product && product.name && product.image,
  );

  return (
    <ScrollView>
      <View>
        <View style={styles.line}>
          {validProducts.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              <Text style={styles.productName}>{product.name}</Text>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("vista", { product })}
              >
                <Text style={{ color: theme.colors.background, fontSize: 15 }}>
                  Comprar
                </Text>
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
    fontSize: 27,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: theme.fonts.text,
    marginBottom: 20,
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
    width: 135,
    height: 110,
  },
  productContainer: {
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    width: 165,
    padding: 10,
  },
});
