import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";
import baseUrl from "../../../baseURL";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

function SecondHand(props) {
  const { classes } = props;
  const [adsData, setAdsData] = useState(null);
  const [loopSize, setSize] = useState(3);

  useEffect(() => {
    baseUrl.get("information").then((res) => {
      let ads = res.data;
      if (ads !== null) {
        if (ads.length < 3) {
          setSize(ads.length);
        }
        setAdsData(ads);
      }
    });
  });
  return (
    <div>
      <section className={classes.root}>
        <Container className={classes.container}>
          <img
            src="/static/productCurvyLines.png"
            className={classes.curvyLines}
            alt="curvy lines"
          />
          <Typography
            variant="h4"
            marked="center"
            className={classes.title}
            component="h2"
          >
            SecondHand
          </Typography>
          <div>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  {/* <div className={classes.number}>1.</div> */}
                  <img
                    src="/static/productHowItWorks1.svg"
                    alt="suitcase"
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <img
                    src="/static/productHowItWorks2.svg"
                    alt="graph"
                    className={classes.image}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <img
                    src="/static/productHowItWorks3.svg"
                    alt="clock"
                    className={classes.image}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </section>

      <section className={classes.root}>
        <Container className={classes.container}>
          <img
            src="/static/productCurvyLines.png"
            className={classes.curvyLines}
            alt="curvy lines"
          />
          <Grid container spacing={5}>
            {adsData !== null &&
              adsData.slice(0, loopSize).map((ad) => (
                <Grid item xs={12} md={4}>
                  <div className={classes.item}>
                    <img
                      className={classes.image}
                      src={ad.image}
                      alt="suitcase"
                    />
                    <Typography variant="h6" className={classes.title}>
                      {ad.title}
                    </Typography>
                    <Typography variant="h5">
                      {ad.content}
                      {""}
                    </Typography>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Container>
      </section>
    </div>
  );
}

SecondHand.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SecondHand);
