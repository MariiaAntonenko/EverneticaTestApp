import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../store/actions/country.action";
import { Container, Box, Typography, Card } from "@mui/material";
import {
  useParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const useSelectCountry = (countryName) => {
  const dispatch = useDispatch();
  const { country, isLoading, selectedCountries } = useSelector((s) => s);
  useEffect(() => {
    dispatch(getCountry(countryName));
  }, [countryName]); // eslint-disable-line react-hooks/exhaustive-deps
  return { country, isLoading, selectedCountries };
};

export const CountryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [urlParams, setUrlParams] = useState("");

  const { name } = useParams();
  const { country, isLoading, selectedCountries } = useSelectCountry(name);
  const checkRender = (obj, prop) => {
    if (typeof country[obj] === "undefined") {
      return null;
    }
    return country[obj][prop];
  };
  const isSelect = selectedCountries
    .map((c) => (typeof country !== "undefined" ? c.cca2 : null))
    .includes(country.cca2);
  const param = isSelect.toString();
  console.log(location.search);

  useEffect(() => {
    navigate({
      isSelect: `?${createSearchParams({
        isSelect: `${param}`,
      })}`,
    });
    setUrlParams(param);
  }, []);
  useEffect(() => {
    const up = new URLSearchParams(location.param.substr(1));
    const filtersFromParams = up.get("isSelect");

    // if (filtersFromParams) {
    //   setinputValue(filtersFromParams);
    // }
  }, []);

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", mt: "20%" }}
      >
        <Loader type="ThreeDots" color="#1976d2" height={80} width={80} />
      </Container>
    );
  }
  return (
    <Container maxWidth="md">
      <Typography variant="h1" align="center">
        {checkRender("name", "common")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5em",
        }}
      >
        <Card
          sx={{
            width: 300,
            minHeight: 120,
            maxHeight: 180,
            p: 2,
            bgcolor: "rgba(25, 117, 210, 0.1)",
            boxShadow: "0px 3px 20px rgba(142, 142, 142, 0.5)",
          }}
        >
          {isSelect && <CheckBoxIcon sx={{ color: "#1976b2" }} />}
          <Typography variant="h5">Population: {country.population}</Typography>
          <Typography variant="h5">Capital: {country.capital}</Typography>
          <Typography variant="h5">Continent: {country.continents}</Typography>
        </Card>
        <Box sx={{ boxShadow: "0px 3px 20px rgba(142, 142, 142, 0.5)" }}>
          <img src={checkRender("flags", "png")} alt="Country flag" />
        </Box>
      </Box>
    </Container>
  );
};
