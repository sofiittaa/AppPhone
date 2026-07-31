import theme from "@/constants/theme";
import { Image } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../services/ShopServices";
import { RootState } from "../shop/store";

const OrderDetailScreen = () => {
  const userId = useSelector((state: RootState) => state.auth.value.localId);
  const { data: orders = [], isLoading, error } = useGetOrdersQuery(userId, {
    skip: !userId,
  });

  if (isLoading) {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Cargando pedidos...</Text>
      </View>
    );
  }

  if (error) {
    const reason =
      typeof (error as any)?.data === "string"
        ? (error as any).data
        : (error as any)?.data?.error ||
          (error as any)?.data?.message ||
          (error as any)?.error ||
          (error as any)?.message ||
          "Verificá la sesión y las reglas de Firebase.";

    return (
      <View style={styles.main}>
        <Text style={styles.title}>Error al cargar pedidos</Text>
        <Text style={styles.errorText}>{reason}</Text>
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>No hay pedidos realizados</Text>
      </View>
    );
  }
  
  const allItems = orders.flatMap((order) => order.items);

  return (
    <ScrollView>
      <Text style={styles.title}>Pedidos</Text>

      {orders.map((order, orderIndex) => (
        <View key={`${order.id}-${orderIndex}`} style={styles.detailContainer}>
          <Text style={styles.orderTitle}>Pedido del {order.date}</Text>

          <Text style={styles.detailText}>Estado: {order.status}</Text>

          {order.items.map((item, itemIndex) => (
            <View key={`${item.id}-${itemIndex}`}>
              <Image source={{ uri: item.imagen }} style={styles.image} />

              <Text style={styles.detailText}>Producto: {item.name}</Text>

              <Text style={styles.detailText}>Cantidad: {item.quantity}</Text>

              <Text style={styles.detailText}>Precio: ${item.price}</Text>

              <Text style={styles.detailText}>
                Subtotal: ${item.price * item.quantity}
              </Text>

              <View style={styles.line} />
            </View>
          ))}

          <Text style={styles.totalText}>Total pedido: ${order.total}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  errorText: {
    color: theme.colors.text,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  detailText: {
    fontSize: 20,
    marginBottom: 10,
    color: theme.colors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 100,
  },
  orderTitle: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  totalText: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "50%",
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 90,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.primary,
    marginVertical: 10,
  },
});
