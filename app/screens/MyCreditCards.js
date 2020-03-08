import React, { Component } from "react";
import {
	Dimensions,
	StyleSheet,
	ScrollView,
	View,
	Image
} from "react-native";
import { Text } from "../components";
import { theme } from "../constants";

const { width } = Dimensions.get("window")

class MyCreditCards extends Component {
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
			<ScrollView style={styles.flex}>
				<Text>adsad</Text>
			</ScrollView>
		)
	}
}

export default MyCreditCards;
