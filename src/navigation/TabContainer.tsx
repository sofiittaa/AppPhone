import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../../Screens/CartScreen";
import HomeScreen from "../../Screens/HomeScreen";
import PerfilScreen from "../../Screens/PerfilScreen";
import ProductsScreen from "../../Screens/ProductsScreen";
import ViewScreen from "../../Screens/ViewScreen";
import { AppNavigationParamList } from "./types";

const Tab = createBottomTabNavigator<AppNavigationParamList>();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarIcon: ({ focused }) => {
          const iconName =
            route.name === "Casa"
              ? focused
                ? "home"
                : "home-outline"
              : route.name === "Productos"
                ? focused
                  ? "fast-food"
                  : "fast-food-outline"
                : route.name === "Carrito"
                  ? focused
                    ? "cart"
                    : "cart-outline"
                  : focused
                    ? "person"
                    : "person-outline";

          return (
            <Ionicons
              name={iconName}
              size={30}
              color={focused ? theme.colors.primary : theme.colors.secondary}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontFamily: theme.fonts.text,
        },
      })}
    >
      <Tab.Screen name="Casa" component={HomeScreen} />
      <Tab.Screen name="Productos" component={ProductsScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen
        name="vista"
        component={ViewScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
