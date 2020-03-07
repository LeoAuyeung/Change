import React, { Component } from "react";
import CreditCard from "./CreditCard";
import {
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Card, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";

export default class Dashboard extends Component {
  state = {
    showModal: false,
    showCC: false,
  };

  componentDidMount() {
    this.setState({ showModal: true });
  }

  renderDollarCard() {
    return (
      <Card>
        <Block>
          <Block center>
            <Text h1 primary>
              {" "}
              $11.71{" "}
            </Text>
            <Text spacing={0.71}> Total Donation Amount</Text>
          </Block>
        </Block>
      </Card>
    );
  }

  renderAddCC() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showCC}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <CreditCard />
      </Modal>
    );
  }

  renderDonationMessage() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showModal}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h1 bold style={{ textDecorationLine: "underline" }}>
            Milestone
          </Text>
          <Text center h2>
            Your Donations exceeded $1,000,000!{" "}
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              h3
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            ></Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showModal: false })}
            >
              <Text white center>
                OK
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  render() {
    const { profile, navigation } = this.props;

    const transactions = [
      {
        name: "Trader Joes Coffee",
        change: 0.36,
      },
    ];

    return (
      <Block style={{ alignSelf: "stretch" }}>
        <View style={styles.view}>
          <View>
            <Text style={{ color: theme.colors.caption }}>Welcome Back,</Text>
            <Text style={{ fontSize: theme.sizes.font * 2 }}>Tony</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://randomuser.me/api/portraits/women/32.jpg",
              }}
            />
          </TouchableOpacity>
        </View>
        <Card shadow>
          <TouchableOpacity onPress={() => this.setState({ showCC: true })}>
            <Text> Hello </Text>
          </TouchableOpacity>
        </Card>
        <Block top>
          <Text style={[styles.header, { paddingLeft: 16 }]}>
            Your Charities
          </Text>
          <Card shadow>
            <Block>
              <Text> Hello </Text>
            </Block>
          </Card>
        </Block>
        {transactions.map(t => {
          return <Text>{t.name}</Text>;
        })}
        {this.renderDonationMessage()}
        {this.renderAddCC()}
      </Block>
    );
  }
}

Dashboard.defaultProps = {
  profile: mocks.profile,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: "space-between",
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: theme.sizes.padding,
  },
  header: {
    fontSize: 24,
  },
});
