import { useEffect, useState } from "react";
import {
  useNavigate,
  Link,
  useLocation,
  generatePath,
  createSearchParams,
} from "react-router-dom";

import { Grid } from "@mui/material";
import { CountryItem } from "./CountryItem";
import axios from "axios";

export const CountriesList = ({ inputValue }) => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const getCountries = () => {
    axios.get("https://restcountries.com/v3.1/all").then((resp) => {
      setCountriesList(resp.data);
    });
  };
  useEffect(() => {
    getCountries();
  }, []);
  const filteredCountriesList = countriesList.filter((country) => {
    return country.name.common.toLowerCase().includes(inputValue.toLowerCase());
  });

  const joinWithoutDupes = (A, B) => {
    const a = new Set(A.map((x) => x.cca2));
    return [...A, ...B.filter((x) => !a.has(x.cca2))];
  };
  const selectedAndFiltered =
    inputValue === ""
      ? selectedCountries
      : joinWithoutDupes(selectedCountries, filteredCountriesList);

  return (
    <Grid container spacing={2} sx={{ m: 3 }}>
      {selectedAndFiltered.map((country) => (
        <CountryItem
          country={country}
          key={country.cca2}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
      ))}
    </Grid>
  );
};
