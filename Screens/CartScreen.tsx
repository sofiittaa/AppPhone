import theme from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Counter from "../components/Counter";
import { RootState } from "../shop/store";

const CartScreen = () => {
  const handleClearCart = () => {};

  const initialState = {
    items: [],
  };
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <View style={styles.main}>
      <Text style={styles.categoryText}>Mi Carrito</Text>
      <View style={styles.containerProduct}>
        {items.map((item) => (
          <View key={item.id} style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Counter itemId={item.id} />
          </View>
        ))}
      </View>
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.comprarButton,
            pressed && styles.comprarButtonPressed,
          ]}
        >
          {({ pressed }) => (
            <Text style={styles.comprarButtonText}>
              {pressed ? "Finalizando..." : "Finalizar Compra"}
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={handleClearCart}
          style={({ pressed }) => [
            styles.comprarButton,
            pressed && styles.comprarButtonPressed,
          ]}
        >
          {({ pressed }) => (
            <Text style={styles.comprarButtonText}>
              {pressed ? "Vaciando..." : "Vaciar Carrito"}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  categoryText: {
    marginTop: 20,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: theme.fonts.title,
    color: theme.colors.primary,
  },
  main: {
    flex: 1,
  },
  comprarButton: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    width: 100,
    height: 47,
    color: "white",
  },
  comprarButtonPressed: {
    backgroundColor: theme.colors.primary,
  },
  comprarButtonText: {
    color: theme.colors.background,
    fontFamily: theme.fonts.text,
    fontSize: 16,
  },
  container: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    width: "90%",
    height: 100,
  },
  containerProduct: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    padding: 10,
    width: "90%",
    height: 300,
  },
  productItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productName: {
    fontSize: 26,
    color: theme.colors.text,
    fontWeight: "bold",

  },
  productPrice: {
    fontSize: 16,
    color: theme.colors.text,
  },
  productQuantity: {
    fontSize: 16,
    color: theme.colors.text,
  },
});
