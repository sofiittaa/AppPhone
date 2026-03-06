import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import InputForm from "../components/InputForm";
import theme from "../constants/theme";
import { registerUser } from "../services/authService";

const SignUpScreen = () => {
  const router = useRouter();
  const onSubmit = () => {
    router.push("/");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await registerUser(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Registrate</Text>
      <View style={styles.container}>
        <InputForm label="Email" OnChange={setEmail} error="" />
        <InputForm label="Contrasena" OnChange={setPassword} error="" isSecure />
        <InputForm
          label="Repetir contraseña"
          OnChange={setPassword}
          error=""
          isSecure
        />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </Pressable>
        <Pressable onPress={handleSignUp} style={styles.linkButton}>
          <Text style={styles.link}>Ya tienes cuenta? Inicia sesion</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
