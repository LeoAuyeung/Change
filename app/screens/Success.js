import React, { Component } from "react";
import {
	KeyboardAvoidingView,
	StyleSheet,
	View
} from "react-native";
import { Block, Text } from "../components";
import { theme } from "../constants";
import LottieView from "lottie-react-native";

export default class Success extends Component {
	state = {
		errors: [],
		loading: false,
		value: "0",
	};

	static navigationOptions = {
		header: null,
		headerLeft: null
	};

	componentDidMount() {
		this.animation.play();
		setTimeout(() => {
			this.props.navigation.goBack(null);
		}, 2000);
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.login} behavior="padding">
				<Block padding={[0, theme.sizes.base * 2], 50}>
					<View style={styles.animationContainer}>
					<Text h1 bold center>
						Card Added!
          </Text>
						<LottieView
							ref={animation => {
								this.animation = animation;
							}}
							style={{
								width: 300,
								height: 300,
								backgroundColor: '#fff',
							}}
							source={require('../assets/lottie/checkAnimation.json')}
							loop={false}
						/>
					</View>
				</Block>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	login: {
		flex: 1,
		justifyContent: "center",
	},
	input: {
		borderRadius: 0,
		borderWidth: 0,
		borderBottomColor: theme.colors.gray2,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	hasErrors: {
		borderBottomColor: theme.colors.accent
	},
	animationContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: "center"
	}
});
