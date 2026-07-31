import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { theme } from "../constants/theme";
import { Product } from "../services/ShopServices";
import { addToCart } from "../shop/cartSlice";

type ProductViewProps = {
  product: Product;
};

const ProductView = ({ product }: ProductViewProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.nombre,
        price: product.precio,
        imagen: product.imagen,
        quantity: 1,
      }),
      
    );
    Alert.alert("Producto agregado", `${product.nombre} se añadió al carrito.`);
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.text}> + </Text>
      </Pressable>
    </View>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  text: {
    color: theme.colors.background,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -3,
  },
});
