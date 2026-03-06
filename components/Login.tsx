import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import InputForm from "../components/InputForm";
import theme from "../constants/theme";

const Login = () => {
  const router = useRouter();

  const onSubmit = () => {
    router.push("/");
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Inicia sesion</Text>
      <View style={styles.container}>
        <InputForm label="Email" OnChange={() => {}} error="" />
        <InputForm label="Contrasena" OnChange={() => {}} error="" isSecure />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/signup")} style={styles.linkButton}>
          <Text style={styles.link}>No tienes cuenta? Registrate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 340,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.title,
    color: theme.colors.text,
    marginBottom: 20,
  },
  button: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.background,
    fontFamily: theme.fonts.text,
    fontSize: 16,
  },
  linkButton: {
    marginTop: 12,
    alignItems: "center",
  },
  link: {
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: theme.fonts.text,
  },
});
