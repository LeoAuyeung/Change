import React, { Component } from "react";
import { StyleSheet, View, Switch } from "react-native";
import { Block, Button, Text } from "../components";
import { theme, mocks } from "../constants";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";

const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});

export default class CreditCard extends Component {
  state = { useLiteCreditCardInput: false };

  _onChange = formData => console.log(JSON.stringify(formData, null, " "));
  _onFocus = field => console.log("focusing", field);
  _setUseLiteCreditCardInput = useLiteCreditCardInput =>
    this.setState({ useLiteCreditCardInput });

  render() {
    return (
      <View style={s.container}>
        <Block middle margin={[20]} padding={[theme.sizes.base / 2, 0]}>
          <Button gradient onPress={() => this.props.hide()}>
            <Text white center>
              Go Back
            </Text>
          </Button>
        </Block>
        <Switch
          style={s.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput}
        />

        {this.state.useLiteCreditCardInput ? (
          <LiteCreditCardInput
            autoFocus
            inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onFocus={this._onFocus}
            onChange={this._onChange}
          />
        ) : (
          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            requiresPostalCode
            cardScale={1.0}
            labelStyle={s.label}
            inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onFocus={this._onFocus}
            onChange={this._onChange}
          />
        )}
      </View>
    );
  }
}
