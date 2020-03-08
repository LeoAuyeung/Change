import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import axios from "axios";
import { Card, Title, Paragraph } from "react-native-paper";
import { Block, Text } from "../components";
import { theme } from "../constants";

const { width } = Dimensions.get("window");

const charityImages = [
  require("../assets/images/planting-fields-foundation.png"),
  require("../assets/images/brooklyn-botanic-garden.png"),
  require("../assets/images/prospect-park-alliance.png"),
  require("../assets/images/EnvironmentalDefenseFund.png"),
  require("../assets/images/horticultural-society-of-new-york.png"),
  require("../assets/images/national-audobon-society.png"),
  require("../assets/images/new-york-botanical-garden.png"),
  require("../assets/images/natural-resources-defense-council.png"),
  require("../assets/images/grow-nyc.png"),
  require("../assets/images/project-for-public-spaces.png"),
  require("../assets/images/central-park-conservancy.png"),
  require("../assets/images/riverkeeper.jpg"),
  require("../assets/images/rainforest-alliance.png"),
  require("../assets/images/riverside-park-conservancy.png"),
  require("../assets/images/city-parks-foundation.png"),
];

class Charity extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      charities: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    try {
      let { data } = await axios.get(
        `https://api.data.charitynavigator.org/v2/Organizations?app_id=3f8b1f09&app_key=156d538582406ecb12adc790348065e7&categoryID=4&state=NY`
      );
      if (this._isMounted) {
        data = data.unshift([
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
          }
        ]);
        this.setState({
          charities: data.slice(0, 15),
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Block>
        <Block flex={false} row space="around">
          <Text h1 bold>
            Charities
          </Text>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {this.state.charities.length > 0 ? (
            this.state.charities.map((charity, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  this.props.navigation.navigate("SingleCharity", {
                    charity: charity,
                    charityImage: charityImages[i],
                  })
                }
              >
                <Card style={styles.categories}>
                  <View style={styles.coverContainer}>
                    <Image source={charityImages[i]} style={styles.image} />
                  </View>
                  <Card.Content>
                    <Title>{charity.charityName}</Title>
                    <Paragraph>
                      {charity.mission.substring(0, 100) + "..."}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
          ) : (
            <View></View>
          )}
        </ScrollView>
      </Block>
    );
  }
}

export default Charity;

const styles = StyleSheet.create({
  categories: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    maxHeight: width * 2.4 - theme.sizes.base,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  images: {
    width: "100%",
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: width - theme.sizes.padding * 2.4 - theme.sizes.base,
    maxWidth: width - theme.sizes.padding * 2.4 - theme.sizes.base,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  coverContainer: {
    width: "100%",
    height: 200,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
  scrollView: {
    marginTop: 15,
    paddingBottom: 100,
  },
});
