import { useState } from "react";
import { Container, TextField } from "@mui/material";
import { CountriesList } from "./CountriesList";

export const HomePage = () => {
  const [inputValue, setinputValue] = useState("");
  const onChangeSearchField = (e) => {
    setinputValue(e.target.value);
  };
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
        />
        <CountriesList inputValue={inputValue} />
      </Container>
    </div>
  );
};
