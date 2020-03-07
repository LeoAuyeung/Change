import React, { Component } from "react";
import CreditCard from "./CreditCard";
import {
  Dimensions,
  ScrollView,
  FlatList,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import rgba from "hex-to-rgba";
import { Badge, Card, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const { width } = Dimensions.get("window");
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
          margin={[320, 0, 0, 0]}
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

          <Block
            margin={[-1100, 0, 0, 0]}
            middle
            padding={[theme.sizes.base / 2, 0]}
          >
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

  renderCharities = charity => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {
      }}>
        <Card shadow style={styles.charityStatus}>
          <Image
            source={charity.icon}
            style={styles.charityIcon}
            resizeMode="contain"
          />
          <Text
            title
            transform="capitalize"
            // accent={drive.status === "bad"}
            // tertiary={drive.status === "fair"}
            primary
            height={22}
          >
            {charity.name}
          </Text>

          <Text transform="capitalize" spacing={0.7}>
            {charity.description}
          </Text>
        </Card>
      </TouchableOpacity>
    )
  }

  render() {
    const { profile, navigation } = this.props;

    const transactions = [
      {
        id: 1,
        name: "Trader Joes Coffee",
        change: 0.36,
      },
    ];

    const myCharities = [
      {
        id: 1,
        name: "Team Trees",
        icon: require('../assets/images/teamtrees.jpg'),
        description: "Championed by Mr B..."
      },
      {
        id: 2,
        name: "Direct Relief",
        icon: require('../assets/images/corona.png'),
        description: "Corona Virus ef..."
      },
      {
        id: 3,
        name: "Red Cross",
        icon: require('../assets/images/redcross.jpg'),
        description: "Hospitals around the worl..."
      },
    ];

    return (
      <ScrollView style={{ alignSelf: "stretch" }}>
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
        {this.renderDollarCard()}
        <Card shadow horizontal>
          <Block>
            <Block center horizontal>
              <Text h3>
                Credit Card ending in <Text h2 bold primary> 8231 </Text>
              </Text>
            </Block>
            <TouchableOpacity onPress={() => this.setState({ showCC: true })}>
              <Text> Add Credit Card </Text>
            </TouchableOpacity>
          </Block>
        </Card>
        <Block top style={{ paddingHorizontal: theme.sizes.padding}}>
          <View style={{ flex:1, flexDirection: "row", justifyContent: "space-between"}}>
            <View>
              <Text spacing={0.7} transform="uppercase" style={{ marginBottom: 10  }}>
              Your Charities
              </Text>
            </View>
            <TouchableOpacity>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
            <Block>
            <FlatList
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              scrollEventThrottle={16}
              style={{ overflow: "visible" }}
              data={myCharities}
              keyExtractor={(item, index) => `${item.id}`}
              renderItem={({ item }) => this.renderCharities(item)}
            />
          </Block>
        </Block>
        <ScrollView
          style={{ marginBottom: 5, paddingHorizontal: theme.sizes.padding }}
        >
          <Text spacing={0.4} transform="uppercase">
            Recent Transactions
          </Text>
          <Block>
            <Block style={{ paddingHorizontal: 10 }}>
              {transactions.map(t => {
                return (
                  <Card shadow key={`transaction-${t.id}`}>
                    <Block
                      row
                      space="between"
                      style={{ marginBottom: theme.sizes.base }}
                    >
                      <Block
                        row
                        space="between"
                        style={{ marginBottom: theme.sizes.base }}
                      >
                        <Text spacing={0.5} caption>
                          {t.name}
                        </Text>
                        <Text spacing={0.5} caption medium primary>
                          hello
                        </Text>
                        <Text spacing={0.5} caption>
                          123
                        </Text>
                      </Block>
                      <Block row center>
                        <Badge
                          color={rgba(theme.colors.accent, "0.2")}
                          size={14}
                          style={{ marginRight: 8 }}
                        >
                          <Badge color={theme.colors.accent} size={8} />
                        </Badge>
                        <Text spacing={0.5} color="gray">
                          from
                        </Text>
                      </Block>

                      <Block row center style={{ paddingVertical: 4 }}>
                        <Badge
                          color="gray2"
                          size={4}
                          style={{ marginLeft: 4.5 }}
                        />
                      </Block>

                      <Block row center>
                        <Badge
                          color={rgba(theme.colors.primary, "0.2")}
                          size={14}
                          style={{ marginRight: 8 }}
                        >
                          <Badge color={theme.colors.primary} size={8} />
                        </Badge>
                        <Text spacing={0.5} color="gray">
                          to
                        </Text>
                      </Block>
                    </Block>
                  </Card>
                );
              })}
            </Block>
          </Block>
        </ScrollView>
        {this.renderDonationMessage()}
        {this.renderAddCC()}
      </ScrollView>
    );
  }
}

Dashboard.defaultProps = {
  profile: mocks.profile,
};

const styles = StyleSheet.create({
  charityStatus: {
    marginRight: theme.sizes.base,
    width: width / 2.568,
    height: 170
  },
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
  charityIcon: {
    height: 50,
    marginRight: 20,
    marginBottom: theme.sizes.base
  },
});
