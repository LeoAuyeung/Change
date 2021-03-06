import React from "react";
import { Platform, StatusBar, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Provider } from "react-redux";
import store from './store';
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import AppNavigator from "./navigation/AppNavigator";

console.disableYellowBox = true;

// import all used images
const images = [
  require("./assets/icons/back.png"),
  require("./assets/images/illustration_1.png"),
  require("./assets/images/illustration_2.png"),
  require("./assets/images/illustration_3.png"),
  require("./assets/images/donate_1.png"),
  require("./assets/images/donate_2.png"),
  require("./assets/images/donate_3.png")
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  handleResourcesAsync = async () => {

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
