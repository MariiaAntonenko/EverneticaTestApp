import { useState, useEffect } from "react";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import { Container, TextField } from "@mui/material";
import { CountriesList } from "./CountriesList";

export const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");
  const onChangeSearchField = (e) => {
    setinputValue(e.target.value);
  };
  useEffect(() => {
    navigate({
      search: `?${createSearchParams({
        search: `${inputValue}`,
      })}`,
    });
    setinputValue(inputValue);
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const up = new URLSearchParams(location.search.substr(1));
    const filtersFromParams = up.get("search");

    if (filtersFromParams) {
      setinputValue(filtersFromParams);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Container sx={{ mt: 7 }}>
        <TextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          label="Country"
          size="small"
          type="search"
          onChange={onChangeSearchField}
          value={inputValue}
        />
        <CountriesList inputValue={inputValue} />
      </Container>
    </div>
  );
};
