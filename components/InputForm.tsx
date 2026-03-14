import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../constants/theme";

type Props = {
  label: string;
  OnChange: (value: string) => void;
  error?: string;
  isSecure?: boolean;
};
const InputForm = ({ label, OnChange, error, isSecure }: Props) => {
  return (
    <View style={styles.InputContainer}>
      <Text style={styles.sub}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={OnChange}
        secureTextEntry={isSecure}
        placeholderTextColor={theme.colors.text}
      />
      {error ? <Text style={styles.error}> {error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  InputContainer: {
    width: "100%",
  },
  sub: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    color: theme.colors.text,
    width: "100%",
    paddingVertical: 8,
  },
  error: {
    color: theme.colors.primary,
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
});
