import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Product from "../screens/Product";
import Settings from "../screens/Settings";
import Donate from "../screens/Donate";
import DonateSuccess from "../screens/DonateSuccess";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const MainStack = createStackNavigator(
  {
    Welcome,
    Login,
    SignUp,
    Forgot,
    Explore,
    Browse,
    Product,
    Settings,
    Donate,
    DonateSuccess
  },
  config
);

MainStack.navigationOptions = {
  tabBarLabel: "Main",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

MainStack.path = "";

const CharityStack = createStackNavigator(
  {
    Explore
  },
  config
);

CharityStack.navigationOptions = {
  tabBarLabel: "Charity",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

CharityStack.path = "";

const NewsStack = createStackNavigator(
  {
    Settings
  },
  config
);

NewsStack.navigationOptions = {
  tabBarLabel: "News",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

NewsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  MainStack,
  CharityStack,
  NewsStack
});

tabNavigator.path = "";

export default tabNavigator;
