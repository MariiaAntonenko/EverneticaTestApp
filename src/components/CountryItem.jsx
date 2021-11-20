import { Card, Grid, Typography, Checkbox, Box } from "@mui/material";
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
  const onSelectCountry = () => {
    if (!selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };
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
          minHeight: 120,
          maxHeight: 180,
          p: 2,
          bgcolor: "rgba(25, 117, 210, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link
              to={`/${country.name.common}`}
              style={{ textDecoration: "none", color: "MenuText" }}
            >
              <Typography variant="h5" component="span">
                {country.name.common}
              </Typography>
            </Link>

            <Box onClick={() => onDeleteCountry(country.name.common)}>
              <HighlightOffIcon className={classes.delete} />
            </Box>
          </Box>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {country.altSpellings[0]}
          </Typography>
          <Box sx={{ display: "flex", alignSelf: "flex-start" }}>
            <Checkbox className={classes.ckeckBox} onChange={onSelectCountry} />
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
