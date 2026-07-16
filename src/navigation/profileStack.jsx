import OrderDetailScreen from "@/Screens/OrderDetailScreen";
import ProfileScreen from "@/Screens/ProfileScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Perfil" component={ProfileScreen} />
    <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
