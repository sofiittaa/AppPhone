const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../Screens/HomeScreen";
import ProductsScreen from "../../Screens/ProductsScreen";

export default (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Productos" component={ProductsScreen} />
  </Stack.Navigator>
);
