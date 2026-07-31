import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";

const CategoryItem = ({
  item,
  selected,
  onPress,
}: {
  item: any;
  selected?: boolean;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.productContainer, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View
        style={[styles.imageWrapper, selected && styles.imageWrapperSelected]}
      >
        <Image
          source={{ uri: item.imagen }}
          style={styles.categoryImage}
          resizeMode="contain"
        />
      </View>

      <Text
        style={[styles.categoryText, selected && styles.categoryTextSelected]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  productContainer: {
    width: 76,
    alignItems: "center",
    marginRight: 14,
  },
  pressed: {
    opacity: 0.7,
  },
  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  imageWrapperSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  categoryImage: {
    width: 40,
    height: 40,
  },
  categoryText: {
    fontSize: 13,
    fontFamily: theme.fonts.text,
    fontWeight: "600",
    color: theme.colors.text,
    marginTop: 6,
    textAlign: "center",
  },
  categoryTextSelected: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
