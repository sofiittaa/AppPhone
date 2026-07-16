import CheckOut from "@/components/CheckOut";
import theme from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { clearCart } from "../shop/cartSlice";
import { RootState } from "../shop/store";

const CartScreen = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [cantidad, setCantidad] = useState(1);

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const handleClearCart = () => {
    if (items.length === 0) {
      Alert.alert("El carrito está vacío");
    } else {
      Alert.alert("Vaciar carrito", "¿Estás seguro?", [
        { text: "Cancelar", onPress: () => {} },
        { text: "Vaciar", onPress: () => dispatch(clearCart()) },
      ]);
    }
  };
  const handleBuyProducts = () => {
    Alert.alert("Ir a pagar 🛒", "¿Querés continuar con la compra?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sí, vamos 😎",
        onPress: () => setVisible(true),
      },
    ]);
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  return (
    <View style={styles.main}>
      <Text style={styles.categoryText}>Mi Carrito</Text>

      {items.length === 0 && (
        <View style={styles.carrito}>
          <Text style={styles.carritoText}>Carrito Vacío</Text>
        </View>
      )}

      <ScrollView style={styles.containerProduct}>
        {items.map((item) => {
          const subtotal = item.price * (item.quantity || 1);

          return (
            <View key={item.id} style={styles.productCard}>
              {item.imagen && (
                <Image
                  source={{ uri: item.imagen }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              )}

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>

                <Text style={styles.productPrice}>
                  ${item.price} x {item.quantity}
                </Text>

                <Text style={styles.productPrice}>Subtotal: ${subtotal}</Text>

                <Counter itemId={item.id} />
              </View>
            </View>
          );
        })}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.container}>
          <Pressable onPress={handleBuyProducts} style={styles.comprarButton2}>
            <Text style={styles.comprarButtonText}>Comprar</Text>
          </Pressable>

          <Pressable onPress={handleClearCart} style={styles.comprarButton}>
            <Text style={styles.comprarButtonText}>Vaciar</Text>
          </Pressable>
        </View>
      )}

      <CheckOut visible={visible} setVisible={setVisible} />

      <Text style={styles.totalText}>
        Total: $
        {items.reduce(
          (acc, item) => acc + item.price * (item.quantity || 1),
          0,
        )}
      </Text>
    </View>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  categoryText: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: theme.fonts.title,
    color: theme.colors.primary,
  },
  main: {
    flex: 1,
    marginBottom: -10,
  },
  container: {
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
    width: "90%",
    height: 60,
    gap: 16,
  },
  comprarButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    width: 120,
    height: 44,
    // 👈 sacá todos los marginTop y marginLeft
  },
  comprarButton2: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    width: 120,
    height: 44,
    // 👈 igual, sin márgenes
  },
  comprarButtonPressed: {
    backgroundColor: theme.colors.primary,
  },
  comprarButtonText: {
    color: "white",
    fontFamily: theme.fonts.text,
    fontSize: 16,
    justifyContent: "center",
  },

  containerProduct: {
    marginLeft: 20,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    padding: 10,
    width: "90%",
    flex: 1,
  },
  productCard: {
    marginBottom: 30,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 10,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  productImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  productInfo: {
    marginTop: 8,
    flexDirection: "column",
    gap: 6,
  },
  productName: {
    fontSize: 22,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 10,
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "#f5f5f5",
  },
  productQuantity: {
    fontSize: 16,
    color: theme.colors.text,
  },
  carrito: {
    alignItems: "center",
    justifyContent: "center",

    padding: 20,
  },
  carritoText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 300,
    color: theme.colors.primary,
    fontFamily: theme.fonts.text,
  },
  carritoText2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    color: theme.colors.primary,
    fontFamily: theme.fonts.text,
  },
  carritoText3: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    color: theme.colors.primary,
    fontFamily: theme.fonts.text,
  },
  carritoButtonPressed: {
    backgroundColor: theme.colors.primary,
  },
  carritoButton: {
    color: theme.colors.primary,
    borderRadius: 100,
    fontFamily: theme.fonts.text,
    fontSize: 16,

    justifyContent: "center",
  },
  totalText: {
    marginLeft: 10,
    marginBottom: 120,
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: theme.fonts.title,
    color: theme.colors.primary,
  },
});
