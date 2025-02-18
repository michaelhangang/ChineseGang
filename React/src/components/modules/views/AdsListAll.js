import React, {useState, useEffect, useLayoutEffect} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import baseUrl from "../../../baseURL";
import zIndex from "@material-ui/core/styles/zIndex";
import Model from "../../../components/Model";
const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
     backgroundColor: "#EEEEEE",
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
   // backgroundColor: "lightgray",
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

function AdsListAll(props) {
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
        setAdsData(ads.reverse());
      }
    });
  },[]);
  return (
    <section className={classes.root}>
      <Container className={classes.container}>

        <Grid container spacing={5}>
          {adsData&&
            adsData.map((ad) => (
              <Grid item xs={12} md={3}>
                <div className={classes.item}>
                  <img
                    className={classes.image}
                    src={ad.image}
                    alt="suitcase"
                  />

                  <Model  title ={ad.title} content={ad.content}  contact ={ad.contact} podate={ ad.podate} />

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

AdsListAll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdsListAll);
