import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserProfilePictureQuery } from "../services/userServices";
import AuthStack from "./AuthStack";
import TabContainer from "./TabContainer";

export const RootStack = () => {
    const user = useSelector((state) => state.authReducer.value.email);
    const localId = useSelector((state) => state.authReducer.value.localId);

    const { useGetUserProfileQuery, isLoading, error } =
        useGetUserProfilePictureQuery;

    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image));
        }
    });
    
  return (
    <NavigationContainer>
      {user ? <TabContainer /> : <AuthStack />}
    </NavigationContainer>
  );
};
