import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

import { StyleSheet, Text, View, AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Mainstack from "./navigation/stacknav";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    loadFonts();

    ///
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Poppins: require("./assets/Poppins-Light.ttf"),
    });
  }

  let [fontsLoaded] = useFonts({
    "Poppins-Light": require("./assets/Poppins-Light.ttf"),
  });
  return (
    <NavigationContainer>
      <Mainstack />
    </NavigationContainer>
  );
}
