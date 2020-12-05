import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import baseUrl from "../../../baseURL";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(16),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
    width:"inherit"
  },
  image: {
    height: 155,
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
  content:{
    width:"100%",
    overflowWrap:"anywhere"
  }
});

function AdsBlock(props) {
  const { classes } = props;
  const [adsData, setAdsData] = useState(null);
  const [loopSize, setSize] = useState(3);

  // baseUrl.get("information").then((res) => {
  //   let ads = res.data;
  //   if (ads !== null) {
  //     if (ads.length < 3) {
  //       setSize(ads.length);
  //     }
  //     setAdsData(ads);
  //   }
  // });
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
                  <p variant="h5" className={classes.content}>
                    {ad.content}

                  </p>
                </div>
              </Grid>
            ))}

          {/* <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/static/productValues3.svg"
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                title
              </Typography>
              <Typography variant="h5">
                {"content"}
                {"."}
              </Typography>
            </div>
          </Grid> */}
        </Grid>
      </Container>
    </section>
  );
}

AdsBlock.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdsBlock);
