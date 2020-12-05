import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import baseUrl from "../../../baseURL";
import zIndex from "@material-ui/core/styles/zIndex";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    // backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3, 2),
    // width: "fit-content",
    backgroundColor: "lightgray",
    zIndex: 3,
  },
  image: {
    height: 215,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
});

function SecondHandListAll(props) {
  const { classes } = props;
  const [secondhandData, setAdsData] = useState(null);
  const [loopSize, setSize] = useState(3);

  useEffect(() => {
    baseUrl.get("secondHand").then((res) => {
      let items = res.data;
      if (items !== null) {
        if (items.length < 3) {
          setSize(items.length);
        }
        setAdsData(items);
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
          {secondhandData !== null &&
          secondhandData.map(item => (
              <Grid item xs={12} md={6}>
                <div className={classes.item}>
                  <img
                    className={classes.image}
                    src={item.image}
                    alt="suitcase"
                  />
                  <Typography variant="h4" className={classes.title}>
                    {item.name}
                  </Typography>
                  <Typography variant="h6">{item.description}</Typography>
                  <Typography variant="h6">${item.price} * {item.quantity}</Typography>
                  <Typography variant="h6">{item.podate}</Typography>
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

SecondHandListAll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SecondHandListAll);
