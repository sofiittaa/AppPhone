import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";
import { useGetProductsQuery } from "../services/ShopServices";
import { AppNavigationParamList } from "../src/navigation/types";

// Descuento de ejemplo — reemplazar por un campo real (ej. precioOferta) cuando se conecte a Firebase.
const DESCUENTO_EJEMPLO = 0.2;

const OffersSection = () => {
  const navigation = useNavigation<NavigationProp<AppNavigationParamList>>();
  const { data: productos = [] } = useGetProductsQuery();

  const productosValidos = productos.filter(
    (producto) => producto && producto.nombre && producto.imagen,
  );
  const ofertas = productosValidos.slice(5, 8);

  if (!ofertas.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Ofertas</Text>

      {ofertas.map((producto) => {
        const precioOferta = Math.round(
          producto.precio * (1 - DESCUENTO_EJEMPLO),
        );

        return (
          <Pressable
            key={producto.id}
            style={styles.card}
            onPress={() => navigation.navigate("vista", { product: producto })}
          >
            <Image source={{ uri: producto.imagen }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.nombre}>{producto.nombre}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.precioAntes}>${producto.precio}</Text>
                <Text style={styles.precioOferta}>${precioOferta}</Text>
              </View>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                -{Math.round(DESCUENTO_EJEMPLO * 100)}%
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default OffersSection;

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 15,
    fontFamily: theme.fonts.text,
    color: theme.colors.text,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  precioAntes: {
    fontSize: 13,
    color: theme.colors.accent,
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  precioOferta: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
  },
  badgeText: {
    color: theme.colors.background,
    fontWeight: "bold",
    fontSize: 13,
  },
});