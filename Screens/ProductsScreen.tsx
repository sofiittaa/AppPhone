import { theme } from "@/constants/theme";
import { Button } from "@react-navigation/elements";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const ProductsScreen = () => {
  return (
    <ScrollView>
      <View>
        <View style={styles.categorias}>
          <Text style={styles.title}>Productos</Text>
          <Button onPress={() => {}} style={styles.button}>
            Categorias
          </Button>
        </View>

        <View style={styles.line}>
          <View style={styles.productContainer}>
            <Text style={styles.productName}>Manzana</Text>
            <Image
              source={require("../assets/images/manzana.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Banana</Text>
            <Image
              source={require("../assets/images/banana.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Naranja</Text>
            <Image
              source={require("../assets/images/naranja.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Pera</Text>
            <Image
              source={require("../assets/images/pera.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Uva</Text>
            <Image
              source={require("../assets/images/uva.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Piña</Text>
            <Image
              source={require("../assets/images/piña.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Mango</Text>
            <Image
              source={require("../assets/images/mango.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Frutilla</Text>
            <Image
              source={require("../assets/images/frutillas.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Kiwi</Text>
            <Image
              source={require("../assets/images/kiwi.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Cereza</Text>
            <Image
              source={require("../assets/images/cereza.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Melocotón</Text>
            <Image
              source={require("../assets/images/melocoton.png")}
              style={styles.productImage}
            />
          </View>
          <View style={styles.productContainer}>
            <Text style={styles.productName}>Sandía</Text>
            <Image
              source={require("../assets/images/sandia.png")}
              style={styles.productImage}
            />
          </View>
          <View style={styles.productContainer}>
            <Text style={styles.productName}>Limón</Text>
            <Image
              source={require("../assets/images/limon.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Maracuyá</Text>
            <Image
              source={require("../assets/images/maracuya.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Coco</Text>
            <Image
              source={require("../assets/images/coco.png")}
              style={styles.productImage}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>Granada</Text>
            <Image
              source={require("../assets/images/granada.png")}
              style={styles.productImage}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  categorias: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontSize: 27,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: theme.fonts.text,
    marginBottom: 20,
  },

  line: {
    marginLeft: 20,
    padding: 10,
    marginBottom: 10,
    width: 400,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  productImage: {
    flex: 1,
    width: 140,
    height: 150,
  },
  productContainer: {
    flex: -1,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    width: 150,
    padding: 10,
  },
});
