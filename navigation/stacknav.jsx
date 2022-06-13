import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/landing";
import Form from "../screens/form";
import Btabs from "./bottomtabs";
import More from "../screens/more";
const Stack = createNativeStackNavigator();

function Rootstack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Rootone" component={Landing} />
      <Stack.Screen name="tabs" component={Btabs} />
    </Stack.Navigator>
  );
}

export default function Mainstack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Rootstack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Form}
        options={{ title: "Cycle Details" }}
      />
      <Stack.Screen
        name="More"
        component={More}
        options={{ title: "Cycle history" }}
      />
    </Stack.Navigator>
  );
}
