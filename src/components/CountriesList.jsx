import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { CountryItem } from "./CountryItem";
import axios from "axios";

export const CountriesList = ({ inputValue }) => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

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

  const onDragStartHandler = (e, country) => {
    setCurrentCard(country);
  };
  const onDragEndHandler = (e) => {
    e.target.style.opacity = "1";
  };
  const onDragOvertHandler = (e) => {
    e.preventDefault();
    e.target.style.opacity = "0.5";
  };
  const onDropHandler = (e, country) => {
    e.preventDefault();
    setCountriesList(
      selectedAndFiltered.map((c) => {
        if (c.area === country.area) {
          return { ...c, ccn3: currentCard.ccn3 };
        }
        if (c.area === currentCard.area) {
          return { ...c, ccn3: country.ccn3 };
        }
        return c;
      })
    );
    e.target.style.opacity = "1";
  };
  const sortCards = (a, b) => {
    if (a.ccn3 > b.ccn3) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <Grid container spacing={2} sx={{ m: 3 }}>
      {selectedAndFiltered.sort(sortCards).map((country) => (
        <CountryItem
          country={country}
          key={country.cca2}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          onDragStartHandler={onDragStartHandler}
          onDragEndHandler={onDragEndHandler}
          onDragOvertHandler={onDragOvertHandler}
          onDropHandler={onDropHandler}
        />
      ))}
    </Grid>
  );
};
