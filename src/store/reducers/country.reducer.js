import {
  GET_COUNTRY_START,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
} from "../types";

const initialState = {
  isLoading: false,
  countries: [],
  error: null,
};

export const country = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countries: action.payload.data,
      };
    case GET_COUNTRY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
