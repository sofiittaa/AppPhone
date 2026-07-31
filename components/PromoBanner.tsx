import { useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";

const PROMOS = [
  { id: "1", titulo: "Envío gratis", subtitulo: "¡En compras desde $1000!" },
  { id: "2", titulo: "2x1 en bebidas", subtitulo: "¡Para usuarios nuevos!" },
  {
    id: "3",
    titulo: "Retirá en tienda",
    subtitulo: "¡En cualquiera de nuestras sucursales!",
  },
];

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width - 30;

const PromoBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SLIDE_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={PROMOS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SLIDE_WIDTH }]}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.subtitulo}>{item.subtitulo}</Text>
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {PROMOS.map((item, index) => (
          <View
            key={item.id}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default PromoBanner;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  slide: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    padding: 20,
    height: 100,
    justifyContent: "center",
  },
  titulo: {
    color: theme.colors.background,
    fontSize: 20,
    fontFamily: theme.fonts.title,
    fontWeight: "bold",
  },
  subtitulo: {
    color: theme.colors.text2,
    fontSize: 14,
    fontFamily: theme.fonts.text,
    marginTop: 4,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.secondary,
    opacity: 0.3,
    marginHorizontal: 4,
  },
  dotActive: {
    opacity: 1,
  },
});
