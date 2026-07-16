import { addToCart } from "@/shop/cartSlice";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { theme } from "../constants/theme";
import { addToRecentlyViewed } from "../shop/recentlyViewedSlice";
import { AppNavigationParamList } from "../src/navigation/types";
import ViewedScreen from "./ViewedScreen";

type RutaVistaProp = RouteProp<AppNavigationParamList, "vista">;

const PantallaVista = () => {
  const dispatch = useDispatch();
  const ruta = useRoute<RutaVistaProp>();
  const producto = ruta.params?.product;
  const urlImage = producto?.imagen || "";

  useEffect(() => {
    if (producto) {
      dispatch(addToRecentlyViewed(producto));
    }
  }, [producto, dispatch]);

  const manejarAgregarAlCarrito = () => {
    if (!producto) return;
    dispatch(
      addToCart({
        id: producto.id,
        name: producto.nombre,
        price: producto.precio,
        imagen: urlImage,
        quantity: 1,
      }),
    );
    Alert.alert("Producto agregado", "Se añadió al carrito correctamente");
  };

  if (!producto) {
    return (
      <View style={estilos.card}>
        <Text style={estilos.titulo}>No se recibió ningún producto.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={estilos.contenedor}>
        <View key={producto.id} style={estilos.card}>
          {urlImage ? (
            <Image
              source={{ uri: urlImage }}
              style={estilos.imagen}
              resizeMode="contain"
            />
          ) : (
            <View style={[estilos.imagen, estilos.imagenPlaceholder]}>
              <Text style={{ color: theme.colors.text }}>Sin imagen</Text>
            </View>
          )}
        </View>
        <Text style={estilos.titulo}>{producto.nombre}</Text>
        <Text style={estilos.precio}>${producto.precio}</Text>
        <Text style={estilos.categoria}>{producto.categoria}</Text>
        <Pressable style={estilos.boton} onPress={manejarAgregarAlCarrito}>
          <Text style={{ color: theme.colors.background, fontSize: 15 }}>
            Añadir al carrito
          </Text>
        </Pressable>

        <ViewedScreen />
      </View>
    </ScrollView>
  );
};

export default PantallaVista;

const estilos = StyleSheet.create({
  contenedor: {
    marginTop: 250,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  imagen: {
    marginTop: 50,
    width: 300,
    height: 250,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: theme.colors.text,
    fontFamily: theme.fonts.title,
  },
  precio: {
    fontSize: 20,
    color: theme.colors.primary,
    marginTop: 5,
    marginRight: 300,
  },
  categoria: {
    fontSize: 15,
    color: theme.colors.primary,
    marginTop: 5,
    marginRight: 300,
    marginBottom: 20,
  },
  imagenPlaceholder: {
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
  boton: {
    borderRadius: 25,
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: theme.fonts.text,
    backgroundColor: theme.colors.primary,
  },
});
