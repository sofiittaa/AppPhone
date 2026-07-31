import CategoryItem from "@/components/CategoyItem";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetCategoriasQuery } from "../services/ShopServices";

const CategoryScreen = () => {
  const { data: categoriasData } = useGetCategoriasQuery(undefined);
  const categorias = categoriasData
    ? Object.entries(categoriasData).map(([id, value]: [string, any]) => ({
        id,
        ...value,
      }))
    : [];

  return (
    <View>
      <FlatList
        data={categorias}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CategoryItem item={item} />}
      />
    </View>
  );
};

export default CategoryScreen;
