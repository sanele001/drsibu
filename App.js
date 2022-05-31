import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

import { StyleSheet, Text, View } from "react-native";

import Mycalendar from "./screens/calender";
import Home from "./screens/home";

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
    <View>
      <Home />
    </View>
  );
}
