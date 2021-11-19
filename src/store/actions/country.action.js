import {
  GET_COUNTRY_START,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
} from "../types";

export const getCountry = () => {
  return (dispatch) => {};
};

export const getCountryStart = () => {
  return {
    type: GET_COUNTRY_START,
  };
};
export const getCountrySuccess = (data) => {
  return {
    type: GET_COUNTRY_SUCCESS,
    payload: data,
  };
};
export const getCountryFailure = () => {
  return {
    type: GET_COUNTRY_FAILURE,
  };
};
