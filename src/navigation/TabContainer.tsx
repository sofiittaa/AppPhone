import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../../Screens/CartScreen";
import HomeScreen from "../../Screens/HomeScreen";
import ProductsScreen from "../../Screens/ProductsScreen";
import ViewScreen from "../../Screens/ViewScreen";
import ProfileStack from "./profileStack";
import { AppNavigationParamList } from "./types";

const Tab = createBottomTabNavigator<AppNavigationParamList>();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#ebe7e7",
          height: 70,
          position: "absolute",
          bottom: 15,
          left: 15,
          right: 15,
          borderRadius: 20,
          borderTopWidth: 2,
          borderTopColor: "rgba(0, 0, 0, 0.08)",

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 20,
        },
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
          fontWeight: "bold",
          color: theme.colors.primary,
        },
      })}
    >
      <Tab.Screen name="Casa" component={HomeScreen} />
      <Tab.Screen name="Productos" component={ProductsScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
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
