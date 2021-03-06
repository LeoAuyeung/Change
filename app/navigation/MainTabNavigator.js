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
import CreditCard from "../screens/CreditCard";
import Success from "../screens/Success";
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
    Dashboard,
    Product,
    CreditCard,
    Success
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back2xn.png")} />,
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
  let routesToNotShowNavTabs = ["Welcome", "SignUp", "Login", "Forgot", "Success", "DonateSuccess"];

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
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-home`
            : "md-home"
        }
      />
    )
  };
};

MainStack.path = "";

const CharityStack = createStackNavigator(
  {
    Charity,
    SingleCharity,
    Donate,
    DonateSuccess,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back2xn.png")} />,
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

CharityStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'DonateSuccess' ) {
      tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarLabel: "Charities",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-heart`
            : "md-heart"
        }
      />
    ),
  };
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
      headerBackImage: <Image source={require("../assets/icons/back2xn.png")} />,
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
