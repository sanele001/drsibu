import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../brand";
import Icon from "react-native-vector-icons/Feather";
import Home from "../screens/home";
import Mycalendar from "../screens/calender";
import Analysis from "../screens/analysis";
import Content from "../screens/content";
const Tab = createBottomTabNavigator();

export default function Btabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={colors.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Mycalendar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={colors.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="pie-chart" color={colors.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Content"
        component={Content}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={colors.primary} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
