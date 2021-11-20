import { useEffect, useState } from "react";
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
  const selectedCountry = selectedCountries.find((c) => c.name.common);
  console.log(selectedCountry);
  if (selectedCountries.length) {
    return (
      <Grid container spacing={2} sx={{ m: 3 }}>
        {selectedCountries.map((country) => (
          <CountryItem
            country={country}
            key={country.name.common}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
          />
        ))}
        {filteredCountriesList
          .filter((country) => country.name.common !== selectedCountry)
          .map((country) => (
            <CountryItem
              country={country}
              key={country.name.common}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
            />
          ))}
      </Grid>
    );
  }
  return (
    inputValue && (
      <Grid container spacing={2} sx={{ m: 3 }}>
        {filteredCountriesList
          .filter((country) => country.name.common !== selectedCountry)
          .map((country) => (
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
