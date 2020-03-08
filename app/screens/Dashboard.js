import React, { Component } from "react";
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
import { StackActions, NavigationActions } from "react-navigation";

const { width } = Dimensions.get("window");

export default class Dashboard extends Component {
  state = {
    showModal: false,
    showCC: false,
    showTransaction: false,
    showDonationOverview: false,
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.setState({ showModal: true });
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
                $12.30
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
        <CreditCard navigation={navigation} />
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
            charityImage: charity.image,
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
                8864
              </Text>
            </Block>
          </LinearGradient>
        </Block>
      </TouchableOpacity>
    );
  }

  render() {
    const { profile, navigation } = this.props;

    const transactions = [
      {
        id: 1,
        name: "Beyond Burger",
        category: "Food",
        source:
          "https://images.unsplash.com/photo-1582125775166-2eb4da2fbf1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1783&q=80",
        date: "11/10/2020",
        newTotal: "12.30",
        price: 0.8,
        transactionPrice: 7.2,
        paid: 8.0,
      },
      {
        id: 1,
        name: "Microwave",
        category: "Appliances",
        source:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/610ptyvekxl-sl1000-1563196528.jpg?crop=1.00xw:0.502xh;0,0.200xh&resize=1200:*",
        date: "11/10/2020",
        newTotal: "11.50",
        price: 0.7,
        transactionPrice: 42.3,
        paid: 43.0,
      },
      {
        id: 1,
        name: "Starbucks Coffee",
        category: "Food",
        source:
          "https://cdn.vox-cdn.com/thumbor/KbnTFp7Bwl7jn5Jssu-IffIstoM=/0x0:6000x4000/1200x800/filters:focal(1463x1566:2423x2526)/cdn.vox-cdn.com/uploads/chorus_image/image/65808525/shutterstock_1391647442.0.jpg",
        date: "11/10/2020",
        newTotal: "10.80",
        price: 0.74,
        transactionPrice: 3.26,
        paid: 4.0,
      },
    ];

    const myCharities = [
      {
        id: 1,
        name: "Team Trees",
        mission:
          "More than 800,000 people joined #TeamTrees by raising more than $20 million to plant 20 million trees around the world. Wondering where those trees are being planted? Check out the locations for the first trees below.",
        icon: require("../assets/images/teamtrees.jpg"),
        image: "https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/72634507_1430880343747588_3676343023645376761_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Gg21Cxj1KRMAX_A4qua&oh=35579bce4e0b02b01993f5e1c917ea55&oe=5E8E6F5E",
        description: "Championed by Mr B...",
      },
      {
        id: 2,
        name: "Direct Relief",
        mission: "Direct Relief is a humanitarian aid organization, active in all 50 states and more than 80 countries, with a mission to improve the health and lives of people affected by poverty or emergencies – without regard to politics, religion, or ability to pay.\n",
        icon: require("../assets/images/corona.png"),
        image: "https://i1.wp.com/www.directrelief.org/wp-content/uploads/2020/01/0131_2-scaled-e1580492018941.jpg?resize=800%2C450px&ssl=1",
        description: "Corona Virus ef...",
      },
      {
        id: 3,
        name: "Red Cross",
        icon: require("../assets/images/redcross.jpg"),
        image: "https://www.redcross.org/content/dam/redcross/uncategorized/12/Vol-Banner-volunteer-looking-at-fire-1534x1198.jpg.transform/768/q70/feature/image.jpeg",
        description: "Hospitals around the worl...",
      },
    ];

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
              data={myCharities}
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
                    <Card shadow key={i}>
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
