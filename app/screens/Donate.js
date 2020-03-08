import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import NumericInput from "@wwdrew/react-native-numeric-textinput";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Donate extends Component {
  state = {
    errors: [],
    loading: false,
    value: "0"
  };

  handleDonate(charityName) {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    //

    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate("DonateSuccess", {
        charity: charityName,
        donationAmount: this.state.value
      });
    }
  }

  render() {
    const { navigation } = this.props;
    let { charity, charityImage } = navigation.state.params;
    const { loading, errors, value } = this.state;
    if (charity.image) {
      charityImage = {
        uri: charity.image
      };
    }
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <DismissKeyboard>
        <KeyboardAvoidingView style={styles.login} behavior="padding">
          <Block padding={[50, theme.sizes.base * 2]}>
            <View>
              <Text h1 bold>
                Donate directly
              </Text>
              <Text h3 style={styles.charityName}>
                {charity.charityName}
              </Text>
            </View>
            <Image
              source={charityImage}
              style={[styles.charityLogo]}
              resizeMode="contain"
            />
            <Block>
              <Text h3>Amount (USD)</Text>
              <NumericInput
                type="currency"
                decimalPlaces={2}
                value={value}
                currency="USD"
                locale="en-US"
                onUpdate={value => this.setState({ value: value })}
                style={styles.label}
              />
              <Text caption styles={styles.minimumDonation} on>
                There is a minimum donation of $1.
              </Text>
              <Button
                style={styles.donateButton}
                gradient
                onPress={() => this.handleDonate(charity.charityName)}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Donate
                  </Text>
                )}
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </DismissKeyboard>
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
  label: {
    borderColor: "black",
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
    maxWidth: "30%"
  },
  minimumDonation: {
    marginBottom: 25
  },
  charityName: {
    marginTop: 10
  },
  charityLogo: {
    width: "100%",
    height: 200,
    marginVertical: 50
  },
  donateButton: {
    marginTop: 30
  }
});
