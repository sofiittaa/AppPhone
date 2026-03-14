import { addToCart } from "@/shop/cartSlice";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { theme } from "../constants/theme";
import { AppNavigationParamList } from "../src/navigation/types";

type ViewContainerRouteProp = RouteProp<AppNavigationParamList, "vista">;

const ViewScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute<ViewContainerRouteProp>();
  const product = route.params?.product;
  const imageUrl = product?.image || "";

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }),
    );
  };

  if (!product) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>No se recibio ningun producto.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View key={product.id} style={styles.card}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={{ color: theme.colors.text }}>Sin imagen</Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.category}>{product.categories}</Text>
      <Pressable style={styles.button} onPress={handleAddToCart}>
        <Text style={{ color: theme.colors.background, fontSize: 15 }}>
          Añadir al carrito
        </Text>
      </Pressable>
    </View>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
    marginLeft: 40,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 10,
    marginRight: 220,
    color: "#060606",
    fontFamily: theme.fonts.title,
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginTop: 5,
    marginRight: 300,
  },
  category: {
    fontSize: 15,
    color: "#888",
    marginTop: 5,
    marginRight: 270,
    marginBottom: 20,
  },
  imagePlaceholder: {
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: -200,
    borderColor: "#060606",
    borderWidth: 0.2,
    width: 340,
    height: 400,
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  button: {
    borderRadius: 25,
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: theme.fonts.text,
    backgroundColor: theme.colors.primary,
  },
});
