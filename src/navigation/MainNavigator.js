import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthStack from "./AuthStack";
import TabContainer from "./TabContainer";

const MainNavigator = () => {
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabContainer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
