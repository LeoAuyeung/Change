import React, { Component } from "react";
import { connect } from 'react-redux'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Badge, Card, Text, Progress } from "../components";
import { theme, mocks } from "../constants";

class Transactions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={[theme.fonts.header, { paddingLeft: theme.sizes.base }]}>
          Transaction
        </Text>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            source={require("../assets/images/Back.png")}
            style={{ width: 20, height: 24, marginRight: theme.sizes.base }}
          />
        </TouchableOpacity>
      ),
    };
  };

  render() {
    const {
      name,
      source,
      price,
      transactionPrice,
      paid,
      category,
    } = this.props.navigation.state.params.t;

    const { charities } = this.props;
    console.log(charities)
    let Image_Http_URL = { uri: source };
    return (
      <ScrollView>
        <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
          <Block center style={{ marginBottom: 17 }}>
            <Text title spacing={1} style={{ marginVertical: 8 }}>
              {name}
            </Text>
            <Text>
              <Text gray transform="uppercase">
                {category}
              </Text>
            </Text>
          </Block>

          <Image
            source={Image_Http_URL}
            style={{ height: 200, resizeMode: "stretch", margin: 5 }}
          />

          
          <Block row>
            <Block center flex={0.8}>
              <Text size={20} spacing={1} primary>
                ${transactionPrice}
              </Text>
              <Text spacing={0.7}>Price</Text>
            </Block>

            <Block center flex={2}>
              <Text size={20} spacing={1} primary>
                ${paid}
              </Text>
              <Text spacing={0.7}>Paid</Text>
            </Block>

            <Block center flex={0.8}>
              <Text size={20} spacing={1} primary>
                ${price}
              </Text>
              <Text spacing={0.7}>Change</Text>
            </Block>
          </Block>

          <Block color="gray3" style={styles.hLine} />
          
          {charities.map(c => {
            return (
              <Block style={{ marginBottom: theme.sizes.base }}>
                <Block row space="between" style={{ paddingLeft: 6 }}>
                  <Text size={17} body spacing={0.7}>
                    {c.charityName}
                  </Text>
                  <Text size={17} caption spacing={0.7}>
                    ${(price/charities.length).toFixed(2)}
                  </Text>
                </Block>
                <Progress value={price/charities.length} />
              </Block>
            )
          })}

          <Block color="gray3" style={styles.hLine} />

          <Block row center space="between">
            <Text bold caption size={20}>Going to Charity</Text>
            <Text size={20} spacing={1} primary>
              ${(price*0.9).toFixed(2)}
            </Text>
          </Block>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rewards: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 1.5,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
});

const mapState = state => {
  return {
    charities: state.charities
  };
};

export default connect(mapState)(Transactions);
