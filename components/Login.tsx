import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { setProfilePicture, setUser } from "../auth/authSlice";
import InputForm from "../components/InputForm";
import theme from "../constants/theme";
import { loginUser } from "../services/authService";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");

      const user = await loginUser(email.trim(), password);

      let profileName = "";
      let profileImage = "";
      try {
        const idToken = await user.getIdToken();
        const response = await fetch(
          `https://app-phone-d354f-default-rtdb.firebaseio.com/profiles/${user.uid}.json?auth=${idToken}`,
        );
        const profile = await response.json();
        profileName = profile?.name || "";
        profileImage = profile?.image || "";
      } catch {
        profileName = "";
        profileImage = "";
      }

      dispatch(
        setUser({
          name: profileName || user.displayName || "",
          email: user.email ?? email.trim(),
          password,
          localId: user.uid,
        }),
      );
      dispatch(setProfilePicture(profileImage));

      router.replace("/");
    } catch (err: any) {
      setError(err?.message || "No se pudo iniciar sesion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Inicia sesion</Text>
      <View style={styles.container}>
        <InputForm label="Email" OnChange={setEmail} error="" />
        <InputForm
          label="Contrasena"
          OnChange={setPassword}
          error=""
          isSecure
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable
          onPress={onSubmit}
          style={styles.button}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/signup")}
          style={styles.linkButton}
        >
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
    color: theme.colors.primary,
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
  error: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 6,
  },
});
