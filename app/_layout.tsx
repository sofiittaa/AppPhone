import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { Text, View , Image , StyleSheet} from "react-native";
import "react-native-reanimated";
import { theme } from "../constants/theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    FrauncesMedium: require("../assets/fonts/Fraunces_72pt-SemiBold.ttf"),
    QuicksandRegular: require("../assets/fonts/Quicksand-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <Image source={require("../assets/images/logo.png")} style={styles.logo}/>
        <Text style={styles.titulo}>
          Supermercado Fire Way
        </Text>

      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
  },  
  titulo: {
    color: theme.colors.primary,
    fontSize: 25,
    marginLeft: 10,
    marginTop: 25,
    fontFamily: "FrauncesMedium",
  },
})




