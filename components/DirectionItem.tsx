import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";

const DirectionItem = () => {
  const router = useRouter();

  return (
    <View>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/DirectionScreen")}
      >
        <Text style={styles.buttonText}>Agregar Direccion</Text>
      </Pressable>
    </View>
  );
};

export default DirectionItem;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 50,
    width: "90%",
    height: 40,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
});
