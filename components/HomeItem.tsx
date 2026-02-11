import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SearchVar from "../components/SearchVar";
import { theme } from "../constants/theme";

const HomeItem = () => {
  return (
    <View>
      <View style={styles.NavBar}>
        <SearchVar />
      </View>

      <View style={styles.FirstContainer}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.Title}>Supermercado Fire Way</Text>
        </View>
        <Text style={styles.SobreTitle}> La mejor calidad al mejor precio</Text>
      </View>
    </View>
  );
};

export default HomeItem;

const styles = StyleSheet.create({
  NavBar: {
    backgroundColor: theme.colors.primary,
    width: 390,
    height: 120,
    borderRadius: 15,
    marginTop: 25,
    marginLeft: 10,
    flex: -1,
  },

  container: {
    marginBottom: 20,
    width: 412,
    height: 100,
    marginTop: 15,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Title: {
    color: theme.colors.primary,
    fontSize: 25,
    marginLeft: 10,
    marginTop: 25,
    fontFamily: theme.fonts.title,
  },
  SobreTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.text,
    marginTop: -40,
    marginLeft: 120,
  },

  logo: {
    width: 80,
    height: 80,
    marginTop: 55,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  FirstContainer: {
    marginTop: 30,
    marginLeft: 10,
    backgroundColor: "#a4a4a45e",
    width: 390,
    height: 120,
    borderRadius: 15,
  },
});
