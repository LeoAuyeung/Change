import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import rgba from "hex-to-rgba";
import * as Icon from "react-native-vector-icons";
// check this lib for more options
import { CircularProgress } from "react-native-circular-progress";
import { Block, Badge, Card, Text, Progress} from "../components";
import { theme, mocks } from "../constants";

export default class Transactions extends Component {
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
      )
    };
  };

  render() {
    const { name, source } = this.props.navigation.state.params.t;
    let Image_Http_URL ={ uri: source };
    return (
      <ScrollView>
      <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
        {/* <Block center> */}
          {/* <CircularProgress
            size={214} // can use  with * .5 => 50%
            fill={85} // percentage
            lineCap="round" // line ending style
            rotation={220}
            arcSweepAngle={280}
            width={theme.sizes.base}
            tintColor={theme.colors.primary} // gradient is not supported :(
            backgroundColor={theme.colors.gray3}
            backgroundWidth={theme.sizes.base / 2}
          >
            {() => (
              <Block center middle>
                <Text h2 medium>
                  8.1
                </Text>
                <Text h3 transform="uppercase">
                  good
                </Text>
              </Block>
            )}
          </CircularProgress>
        </Block> */}

        <Block center style={{marginBottom: 15}}>
          <Text title spacing={1} style={{ marginVertical: 8 }}>
            {name}
          </Text>
          <Text>
            <Text primary>37 </Text>
            <Text gray transform="uppercase">
              level
            </Text>
          </Text>
        </Block>

        <Image
          source = {Image_Http_URL} 
          style = {{height: 200, resizeMode : 'stretch', margin: 5}} />

        <Block row>
          <Block center flex={0.8}>
            <Text size={20} spacing={1} primary>
              $7.20
            </Text>
            <Text spacing={0.7}>Price</Text>
          </Block>

          <Block center flex={2}>
            <Text size={20} spacing={1} primary>
              $8.00
            </Text>
            <Text spacing={0.7}>Paid</Text>
          </Block>

          <Block center flex={0.8}>
            <Text size={20} spacing={1} primary>
              $0.80
            </Text>
            <Text spacing={0.7}>Change</Text>
          </Block>
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block style={{ marginBottom: theme.sizes.base }}>
          <Block row space="between" style={{ paddingLeft: 6}}>
            <Text body spacing={0.7}>
              Red Cross
            </Text>
            <Text primary caption spacing={0.7}>
              $0.30
            </Text>
          </Block>
          <Progress value={0.30} />
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
          <Progress value={0.40} />
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
          <Progress endColor="#D37694" value={0.30} />
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block row center space="between">
          <Text>Total Driver Discount</Text>
          <Text size={20} spacing={1} primary>
            $6.71
          </Text>
        </Block>
      </Card>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  rewards: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.gray4
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 1.5,
    height: 1
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1
  }
});