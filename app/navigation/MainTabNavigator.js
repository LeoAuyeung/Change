import React from "react";
import { Platform, View, Text, Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Transactions from '../screens/Transactions';
import Dashboard from "../screens/Dashboard";
import Forgot from "../screens/Forgot";
import Product from "../screens/Product";
import Settings from "../screens/Settings";
import Donate from "../screens/Donate";
import DonateSuccess from "../screens/DonateSuccess";
import Charity from "../screens/Charity";
import SingleCharity from "../screens/SingleCharity";

import { theme } from "../constants";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const MainStack = createStackNavigator(
  {
    Welcome,
    Login,
    SignUp,
    Forgot,
    Transactions,
    Explore,
    Dashboard,
    Product,
    Donate,
    DonateSuccess
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
);

MainStack.navigationOptions = ({ navigation }) => {
  let routesToNotShowNavTabs = ["Welcome", "SignUp", "Login", "Forgot"];

  let tabBarVisible;

  if (navigation.state.routes.length > 0) {
    navigation.state.routes.map(route => {
      if (routesToNotShowNavTabs.includes(route.routeName)) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
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
};

MainStack.path = "";

const CharityStack = createStackNavigator(
  {
    Charity,
    SingleCharity
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
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
  ),
};

CharityStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-settings`
          : "md-settings"
      }
    />
  ),
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    MainStack,
    CharityStack,
    SettingsStack,
  },
  {
  }
);

tabNavigator.path = "";

export default tabNavigator;
