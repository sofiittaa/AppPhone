import { Input } from "@rneui/base";
import React from "react";

import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAddDirectionMutation } from "../services/ShopServices";

const DirectionScreen = () => {
  const [addDirectionMutation] = useAddDirectionMutation();
  const [calle, setcalle] = React.useState("");
  const [numero, setnumero] = React.useState("");
  const [ciudad, setciudad] = React.useState("");

  const handleDirection = async () => {
    await addDirectionMutation({
      calle,
      numero,
      ciudad,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresá tu dirección</Text>
      <Input
        style={styles.input}
        placeholder="Calle"
        value={calle}
        onChangeText={setcalle}
      />
      <Input
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setnumero}
      />
      <Input
        style={styles.input}
        placeholder="Ciudad"
        value={ciudad}
        onChangeText={setciudad}
      />
      <Pressable style={styles.button} onPress={handleDirection}>
        <Text style={styles.buttonText}>Guardar Dirección</Text>
      </Pressable>
    </View>
  );
};

export default DirectionScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 20,
  },

  button: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 10,
    width: 130,
    height: 50,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
});
