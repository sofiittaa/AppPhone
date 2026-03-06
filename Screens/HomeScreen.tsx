import ModalItem from "@/components/HomeItem";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView>
      <View>
        <ModalItem />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
