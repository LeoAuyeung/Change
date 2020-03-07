import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import LottieView from "lottie-react-native";
// import from "../assets/lottie/checkAnimation.json";

export default class DonateSuccess extends Component {
  state = {
    errors: [],
    loading: false,
    value: "0",
  };

  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    // this.animation.play();
  };


  handleReturn() {
    const { navigation } = this.props;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    //

    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate("Browse");
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors, value } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2], 50}>
          <Text h1 bold center>
            Success!
          </Text>
          <View style={styles.animationContainer}>
            <LottieView
            ref={animation => {
                this.animation = animation;
            }}
            style={{
                width: 300,
                height: 300,
                backgroundColor: '#fff',
            }}
            source={require('../assets/lottie/checkAnimation.json')}
            loop={false}
            // OR find more Lottie files @ https://lottiefiles.com/featured
            // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
            />
            </View>
            <Text h1 bold center
                style={{
                    marginTop: 50,
                    marginBottom: 10
                }} 
            >
                You just donated $50.00 to the American Red Cross!
            </Text>
          <Block middle>
            <Button gradient onPress={() => this.handleReturn()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Return to home
                </Text>
              )}
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  animationContainer: {
      width: '100%',
      height: '50%',
      alignItems: 'center',
  }
});
