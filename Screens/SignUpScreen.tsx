import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/authSlice";
import InputForm from "../components/InputForm";
import theme from "../constants/theme";
import { registerUser } from "../services/authService";
import { useUpsertUserProfileMutation } from "../services/userServices";
import signUpSchema from "../validations/signUpSchemma";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [upsertUserProfile] = useUpsertUserProfileMutation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const cleanData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      await signUpSchema.validate(cleanData, { abortEarly: false });

      const user = await registerUser(cleanData.email, cleanData.password, cleanData.name);

      dispatch(
        setUser({
          name: cleanData.name,
          email: user.email ?? cleanData.email,
          password: cleanData.password,
          localId: user.uid,
        }),
      );

      await upsertUserProfile({
        localId: user.uid,
        profile: {
          name: cleanData.name,
          email: user.email ?? cleanData.email,
        },
      }).unwrap();

      router.replace("/");
    } catch (err: any) {
      if (err?.inner) {
        const validationErrors: Record<string, string> = {};

        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });

        setErrors(validationErrors);
      } else {
        setErrors({
          general:
            err?.message ||
            "No se pudo crear la cuenta. Verifica Email/Password en Firebase Auth.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Registrate</Text>

      <View style={styles.container}>
        <InputForm
          label="Nombre"
          OnChange={(value) => handleChange("name", value)}
          error={errors.name}
        />

        <InputForm
          label="Email"
          OnChange={(value) => handleChange("email", value)}
          error={errors.email}
        />

        <InputForm
          label="Contrasena"
          OnChange={(value) => handleChange("password", value)}
          error={errors.password}
          isSecure
        />

        <InputForm
          label="Repetir contrasena"
          OnChange={(value) => handleChange("confirmPassword", value)}
          error={errors.confirmPassword}
          isSecure
        />

        {errors.general ? (
          <Text style={styles.generalError}>{errors.general}</Text>
        ) : null}

        <Pressable
          onPress={handleSubmit}
          style={styles.button}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Creando..." : "Crear cuenta"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/ScreenLogin")}
          style={styles.linkButton}
        >
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
  generalError: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 6,
  },
});


