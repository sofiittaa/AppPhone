import { theme } from "@/constants/theme";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ModalItem = () => {
  return (
    <View>
      <Image
        source={require("../assets/images/super.png")}
        style={styles.imagen}
      />
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.Title}>Supermercado Fire Way</Text>
        <Text style={styles.SobreTitle}> La mejor calidad al mejor precio</Text>
      </View>
      <View style={styles.paquete1}>
        <Text style={styles.membersTitle}>Membresia de oro</Text>
        <Text style={styles.membersText}>Tarjeta "Membresia de Oro" </Text>
        <Text style={styles.membersText}>Descuentos en todos los productos</Text>
        <Text style={styles.membersText}>Envio gratis a todo el pais</Text>
        <View style={styles.contentBuy}>
          <Text style={styles.membersText2}>Por tan solo 5100$ al mes </Text>
          <Pressable onPress={() => {}} style={styles.membersButton}>
            <Text style={{ color: theme.colors.background, fontSize: 15 }}>
              Comprar
            </Text>
          </Pressable>
        </View>
      </View>
       <View style={styles.paquete2}>
        <Text style={styles.membersTitle}>Membresia de Plata</Text>
        <Text style={styles.membersText}>Tarjeta "Membresia de Plata" </Text>
        <Text style={styles.membersText}>Descuentos en productos de: limpieza y cuidado personal</Text>
        <Text style={styles.membersText}>Envios gratis de 9hs a 17hs</Text>

        <View style={styles.contentBuy}> 
          <Text style={styles.membersText2}>Por tan solo 3490$ al mes </Text>
          <Pressable onPress={() => {}} style={styles.membersButton}>
            <Text style={{ color: theme.colors.background, fontSize: 15 }}>
              Comprar
            </Text>
          </Pressable>
        </View>
      </View>
       <View style={styles.paquete3}>
        <Text style={styles.membersTitle}>Membresia de Bronce</Text>
        <Text style={styles.membersText}>Tarjeta "Membresia de Bronce" </Text>
        <Text style={styles.membersText}>Descuentos en productos de: alimentación y bebidas</Text>
        <Text style={styles.membersText}>Envio por tan solo 59$</Text>
        <View style={styles.contentBuy}>
          <Text style={styles.membersText2}>Por tan solo 1700$ al mes </Text>
          <Pressable onPress={() => {}} style={styles.membersButton}>
            <Text style={{ color: theme.colors.background, fontSize: 15 }}>
              Comprar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ModalItem;
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: theme.colors.background,
    width: 412,
    height: 100,
    marginTop: -15,
    borderRadius: 15,
  },
  Title: {
    color: theme.colors.primary,
    fontSize: 30,
    marginLeft: 10,
    fontFamily: theme.fonts.title,
  },
  SobreTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.text,
    marginTop: 5,
    marginLeft: 10,
  },
  imagen: {
    width: 412,
    height: 200,
    marginTop: 20,
    borderRadius: 15,
  },

  logo: {
    width: 120,
    height: 120,
    marginTop: -60,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 15,
  },

  paquete1: {
    marginTop: 30,
    marginLeft: 25,
    width: 360,
    height: 220,
    borderRadius: 20,
    borderColor: theme.colors.text,
    borderWidth: 2,
  },
  paquete2: {
    marginTop: 30,
    marginLeft: 25,
    width: 360,
    height: 240,
    borderRadius: 20,
    borderColor: theme.colors.text,
    borderWidth: 2,
  },
  paquete3: {
    marginTop: 30,
    marginLeft: 25,
    width: 360,
    height: 240,
    borderRadius: 20,
    borderColor: theme.colors.text,
    borderWidth: 2,
    marginBottom: 30,
  },
  membersTitle: {
    textAlign: "center",
    color: theme.colors.primary,
    fontSize: 25,
    fontFamily: theme.fonts.title,
    marginTop: 10,
  },

  membersText: {
    textAlign: "center",
    color: theme.colors.text,
    paddingTop: 10,
    fontSize: 16,
    fontFamily: theme.fonts.text,
  },
  membersText2: {
    textAlign: "center",
    color: theme.colors.text,
    paddingTop: 5,
    fontSize: 18,
    fontFamily: theme.fonts.text,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },
  membersButton: {
    borderRadius: 25,
    width: 110,
    height: 40,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },

  contentBuy: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },

  
});
