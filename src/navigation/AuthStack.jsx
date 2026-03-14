import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
