import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import CreditCard from "./CreditCard";
import * as Icon from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
import { styles as blockStyles } from "../components/Block";
import { styles as cardStyles } from "../components/Card";
import { Badge, Card, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { StackActions, NavigationActions } from "react-navigation"
import { connect } from "react-redux";
import { getCardThunk } from '../store/utilities/creditCard';
import transactions from "../mocks/transactions";
import myCharities from "../mocks/charities";
const { width } = Dimensions.get("window");


class Dashboard extends Component {
  state = {
    showModal: false,
    showCC: false,
    showTransaction: false,
    showDonationOverview: false,
    charities: [],
    creditCard: "4213 2131 2323 2321",
  };

  static navigationOptions = {
    header: null,
  };
  
  async componentDidMount() {
    this.setState({ showModal: true });
    await this.props.getCard()
    console.log(this.props.card.substring(15,19))
  }

  showModal = () => {
    this.setState({
      showCC: true,
    });
  };

  hideModal = () => {
    this.setState({
      showCC: false,
    });
  };

  newCreditCard = (number) =>{
    this.setState({
      creditCard: number
    })
  }

  renderDollarCard(navigation) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(
            "SettingsStack",
            {},
            NavigationActions.navigate({ routeName: "Settings" })
          )
        }
      >
        <Card shadow style={{ padding: 20 }}>
          <Image
            resizeMode="contain"
            source={require("../assets/icons/settings-outline.png")}
            style={styles.moreIcon}
          />
          <Block>
            <Block center>
              <Text h1 primary>
                $12.30{JSON.stringify(this.state.test)}
              </Text>
              <Text spacing={0.71}> Total Donation Amount</Text>
            </Block>

            <Block color="gray2" style={styles.hLine} />
            <Block row>
              <Block center>
                <Text
                  size={20}
                  spacing={0.6}
                  primary
                  style={{ marginBottom: 6 }}
                >
                  5
                </Text>
                <Text body spacing={0.7}>
                  African
                </Text>
                <Text body spacing={0.7}>
                  Children Saved
                </Text>
              </Block>

              <Block flex={false} color="gray2" style={styles.vLine} />

              <Block center>
                <Text
                  size={20}
                  spacing={0.6}
                  primary
                  style={{ marginBottom: 6 }}
                >
                  #1872
                </Text>
                <Text body spacing={0.7}>
                  Donation
                </Text>
                <Text body spacing={0.7}>
                  Ranking
                </Text>
              </Block>
            </Block>
          </Block>
        </Card>
      </TouchableOpacity>
    );
  }

  renderAddCC(navigation) {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showCC}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <CreditCard navigation={navigation} hide={this.hideModal} newCard={this.newCreditCard}/>
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

  renderCharities = (charity, navigation) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("SingleCharity", {
            charity,
            charityImage: charity.source,
          });
        }}
      >
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
    );
  };

  renderCC() {
    return (
      <TouchableOpacity onPress={() => this.setState({ showCC: true })}>
        <Block horizontal>
          <LinearGradient
            end={{ x: 1, y: 0 }}
            style={[blockStyles.row, cardStyles.card, styles.awards]}
            colors={["#2BDA8E", "#41cc66"]}
          >
            <Block middle flex={0.4}>
              <Badge color={rgba(theme.colors.white, "0.2")} size={74}>
                <Badge color={rgba(theme.colors.white, "0.2")} size={52}>
                  <Icon.FontAwesome
                    name="google-wallet"
                    color="white"
                    size={30}
                  />
                </Badge>
              </Badge>
            </Block>
            <Block middle>
              <Text size={theme.sizes.base} spacing={0.4} medium white>
                Active Credit Card, ending in
              </Text>
              <Text size={20} spacing={0.4} bold white>
                {this.props.card.length > 0 ? this.props.card.substring(15,19) : this.state.creditCard.substring(15,19)}
              </Text>
            </Block>
          </LinearGradient>
        </Block>
      </TouchableOpacity>
    );
  }

  render() {
    const { profile, navigation } = this.props;

    return (
      <ScrollView style={{ alignSelf: "stretch", marginTop: 15 }}>
        <View style={styles.view}>
          <View>
            <Text style={{ color: theme.colors.caption }}>Welcome Back,</Text>
            <Text style={{ fontSize: theme.sizes.font * 2 }}>Miguel</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "SettingsStack",
                {},
                NavigationActions.navigate({ routeName: "Settings" })
              )
            }
          >
            <Image style={styles.avatar} source={profile.avatar} />
          </TouchableOpacity>
        </View>
        <Block horizontal>{this.renderDollarCard(navigation)}</Block>
        {this.renderCC()}
        <Block top style={{ paddingHorizontal: theme.sizes.padding }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text spacing={0.7} transform="uppercase" style={{ marginTop: 10 }}>
              Your Charities
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Browse")}>
              <Text style={{ fontSize: 30, marginBottom: 5, marginRight: 5 }}>
                +
              </Text>
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
              data={this.state.charities}
              keyExtractor={(item, index) => `${item.id}`}
              renderItem={({ item }) => this.renderCharities(item, navigation)}
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
            <Block style={{ paddingTop: 10 }}>
              {transactions.map((t, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Transactions", { t })}
                    activeOpacity={0.7}
                  >
                    <Card shadow key={i * 1000}>
                      <Block style={{ marginBottom: theme.sizes.base }}>
                        <Block
                          row
                          space="between"
                          style={{ marginBottom: theme.sizes.base }}
                        >
                          <Text spacing={0.5} caption>
                            {t.name}
                          </Text>
                          <Text spacing={0.5} caption medium primary>
                            ${t.newTotal}
                          </Text>
                          <Text spacing={0.5} caption>
                            {t.date}
                          </Text>
                        </Block>

                        <Block space="between">
                          <Block row space="between">
                            <Text> Transaction Price</Text>
                            <Text> Change</Text>
                          </Block>
                          <Block row space="between">
                            <Block style={{ marginRight: 170 }} row center>
                              <Badge
                                color={rgba(theme.colors.accent, "0.2")}
                                size={14}
                                style={{ marginRight: 10 }}
                              >
                                <Badge color={theme.colors.accent} size={8} />
                              </Badge>
                              <Text
                                style={{ fontSize: 20 }}
                                spacing={0.5}
                                color="gray"
                              >
                                ${t.transactionPrice}
                              </Text>
                            </Block>
                            <Block row center>
                              <Badge
                                color={rgba(theme.colors.primary, "0.2")}
                                size={14}
                                style={{ marginRight: 10 }}
                              >
                                <Badge color={theme.colors.primary} size={8} />
                              </Badge>
                              <Text
                                style={{ fontSize: 20 }}
                                spacing={0.5}
                                color="gray"
                              >
                                ${t.price}
                              </Text>
                            </Block>
                          </Block>
                        </Block>
                      </Block>
                    </Card>
                  </TouchableOpacity>
                );
              })}
              <Button gradient>
                <Text white center>
                  See More
                </Text>
              </Button>
            </Block>
          </Block>
        </ScrollView>
        {this.renderDonationMessage()}
        {this.renderAddCC(navigation)}
      </ScrollView>
    );
  }
}

const mapState = (state) => {
	return {
		card: state.creditCard
	}
}

const mapDispatch = (dispatch) => {
	return {
		getCard: () => dispatch(getCardThunk())
	}
}

export default connect(mapState, mapDispatch)(Dashboard);

Dashboard.defaultProps = {
  profile: mocks.profile,
};

const styles = StyleSheet.create({
  charityStatus: {
    marginRight: theme.sizes.base,
    width: width / 2.568,
    height: 170,
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
    marginBottom: theme.sizes.base,
  },
  vLine: {
    marginVertical: theme.sizes.base,
    width: 1,
  },
  hLine: {
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 0.5,
    height: 1,
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: "absolute",
    right: theme.sizes.base,
    top: theme.sizes.base,
  },
});
