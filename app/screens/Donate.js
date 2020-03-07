import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import NumericInput from "@wwdrew/react-native-numeric-textinput";

export default class Donate extends Component {
  state = {
    errors: [],
    loading: false,
    value: "0",
  };

  handleDonate() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    //

    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate("DonateSuccess");
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors, value } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Donate directly
          </Text>
          <Text h3>
              Charity: American Red Cross
          </Text>
          <Block middle>
          <Text>
              
          </Text>
            <Text h3>Amount (USD)</Text>
            <NumericInput
                type='currency'
                decimalPlaces={2}
                value={value}
                currency="USD"
                locale="en-US"
                onUpdate={(value) => this.setState({value: value})}
                // style={styles.label}
            />
            <Button gradient onPress={() => this.handleDonate()}>
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
  }
});
