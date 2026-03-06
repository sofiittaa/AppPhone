import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../Screens/HomeScreen";
import ProductsScreen from "../../Screens/ProductsScreen";
import ViewContainer from "../../Screens/ViewScreen";

const Stack = createNativeStackNavigator();
export default (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Productos" component={ProductsScreen} />
    <Stack.Screen name="Carrito" component={ProductsScreen} />
    <Stack.Screen name="Perfil" component={ProductsScreen} />
    <Stack.Screen name="Vista" component={ViewContainer} />
  </Stack.Navigator>
);
