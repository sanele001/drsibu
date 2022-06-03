import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Landing from "./screens/landing";
import Mainstack from "./navigation/stacknav";

export default function App() {
  useEffect(() => {
    loadFonts();
  });

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
