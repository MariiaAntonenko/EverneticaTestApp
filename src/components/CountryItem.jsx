import { Card, Grid, Typography, Checkbox, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const useStyles = makeStyles({
  ckeckBox: {
    visibility: "hidden",
  },
  delete: {
    visibility: "hidden",
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
    setSelectedCountries([...selectedCountries, country]);
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
            <Typography variant="h5" component="div">
              {country.name.common}
            </Typography>
            <Box>
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
