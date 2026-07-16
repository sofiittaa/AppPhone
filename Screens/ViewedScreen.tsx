import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import theme from "../constants/theme";
import { Product } from "../services/ShopServices";
import { RootState } from "../shop/store";
import { AppNavigationParamList } from "../src/navigation/types";

const ViewedScreen = () => {
  const viewedProducts = useSelector(
    (state: RootState) => state.recentlyViewed.products,
  );

  const navigation = useNavigation<NavigationProp<AppNavigationParamList>>();

  return (
    <View style={styles.main}>
      <Text style={styles.viewedText}>Visto Recientemente</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.containerProduct}
        contentContainerStyle={styles.containerProductContent}
        keyboardShouldPersistTaps="handled"
      >
        {(viewedProducts as Product[])
          .slice()
          .reverse()
          .map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                navigation.navigate("vista", { product: item });
              }}
            >
              <View style={styles.productCard}>
                {item.imagen ? (
                  <Image
                    source={{ uri: item.imagen }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                ) : null}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.nombre}</Text>
                  <Text style={styles.productPrice}>${item.precio}</Text>
                </View>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};
export default ViewedScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    pointerEvents: "none",
    justifyContent: "center",
    alignItems: "center",
  },
  containerProductContent: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: 120,
    height: 180,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: 8,
  },
  productInfo: {
    alignItems: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 12,
    textAlign: "center",
  },
  viewedText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: theme.colors.text,
  },
  containerProduct: {
    marginTop: 10,
    marginBottom: 10,
  },
});
