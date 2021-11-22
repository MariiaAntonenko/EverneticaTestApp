import { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
  useLocation,
  generatePath,
  createSearchParams,
} from "react-router-dom";
import { Container, TextField } from "@mui/material";
import { CountriesList } from "./CountriesList";

export const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

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
  }, [inputValue]);

  useEffect(() => {
    const up = new URLSearchParams(location.search.substr(1));
    const filtersFromParams = up.get("search");

    if (filtersFromParams) {
      setinputValue(filtersFromParams);
    }
  }, []);

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
