import { Card, Grid, Typography, Checkbox, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { defineSelectedCountry } from "../store/actions/country.action";
import { makeStyles } from "@mui/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  ckeckBox: {
    visibility: "hidden",
  },
  checked: {
    visibility: "visible",
  },
  delete: {
    visibility: "hidden",
    cursor: "pointer",
  },
  card: {
    "&:hover span": {
      visibility: "visible",
    },
    "&:hover svg": {
      visibility: "visible",
    },
  },
});

export const CountryItem = ({
  country,
  selectedCountries,
  setSelectedCountries,
}) => {
  const dispatch = useDispatch();
  const onSelectCountry = () => {
    if (!selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };
  dispatch(defineSelectedCountry(selectedCountries));

  const onDeleteCountry = (name) => {
    setSelectedCountries([
      ...selectedCountries.filter((c) => c.name.common !== name),
    ]);
  };
  const classes = useStyles();
  return (
    <Grid item>
      <Card
        className={classes.card}
        sx={{
          width: 300,
          height: 150,
          p: 2,
          m: 1,
          backgroundImage: `url(${country.flags.png})`,
          opacity: 0.9,
          boxShadow: "0px 3px 20px rgba(142, 142, 142, 0.5)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={{
                pathname: `/${country.name.common}`,
              }}
              style={{ textDecoration: "none", color: "MenuText" }}
            >
              <Typography
                variant="h5"
                component="span"
                sx={{ color: "darkgrey" }}
              >
                {country.name.common}
              </Typography>
            </Link>

            <Box onClick={() => onDeleteCountry(country.name.common)}>
              <HighlightOffIcon
                className={classes.delete}
                sx={{
                  color: "red",
                  border: "0.1px solid black",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Box>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {country.cca2}
          </Typography>
          <Box sx={{ display: "flex", alignSelf: "flex-start" }}>
            <Checkbox className={classes.ckeckBox} onChange={onSelectCountry} />
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
