import TabContainer from "@/src/navigation/TabContainer";
import { store } from "./store";
import { Provider } from "react-redux";
import React from "react";  

export default function index() {
  return (
    <Provider store={store}>
      <TabContainer />
    </Provider>
  );
}
