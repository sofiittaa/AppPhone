import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import theme from "../constants/theme";
import {
  decrementItemQuantity,
  incrementItemQuantity,
} from "../shop/cartSlice";
import { RootState } from "../shop/store";

interface CounterProps {
  itemId: string;
}

const Counter: React.FC<CounterProps> = ({ itemId }) => {
  const item = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === itemId),
  );
  const quantity = item ? item.quantity : 0;

  const dispatch = useDispatch();

  return (
    <View style={styles.content}>
      <Pressable
        style={styles.button}
        onPress={() => dispatch(incrementItemQuantity(itemId))}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
      <Text style={styles.number}>{quantity}</Text>

      <Pressable
        style={styles.button}
        onPress={() => dispatch(decrementItemQuantity(itemId))}
      >
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    height: 50,
    marginTop: 1,
    width: 40,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
  },

  buttonText: {
    color:"white",
    fontSize: 24,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 50,
    marginTop: -20,
  },

  number: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    color: theme.colors.text,
  },
});
