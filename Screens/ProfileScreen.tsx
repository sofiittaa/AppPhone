import theme from "@/constants/theme";
import * as imagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfilePicture } from "../auth/authSlice";
import CameraIcon from "../components/CameraIcon";
import { logoutUser } from "../services/authService";
import { usePutProfilePictureMutation } from "../services/userServices";
import { RootState } from "../shop/store";

const ProfileScreen = () => {
  const dispatch = useDispatch();

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
    }
  };

  const selectImageOption = () => {
    Alert.alert("Foto de perfil", "Selecciona una opción", [
      { text: "📷 Tomar foto", onPress: pickImage },
      { text: "🖼 Elegir de galería", onPress: pickImageFromGallery },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const router = useRouter();

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
              router.replace("/ScreenLogin");
            } catch (error) {
              Alert.alert(
                "Error",
                "No se pudo cerrar sesión. Intenta de nuevo.",
              );
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.placeholder}>
            {user?.charAt(0).toUpperCase() || "U"}
          </Text>
        )}
        <Pressable
          onPress={selectImageOption}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            styles.cameraIcon,
          ]}
        >
          <CameraIcon />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>Nombre de Usuario: {name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>Correo: {user}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>Direccion: N/A</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>Telefono: N/A</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>Metodo de pago: N/A</Text>
      </View>
      <Pressable onPress={handlelogOut} style={styles.logoutButton}>
        {({ pressed }) => (
          <Text style={styles.logoutText}>
            {pressed ? "Cerrando..." : "Cerrar sesión"}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: -200,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  placeholder: {
    fontSize: 50,
    color: theme.colors.primary,
  },
  cameraIcon: {
    position: "absolute",
    bottom: -10,
    right: -10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  name: {
    fontSize: 15,
    color: theme.colors.text,
  },

  logoutText: {
    fontSize: 16,
    color: "#fff",
  },
  logoutButton: {
    padding: 10,
    borderRadius: 50,
    width: 120,
    height: 40,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  content: {
    marginTop: 20,
    alignItems: "center",
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,

    width: "90%",
  },
});
