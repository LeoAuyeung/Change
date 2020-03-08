import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View
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
  require("../assets/images/city-parks-foundation.png")
];

class Charity extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      charities: []
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    try {
      let { data } = await axios.get(
        `https://api.data.charitynavigator.org/v2/Organizations?app_id=3f8b1f09&app_key=156d538582406ecb12adc790348065e7&categoryID=4&state=NY`
      );
      if (this._isMounted) {
        this.setState({
          charities: data.slice(0, 15)
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
        <Block flex={false} row space="around" style={styles.header}>
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
                    charityImage: charityImages[i]
                  })
                }
              >
                <Card
                  style={
                    i === 0
                      ? { ...styles.charity, ...styles.firstCharity }
                      : styles.charity
                  }
                >
                  <View style={styles.coverContainer}>
                    <Image
                      source={charityImages[i]}
                      style={styles.charityImage}
                    />
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
  header: {
    borderBottomWidth: 1,
    borderColor: "#ededed",
    paddingBottom: 12
  },
  charity: {
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
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  firstCharity: {
    marginTop: 16
  },
  images: {
    width: "100%"
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: width - theme.sizes.padding * 2.4 - theme.sizes.base,
    maxWidth: width - theme.sizes.padding * 2.4 - theme.sizes.base,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  coverContainer: {
    width: "100%",
    height: 200,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15
  },
  charityImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  },
  scrollView: {
    paddingBottom: 100
  }
});
