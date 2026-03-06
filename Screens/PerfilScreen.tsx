import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "../components/Login";

const PerfilScreen = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
