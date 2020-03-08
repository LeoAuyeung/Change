import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  Alert,
  Linking,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  AsyncStorage
} from "react-native";
import { Text, Button, Block } from "../components";
import { theme } from "../constants";
import { storeCharityThunk } from "../store/utilities/charities";
import { storeCardThunk } from "../store/utilities/creditCard";

const { width } = Dimensions.get("window");

const TEAM_TREES = "Team Trees";
const DIRECT_RELIEF = "Direct Relief";
const RED_CROSS = "Red Cross";

class SingleCharity extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      charities: []
    };

    this.logoImages = {
      [TEAM_TREES]: require("../assets/images/teamtrees.png"),
      [DIRECT_RELIEF]: require("../assets/images/corona.png"),
      [RED_CROSS]: require("../assets/images/redcross.jpg")
    };
  }

  async componentDidMount() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          this.handleOpenURL(url);
        }
      })
      .catch(err => {});
    Linking.addEventListener("url", this.handleOpenURL);
  }

  componentWillUnmount() {
    this._isMounted = false;
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  render() {
    const { navigation } = this.props;
    let { charity, charityImage, resizeMode } = navigation.state.params;
    if (charity.image) {
      charityImage = {
        uri: charity.image
      };
    }

    const title = charity.charityName || charity.name;

    return (
      <ScrollView style={styles.flex}>
        <View
          style={
            resizeMode === "cover" ? styles.flex : styles.charityImageContainer
          }
        >
          <Image
            source={charityImage}
            style={
              resizeMode === "cover"
                ? styles.charityImageFull
                : styles.charityImage
            }
          />
        </View>
        <View style={[styles.flex, styles.contentHeader]}>
          <Image
            style={[styles.avatar, styles.shadow]}
            source={this.logoImages[title]}
          />
          <Text style={styles.title}>{title}</Text>
          <View>
            <Text style={styles.description}>{charity.mission}</Text>
          </View>
        </View>
        <View style={{}}>
          <Block horizontal>
            <Button gradient>
              <Text
                white
                center
                onPress={async () => {
                  Linking.openURL(charity.websiteURL);
                }}
              >
                Learn More
              </Text>
            </Button>
            <Button
              gradient
              onPress={async () => {
                // TODO: add to dashboard
                try {
                  this.props.storeCharities(charity);
                  Alert.alert(
                    "Success",
                    "Added charity to the dashboard",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
                  console.log("yeooo: ", this.props);
                } catch (err) {
                  Alert.alert(
                    "Error",
                    err,
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                  );
                }
              }}
            >
              <Text white center>
                Add to Dashboard
              </Text>
            </Button>

            <Button
              onPress={() =>
                
                navigation.navigate("Donate", {
                  charity,
                  charityImage: charityImage
                })
              }
              gradient
            >
              <Text white center>
                Donate directly
              </Text>
            </Button>
          </Block>
        </View>
      </ScrollView>
    );
  }
}
const mapState = state => {
  return {
    charities: state.charities
  };
};

const mapDispatch = dispatch => {
  return {
    storeCharities: charity => dispatch(storeCharityThunk(charity))
  };
};

export default connect(mapState, mapDispatch)(SingleCharity);

const styles = StyleSheet.create({
  charityImageContainer: {
    width: "100%",
    height: 200,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginVertical: 25
  },
  charityImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  },
  charityImageFull: {
    width,
    height: width,
    resizeMode: "cover"
  },
  flex: {
    flex: 1
  },
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  header: {
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: "space-between",
    alignItems: "center"
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: "transparent",
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.border,
    borderTopRightRadius: theme.sizes.border,
    marginTop: -theme.sizes.padding / 2
  },
  avatar: {
    position: "absolute",
    top: -36,
    right: 36,
    width: 36 * 2,
    height: 36 * 2,
    borderRadius: 36
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: "bold"
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption
  }
});
