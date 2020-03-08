import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Badge, Card, Text, Progress } from "../components";
import { theme, mocks } from "../constants";

export default class Transactions extends Component {
  static navigationOptions = {
    title: "Transaction"
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
    let Image_Http_URL = { uri: source };
    return (
      <ScrollView>
        <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
          <Block center style={{ marginBottom: 15 }}>
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

          <Block style={{ marginBottom: theme.sizes.base }}>
            <Block row space="between" style={{ paddingLeft: 6 }}>
              <Text body spacing={0.7}>
                Red Cross
              </Text>
              <Text primary caption spacing={0.7}>
                $0.30
              </Text>
            </Block>
            <Progress value={0.3} />
          </Block>

          <Block style={{ marginBottom: theme.sizes.base }}>
            <Block row space="between" style={{ paddingLeft: 6 }}>
              <Text body spacing={0.7}>
                Team Trees
              </Text>
              <Text caption spacing={0.7}>
                $0.40
              </Text>
            </Block>
            <Progress value={0.4} />
          </Block>

          <Block style={{ marginBottom: theme.sizes.base }}>
            <Block row space="between" style={{ paddingLeft: 6 }}>
              <Text body spacing={0.7}>
                Cancer Research
              </Text>
              <Text caption spacing={0.7}>
                $0.30
              </Text>
            </Block>
            <Progress endColor="#D37694" value={0.3} />
          </Block>

          <Block color="gray3" style={styles.hLine} />

          <Block row center space="between">
            <Text>Going to charity</Text>
            <Text size={20} spacing={1} primary>
              $0.60
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
