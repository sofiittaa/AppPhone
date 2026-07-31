import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../auth/authSlice";
import theme from "../constants/theme";
import { auth } from "../firebase/fireBaseConfig";
import { useAddOrderMutation } from "../services/ShopServices";
import { clearCart } from "../shop/cartSlice";
import { RootState } from "../shop/store";

const CheckOut = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);
  const userId = useSelector((state: RootState) => state.auth.value.localId);

  const [addOrder] = useAddOrderMutation();

  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [step, setStep] = useState("address");

  const [nombre, setNombre] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [fecha, setFecha] = useState("");
  const [cvv, setCvv] = useState("");

  const resetCheckout = () => {
    setStep("address");
    setCalle("");
    setNumero("");
    setCiudad("");
    setNombre("");
    setTarjeta("");
    setFecha("");
    setCvv("");
  };

  const handleCancel = () => {
    resetCheckout();
    setVisible(false);
  };

  const handleBackToAddress = () => {
    setNombre("");
    setTarjeta("");
    setFecha("");
    setCvv("");
    setStep("address");
  };

  const handleNext = () => {
    if (!calle.trim() || !numero.trim() || !ciudad.trim()) {
      Alert.alert("Error 😅", "Completá todos los campos");
      return;
    }

    // 🚫 número
    if (isNaN(Number(numero))) {
      Alert.alert("Número inválido 🚫", "El número debe ser numérico");
      return;
    }

    if (calle.trim().length < 2) {
      Alert.alert("Calle inválida 🛣️", "Ingresá una calle válida");
      return;
    }

    const ciudadValida = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!ciudadValida.test(ciudad.trim())) {
      Alert.alert("Ciudad inválida 🌆", "Solo letras en la ciudad");
      return;
    }

    setStep("payment");
  };
  const handleConfirm = async () => {
    await auth.authStateReady();
    if (!userId || !auth.currentUser || auth.currentUser.uid !== userId) {
      dispatch(logout());
      Alert.alert(
        "Sesi\u00f3n expirada",
        "Volv\u00e9 a iniciar sesi\u00f3n para confirmar tu compra.",
      );
      handleCancel();
      router.replace("/ScreenLogin");
      return;
    }

    if (!nombre.trim() || !tarjeta.trim() || !fecha.trim() || !cvv.trim()) {
      Alert.alert("Error 😅", "Completá todos los datos de pago");
      return;
    }

    if (tarjeta.length < 16) {
      Alert.alert("Tarjeta inválida 💳", "Debe tener 16 dígitos");
      return;
    }

    if (cvv.length < 3) {
      Alert.alert("CVV inválido 🔒", "Debe tener 3 dígitos");
      return;
    }

    if (!fecha.includes("/")) {
      Alert.alert("Fecha inválida 📅", "Formato: MM/YY");
      return;
    }

    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    if (total <= 0) {
      Alert.alert("Error", "Total inválido");
      return;
    }

    try {
      await addOrder({
        id: Date.now().toString(),
        userId,
        items,
        total,
        address: { calle, numero, ciudad },
        date: new Date().toLocaleDateString(),
        status: "pending",
      }).unwrap();

      dispatch(clearCart());
      Alert.alert("Compra exitosa 🎉", "Gracias por tu compra");
      handleCancel();
    } catch (error: any) {
      resetCheckout();
      const reason =
        typeof error?.data === "string"
          ? error.data
          : error?.data?.error ||
            error?.error ||
            error?.message ||
            "Firebase rechazó la compra.";
      Alert.alert("No se pudo completar la compra", reason);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {step === "address" && (
            <>
              <Text style={styles.title}>Dirección</Text>

              <TextInput
                placeholder="Calle"
                style={styles.input}
                value={calle}
                onChangeText={setCalle}
              />

              <TextInput
                placeholder="Número"
                style={styles.input}
                value={numero}
                onChangeText={setNumero}
                keyboardType="numeric"
              />

              <TextInput
                placeholder="Ciudad"
                style={styles.input}
                value={ciudad}
                onChangeText={setCiudad}
              />

              <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Siguiente</Text>
              </Pressable>
            </>
          )}

          {step === "payment" && (
            <>
              <Text style={styles.title}>Pago</Text>

              <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
              />

              <TextInput
                placeholder="Número de tarjeta"
                style={styles.input}
                keyboardType="numeric"
                value={tarjeta}
                onChangeText={setTarjeta}
              />

              <TextInput
                placeholder="Fecha vencimiento"
                style={styles.input}
                value={fecha}
                onChangeText={setFecha}
              />

              <TextInput
                placeholder="CVV"
                style={styles.input}
                keyboardType="numeric"
                value={cvv}
                onChangeText={setCvv}
              />

              <View style={styles.paymentActions}>
                <Pressable style={styles.backButton} onPress={handleBackToAddress}>
                  <Text style={styles.backButtonText}>Volver</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleConfirm}>
                  <Text style={styles.buttonText}>Confirmar pago</Text>
                </Pressable>
              </View>
            </>
          )}

          <Pressable
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancel}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
export default CheckOut;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 10,
    width: 130,
    height: 50,
  },
  paymentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.text,
    borderWidth: 1,
    borderRadius: 10,
    width: 110,
    height: 50,
  },
  backButtonText: {
    color: theme.colors.text,
    fontSize: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  modalBox: {
    width: "80%",
    backgroundColor: theme.colors.background,
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontFamily: theme.fonts.title,
    fontSize: 20,
    marginBottom: 10,
    color: theme.colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  payText: {
    color: "#fff",
    textAlign: "center",
  },
  cancel: {
    textAlign: "center",
    fontSize: 15,
    color: theme.colors.text,
  },
  cancelButton: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.text,
    borderWidth: 1,
    width: "100%",
    height: 49,
    borderRadius: 10,
    color: "gray",
  },
});
