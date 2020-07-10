import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import store from "./src/app/store";
import { loadSession } from "./src/auth";
import RootNavigator from "./src/navigation/RootNavigator";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  store.dispatch(loadSession());

  return isReady ? (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  ) : null;
};

export default App;
