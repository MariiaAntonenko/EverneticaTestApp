import axios from "axios";
import {
  GET_COUNTRY_START,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
} from "../types";

export const getCountry = (name) => {
  return async (dispatch) => {
    dispatch(getCountryStart());
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      dispatch(getCountrySuccess(response.data));
    } catch (error) {
      dispatch(getCountryFailure(error.message));
      throw error;
    }
  };
};

export const getCountryStart = () => {
  return {
    type: GET_COUNTRY_START,
  };
};
export const getCountrySuccess = (country) => {
  return {
    type: GET_COUNTRY_SUCCESS,
    payload: country,
  };
};
export const getCountryFailure = (error) => {
  return {
    type: GET_COUNTRY_FAILURE,
    payload: {
      error,
    },
  };
};
