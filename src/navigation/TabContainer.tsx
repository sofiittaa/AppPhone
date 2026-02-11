import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../Screens/HomeScreen";
import ProductsScreen from "../../Screens/ProductsScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarIcon: ({ color, size, focused }) => {
          const iconName = route.name === "Home" ? "home" : "fast-food-outline";
          return (
            <Ionicons
              name={iconName}
              color={focused ? theme.colors.primary : theme.colors.secondary}
              size={27}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
