const GET_CARD = "GET_CARD";
const STORE_CARD = "STORE_CARD";

const getCard = () => {
	return {
		type: GET_CARD
	}
}

const storeCard = (card) => {
	return {
		type: STORE_CARD,
		payload: card
	}
}

export const getCardThunk = () => (dispatch) => {
	dispatch(getCard());
}

export const storeCardThunk = (card) => (dispatch) => {
	dispatch(storeCard(card));
}

export default CreditCardReducer = (state = [], action) => {
	switch (action.type) {
		case GET_CARD:
			return state
		case STORE_CARD:
			return action.payload
		default:
			return state;
	}
}