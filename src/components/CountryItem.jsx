import { Card, Grid, Typography, Checkbox, Box } from "@mui/material";
import Cookies from "js-cookie";
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
  onDragStartHandler,
  onDragEndHandler,
  onDragOvertHandler,
  onDropHandler,
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
  const countryCode = selectedCountries.map((c) => c.cca2);
  const stringDataOfSelected = JSON.stringify(countryCode);
  Cookies.set("selected", `${stringDataOfSelected}`);
  const classes = useStyles();
  return (
    <Grid item>
      <Card
        draggable={true}
        onDragStart={(e) => onDragStartHandler(e, country)}
        onDragLeave={(e) => onDragEndHandler(e)}
        onDragEnd={(e) => onDragEndHandler(e)}
        onDragOver={(e) => onDragOvertHandler(e)}
        onDrop={(e) => onDropHandler(e, country)}
        className={classes.card}
        sx={{
          width: 300,
          height: 150,
          p: 2,
          m: 1,
          backgroundImage: `url(${country.flags.png})`,
          opacity: 0.9,
          boxShadow: "0px 3px 20px rgba(142, 142, 142, 0.5)",
          cursor: "grab",
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
          <Box
            sx={{
              display: "flex",
              alignSelf: "flex-start",
              width: "1em",
              height: "1em",
            }}
          >
            <Checkbox className={classes.ckeckBox} onChange={onSelectCountry} />
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
