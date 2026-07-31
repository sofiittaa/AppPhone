import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../constants/theme";
import {
  useGetCategoriasQuery,
  useGetProductsQuery,
} from "../services/ShopServices";
import { RootState } from "../shop/store";
import { AppNavigationParamList } from "../src/navigation/types";
import CategoryItem from "./CategoyItem";
import OffersSection from "./OffersSection";
import PromoBanner from "./PromoBanner";
import StoreHours from "./StoreHours";
import StoreLocations from "./StoreLocations";

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
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.FirstContainer}>
          <View style={styles.container}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>
        </View>

        <PromoBanner />

        <Text style={styles.sectionTitle}>Categorías</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => <CategoryItem item={item} />}
        />

        <Text style={styles.sectionTitle}>Productos Destacados</Text>

        <FlatList
          data={featuredProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.featuredList}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.productItem,
                pressed && styles.productItemPressed,
              ]}
              onPress={() => navigation.navigate("vista", { product: item })}
            >
              <Image
                source={{ uri: item.imagen }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.productName} numberOfLines={2}>
                {item.nombre}
              </Text>
              <Text style={styles.productPrice}>${item.precio}</Text>
            </Pressable>
          )}
        />

        <OffersSection />
        <StoreHours />
        <StoreLocations />
      </ScrollView>
    </SafeAreaView>
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
  categoriesList: {
    paddingHorizontal: 15,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  featuredList: {
    paddingHorizontal: 15,
    paddingBottom: 4,
  },
  productItem: {
    width: 130,
    marginRight: 12,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 12,
  },
  productItemPressed: {
    opacity: 0.7,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 14,
    fontFamily: theme.fonts.text,
    textAlign: "center",
    marginTop: 8,
    minHeight: 34,
    color: theme.colors.text,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginTop: 4,
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
