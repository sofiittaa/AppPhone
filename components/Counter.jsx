import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import theme from "../constants/theme";
import { decrement, increment } from "./features/CounterSlice";

const Counter = () => {
  const counter = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <View style={styles.content}>
      <Pressable style={styles.button} onPress={() => dispatch(increment())}>
        <Text>+</Text>
      </Pressable>
      <Text style={styles.number}>{counter}</Text>

      <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
        <Text>-</Text>
      </Pressable>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    color: theme.colors.text,
    fontSize: 40,
    marginTop: 40,
    width: 50,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 50,
  },

  number: {
    marginTop: 40,
    fontSize: 20,
    color: theme.colors.text,
  },
});
