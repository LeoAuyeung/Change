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


class SingleCharity extends Component {
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
			// let { data } = await axios.get(`https://api.data.charitynavigator.org/v2/Organizations?app_id=3f8b1f09&app_key=156d538582406ecb12adc790348065e7&categoryID=4&state=NY`)
			// if (this._isMounted) {
			// 	this.setState({
			// 		charities: data.slice(0, 15)
			// 	})
			// }
		}
		catch (err) {
			console.log(err)
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const { navigation } = this.props
		const { charity, charityImage } = navigation.state.params
		return (
			<ScrollView style={styles.flex}>
				<View style={[styles.flex]}>
					<Image source={charityImage} resizeMode='cover' style={{ width, height: width }} />
				</View>
				<View style={[styles.flex, styles.content]}>
					<View style={[styles.flex, styles.contentHeader]}>
						<Text style={styles.title}>{charity.charityName}</Text>
						<View>
							<Text style={styles.description}>
								{charity.mission}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		)
	}
}

export default SingleCharity;

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	column: {
		flexDirection: 'column'
	},
	row: {
		flexDirection: 'row'
	},
	header: {
		// backgroundColor: 'transparent',
		paddingHorizontal: theme.sizes.padding,
		paddingTop: theme.sizes.padding,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	back: {
		width: theme.sizes.base * 3,
		height: theme.sizes.base * 3,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	content: {
		// backgroundColor: theme.colors.active,
		// borderTopLeftRadius: theme.sizes.border,
		// borderTopRightRadius: theme.sizes.border,
	},
	contentHeader: {
		backgroundColor: 'transparent',
		padding: theme.sizes.padding,
		backgroundColor: theme.colors.white,
		borderTopLeftRadius: theme.sizes.border,
		borderTopRightRadius: theme.sizes.border,
		marginTop: -theme.sizes.padding / 2,
	},
	avatar: {
		position: 'absolute',
		top: -36,
		right: 36,
		width: 36 * 2,
		height: 36 * 2,
		borderRadius: 36,
	},
	shadow: {
		shadowColor: theme.colors.black,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
	},
	dotsContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 36,
		right: 0,
		left: 0
	},
	dots: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 6,
		backgroundColor: theme.colors.gray,
	},
	title: {
		fontSize: theme.sizes.font * 2,
		fontWeight: 'bold'
	},
	description: {
		fontSize: theme.sizes.font * 1.2,
		lineHeight: theme.sizes.font * 2,
		color: theme.colors.caption
	}
});