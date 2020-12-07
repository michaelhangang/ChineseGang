import React, {useState, useEffect, useLayoutEffect} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import baseUrl from "../../../baseURL";
import ModelSecondHand from "../../ModelSecondHand";

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
    zIndex: 3,
  },
  image: {
    height: 115,
    marginBottom:"3vh"
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
  let i = 0;
  useEffect(() => {
    baseUrl.get("secondHand").then((res) => {
      let items = res.data;
      if (items !== null) {
        if (items.length < 3) {
          setSize(items.length);
        }
        setAdsData(items.reverse());
      }
    });
  },[]);
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/*<img*/}
        {/*  src="/static/productCurvyLines.png"*/}
        {/*  className={classes.curvyLines}*/}
        {/*  alt="curvy lines"*/}
        {/*/>*/}
        <Grid container spacing={5}>
          {secondhandData &&
          secondhandData.map(item => (
              <Grid item xs={12} md={3}>
                <div className={classes.item}>
                  <img
                    className={classes.image}
                    src={item.image}
                    alt="suitcase"
                  />

                  <ModelSecondHand publisherID={item.publisherID}  name ={item.name} description={item.description}  price ={item.price} quantity={item.quantity} podate={ item.podate} />

                </div>
              </Grid>
            ))}

        </Grid>
      </Container>
    </section>
  );
}

SecondHandListAll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SecondHandListAll);
