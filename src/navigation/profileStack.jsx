import React from 'react';
import ProfileScreen from '@/Screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Perfil" component={ProfileScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
