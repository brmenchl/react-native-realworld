import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Routes } from "../navigation";
import { getIsLoggedIn } from "./selectors";

export const useAuthOnly = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate(Routes.Login);
    }
  }, [isLoggedIn, navigation]);
};

export const useUnAuthOnly = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate(Routes.Home);
    }
  }, [isLoggedIn, navigation]);
};
