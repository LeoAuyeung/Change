const GET_CHARITY = "GET_CHARITY";
const STORE_CHARITY = "STORE_CHARITY";

const getCharity = () => {
  return {
    type: GET_CHARITY,
  };
};

const storeCharity = charity => {
  return {
    type: STORE_CHARITY,
    payload: charity,
  };
};

export const getCharityThunk = () => dispatch => {
  dispatch(getCharity());
};

export const storeCharityThunk = charities => dispatch => {
  dispatch(storeCharity(charities));
};

export default CharityReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CHARITY:
      return state;
    case STORE_CHARITY:
      return [...state, action.payload];
    default:
      return state;
  }
};
