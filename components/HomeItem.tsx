import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { theme } from "../constants/theme";
import {
  useGetCategoriasQuery,
  useGetProductsQuery,
} from "../services/ShopServices";
import { RootState } from "../shop/store";
import { AppNavigationParamList } from "../src/navigation/types";
import CategoryItem from "./CategoyItem";

const HomeItem = () => {
  const viewedProducts = useSelector(
    (state: RootState) => state.recentlyViewed.products,
  );
  const navigation = useNavigation<NavigationProp<AppNavigationParamList>>();
  const { data: categoriesData } = useGetCategoriasQuery(undefined);
  const categories = categoriesData
    ? Object.entries(categoriesData).map(([id, value]: [string, any]) => ({
        id,
        ...value,
      }))
    : [];
  const recentlyViewed = useSelector(
    (state: RootState) => state.recentlyViewed.products,
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { data: productos = [], isLoading, error } = useGetProductsQuery();
  const featuredProducts = productos ? productos.slice(0, 5) : [];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.FirstContainer}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CategoryItem item={item} />}
        />
      </View>
      <Text style={styles.sectionTitle}>Productos Destacados</Text>

      <View style={styles.featuredContainer}>
        <FlatList
          data={featuredProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("vista", { product: item })}
            >
              <View style={styles.productItem}>
                <Image
                  source={{ uri: item.imagen }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{item.nombre}</Text>
                <Text style={styles.productPrice}>${item.precio}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default HomeItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,

    borderRadius: 50,
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 120,
    height: 80,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  FirstContainer: {
    marginTop: 50,
    marginLeft: 115,
    backgroundColor: theme.colors.primary,

    width: 180,
    height: 80,
    borderRadius: 35,
  },
  categoriesContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  featuredContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 20,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: -10,
    marginLeft: 115,
  },
  productItem: {
    width: 120,
    marginRight: 10,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 40,
  },
  productName: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    color: theme.colors.text,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  recentContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  bannerContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  bannerImage: {
    width: 200,
    height: 100,
    borderRadius: 10,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginTop: 10,
  },
  quickAccessContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  quickButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  quickText: {
    color: "white",
    fontSize: 16,
  },
});
