import React, { useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CategoryItem from "../components/CategoyItem";
import ProductView from "../components/ProductView";
import SearchVar from "../components/SearchVar";

import { theme } from "../constants/theme";
import {
  Product,
  useGetCategoriasQuery,
  useGetProductsQuery,
} from "../services/ShopServices";
import { AppNavigationParamList } from "../src/navigation/types";

// Algunos productos en Firebase quedaron con la categoría mal escrita
// respecto al nombre real de la categoría; se normalizan acá para que el filtro matchee.
const CATEGORIA_ALIASES: Record<string, string> = {
  carnes: "carne",
  alcohol: "con alcohol",
};

const normalizeCategoria = (value: string) => {
  const normalized = value?.trim().toLowerCase() ?? "";
  return CATEGORIA_ALIASES[normalized] || normalized;
};

const ProductsScreen = () => {
  const navigation = useNavigation<NavigationProp<AppNavigationParamList>>();
  const { data: productos = [], isLoading, error } = useGetProductsQuery();
  const { data: categoriasData } = useGetCategoriasQuery(undefined);
  const categorias = categoriasData
    ? Object.entries(categoriasData)
        .map(([id, value]: [string, any]) => ({ id, ...value }))
        .filter((categoria) => categoria.name)
    : [];

  const [search, setSearch] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(
    null,
  );

  const productosValidos = productos
    .filter((producto) => producto && producto.nombre && producto.imagen)
    .filter(
      (producto) =>
        !selectedCategoria ||
        normalizeCategoria(producto.categoria) ===
          normalizeCategoria(selectedCategoria),
    )
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(search.trim().toLowerCase()),
    );

  return (
    <ScrollView>
      <View>
        <SearchVar value={search} onChangeText={setSearch} />

        <FlatList
          data={categorias}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoriesRow}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              selected={selectedCategoria === item.name}
              onPress={() =>
                setSelectedCategoria((current) =>
                  current === item.name ? null : item.name,
                )
              }
            />
          )}
        />

        <View style={styles.line}>
          {productosValidos.map((producto: Product) => (
            <View key={producto.id} style={styles.productContainer}>
              <Pressable
                onPress={() => navigation.navigate("vista", { product: producto })}
              >
                <Image
                  source={{ uri: producto.imagen }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </Pressable>
              <Text style={styles.productName}>{producto.nombre}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>${producto.precio}</Text>
                <ProductView product={producto} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  categoriesRow: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  categorias: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 20,
  },
  button: {
    borderRadius: 25,
    width: 100,
    height: 40,
    marginTop: 10,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: theme.fonts.text,
    backgroundColor: theme.colors.primary,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 30,
    marginLeft: 10,
    fontFamily: theme.fonts.title,
    marginTop: 10,
  },
  productName: {
    color: theme.colors.text,
    fontSize: 20,
    marginTop: 10,
    fontFamily: theme.fonts.text,
    marginBottom: 20,
    textAlign: "center",
  },
  line: {
    marginLeft: -9,
    padding: 10,
    marginBottom: 10,
    width: 500,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  productImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  productContainer: {
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    width: 165,
    padding: 10,
  },
  productPrice: {
    color: theme.colors.primary,
    fontSize: 18,
    fontFamily: theme.fonts.text,
    fontWeight: "bold",
  },
});
