
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";
import { horarios } from "../constants/storeInfo";

const StoreHours = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Horarios de atención</Text>

      <View style={styles.card}>
        {horarios.map((item) => (
          <View key={item.dias} style={styles.row}>
            <Text style={styles.dias}>{item.dias}</Text>
            <Text style={styles.horario}>{item.horario}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StoreHours;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  dias: {
    fontSize: 14,
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
  },
  horario: {
    fontSize: 14,
    fontFamily: theme.fonts.text,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});