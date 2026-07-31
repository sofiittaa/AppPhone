import { theme } from "@/constants/theme";
import { Label } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as imagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfilePicture } from "../auth/authSlice";
import CameraIcon from "../components/CameraIcon";
import { logoutUser } from "../services/authService";
import { usePutProfilePictureMutation } from "../services/userServices";
import { RootState } from "../shop/store";
import { AppNavigationParamList } from "../src/navigation/types";

type ProfileNavigationProp = NativeStackNavigationProp<AppNavigationParamList>;
const ProfileScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<ProfileNavigationProp>();

  const name = useSelector((state: RootState) => state.auth.value.name);
  const user = useSelector((state: RootState) => state.auth.value.email);
  const localId = useSelector((state: RootState) => state.auth.value.localId);
  const image = useSelector((state: RootState) => state.auth.value.image);

  const [triggerPutProfile] = usePutProfilePictureMutation();

  const verifyCameraPermissions = async () => {
    const { granted } = await imagePicker.requestCameraPermissionsAsync();
    if (!granted) return false;
    return true;
  };

  const verifyGalleryPermissions = async () => {
    const { granted } = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permiso requerido",
        "Se necesita permiso para acceder a la galería.",
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isPermissionsOk = await verifyCameraPermissions();
    if (!isPermissionsOk) return;

    const result = await imagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.6,
    });

    if (result.canceled) return;

    if (!localId) {
      Alert.alert(
        "Sesion requerida",
        "Primero inicia sesion para guardar la foto.",
      );
      return;
    }

    const imageBase64 = `data:image/jpg;base64,${result.assets[0].base64}`;

    try {
      dispatch(setProfilePicture(imageBase64));
      await triggerPutProfile({
        image: imageBase64,
        localId,
      }).unwrap();
    } catch (error: any) {
      const errorMessage =
        error?.data?.error ||
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "No se pudo guardar la imagen en Firebase.";
      Alert.alert("Error", String(errorMessage));
    }
  };
  const pickImageFromGallery = async () => {
    const isPermissionsOk = await verifyGalleryPermissions();
    if (!isPermissionsOk) return;

    const result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.6,
    });

    if (result.canceled) return;

    const imageBase64 = `data:image/jpg;base64,${result.assets[0].base64}`;

    try {
      dispatch(setProfilePicture(imageBase64));

      await triggerPutProfile({
        image: imageBase64,
        localId,
      }).unwrap();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la imagen.");
      return error;
    }
  };

  const selectImageOption = () => {
    Alert.alert("Foto de perfil", "Selecciona una opción", [
      { text: "📷 Tomar foto", onPress: pickImage },
      { text: "🖼 Elegir de galería", onPress: pickImageFromGallery },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const handlelogOut = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await logoutUser();
              dispatch(logout());
              dispatch(setProfilePicture(""));
              navigation.navigate("ScreenLogin");
            } catch (error) {
              Alert.alert(
                "Error",
                "No se pudo cerrar sesión. Intenta de nuevo.",
              );
              return error;
            }
          },
        },
      ],
    );
  };

  const displayName = name || "Usuario";

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.placeholder}>
                {displayName.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <Pressable
            onPress={selectImageOption}
            style={({ pressed }) => [
              styles.cameraIcon,
              pressed && styles.pressed,
            ]}
          >
            <CameraIcon />
          </Pressable>
        </View>

        <Text style={styles.name}>{displayName}</Text>
        {user ? <Text style={styles.email}>{user}</Text> : null}
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => navigation.navigate("OrderDetailScreen")}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.actionButtonText}>Detalle del pedido</Text>
        </Pressable>

        <Pressable
          onPress={handlelogOut}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </Pressable>
      </View>

      <View style={styles.suport}>
        <Text style={styles.suportTitle}>Soporte</Text>
        <Text style={styles.suportText}>
          Por problemas con la aplicación o dudas contactanos acá, te
          respondemos lo antes posible.
        </Text>

        <View style={styles.suportContact}>
          <Label style={styles.suportLabel}>Nombre</Label>
          <TextInput
            style={styles.suportInput}
            placeholderTextColor={theme.colors.accent}
          />

          <Label style={styles.suportLabel}>Correo</Label>
          <TextInput
            style={styles.suportInput}
            keyboardType="email-address"
            placeholderTextColor={theme.colors.accent}
          />

          <Label style={styles.suportLabel}>Mensaje</Label>
          <TextInput
            style={[styles.suportInput, styles.suportTextarea]}
            multiline
            numberOfLines={5}
            placeholderTextColor={theme.colors.accent}
          />

          <Pressable
            style={({ pressed }) => [
              styles.suportButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.suportButtonText}>Enviar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    width: 90,
    height: 90,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 90,
    height: 90,
  },
  placeholder: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  cameraIcon: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  pressed: {
    opacity: 0.6,
  },
  name: {
    fontSize: 22,
    fontFamily: theme.fonts.title,
    fontWeight: "bold",
    color: theme.colors.text,
    marginTop: 12,
  },
  email: {
    fontSize: 14,
    fontFamily: theme.fonts.text,
    color: theme.colors.accent,
    marginTop: 2,
  },
  actions: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  logoutButton: {
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutButtonText: {
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  suport: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  suportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  suportText: {
    marginTop: 6,
    fontSize: 14,
    fontFamily: theme.fonts.text,
    color: theme.colors.accent,
  },
  suportContact: {
    marginTop: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 16,
  },
  suportLabel: {
    borderRadius: 10,
    fontSize: 13,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 6,
  },
  suportInput: {
    fontFamily: theme.fonts.text,
    borderColor: theme.colors.accent,
    borderWidth: 1,
    fontSize: 14,
    height: 44,

    borderRadius: 10,
    paddingHorizontal: 12,
    color: theme.colors.text,
    backgroundColor: "#fff",
    marginBottom: 14,
  },
  suportTextarea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  suportButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  suportButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
