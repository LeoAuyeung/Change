import React, { Component } from "react";
import {
	Dimensions,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	View
} from "react-native";
import axios from 'axios';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Block, Text } from "../components";
import { theme } from "../constants";

const { width } = Dimensions.get("window");

const charityImages = [
	require("../assets/images/BrooklynBotanicGarden.png"),
	require("../assets/images/BrooklynBotanicGarden.png"),
	require("../assets/images/ProspectParkAlliance.png"),
	require("../assets/images/EnvironmentalDefenseFund.png"),
	require("../assets/images/horticultural-society-of-new-york.png"),
	require("../assets/images/national-audobon-society.png"),
	require("../assets/images/new-york-botanical-garden.png"),
	require("../assets/images/natural-resources-defense-council.jpeg"),
	require("../assets/images/grow-nyc.png"),
	require("../assets/images/project-for-public-spaces.png"),
	require("../assets/images/central-park-conservancy.png"),
	require("../assets/images/riverkeeper.jpg"),
	require("../assets/images/rainforest-alliance.png"),
	require("../assets/images/riverside-park-conservancy.png"),
	require("../assets/images/city-parks-foundation.png"),
]

class Charity extends Component {
	_isMounted = false;
	constructor(props) {
		super(props)
		this.state = {
			charities: [],
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		try {
			let { data } = await axios.get(`https://api.data.charitynavigator.org/v2/Organizations?app_id=3f8b1f09&app_key=156d538582406ecb12adc790348065e7&categoryID=4&state=NY`)
			if (this._isMounted) {
				this.setState({
					charities: data.slice(0, 15)
				})
			}
		}
		catch (err) {
			console.log(err)
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
					style={{ paddingVertical: 16 }}
				>
					{this.state.charities.length > 0 ?
						this.state.charities.map((charity, i) => (
							<TouchableOpacity
								key={i}
								onPress={() =>
									this.props.navigation.navigate("SingleCharity", {
										charity: charity,
										charityImage: charityImages[i]
									})}
							>
								<Card style={styles.categories}>
									<View style={{ display: "flex", alignItems: "center", justifyContent: "cen	ter" }}>
										<Card.Cover source={charityImages[i]} style={{ width: "100%", maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) }} />
									</View>
									<Card.Content>
										<Title>{charity.charityName}</Title>
										<Paragraph>{charity.mission.substring(0, 100) + "..."}</Paragraph>
									</Card.Content>
								</Card>
							</TouchableOpacity>
						))
						: <View></View>}
				</ScrollView>
			</Block>
		);
	}
}

export default Charity;

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: theme.sizes.base * 2,
	},
	categories: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		maxHeight: (width * 2.4 - theme.sizes.base),
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
		minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base),
		maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base),
		maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
	}
});
