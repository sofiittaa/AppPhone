import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { locales } from "../constants/storeInfo";
import { theme } from "../constants/theme";

const StoreLocations = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Retirá en tienda</Text>

      {locales.map((local) => (
        <View key={local.id} style={styles.card}>
          <Ionicons
            name="location-outline"
            size={22}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <View style={styles.info}>
            <Text style={styles.nombre}>{local.nombre}</Text>
            <Text style={styles.direccion}>{local.direccion}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default StoreLocations;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 70,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 15,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  direccion: {
    fontSize: 13,
    fontFamily: theme.fonts.text,
    color: theme.colors.accent,
    marginTop: 2,
  },
});
