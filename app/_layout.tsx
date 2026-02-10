import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { Text, View } from "react-native";
import "react-native-reanimated";

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
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return <Slot />;
}
