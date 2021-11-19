import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { CountryItem } from "./CountryItem";
import axios from "axios";

export const CountriesList = ({ inputValue }) => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  console.log(selectedCountries);

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
  return (
    inputValue && (
      <Grid container spacing={2} sx={{ m: 3 }}>
        {filteredCountriesList.map((country) => (
          <CountryItem
            country={country}
            key={country.name.common}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
          />
        ))}
      </Grid>
    )
  );
};
