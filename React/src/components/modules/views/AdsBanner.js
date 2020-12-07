import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../components/Typography";
import ProductHeroLayout from "./BannerLayout";
const backgroundImage = "/static/ads_banner.png";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(8),
  },
});

function AdsBanner(props) {
  const { classes } = props;
  let windowScrollTop=0;
  // if (window.innerWidth >= 768) {
  //   windowScrollTop = window.pageYOffset / 3;
  // } else {
  //   windowScrollTop = 0;
  // }
  const [transform, setTransform] = useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  return (
    <div
      style={{
        transform: transform,
        backgroundImage: `url(${backgroundImage})`,
        marginTop: -70,
      }}
    >
      <ProductHeroLayout backgroundClassName={classes.background}>
        <Typography variant="h5" color="inherit" className={classes.more}>
          Improve Your Business
        </Typography>
      </ProductHeroLayout>
    </div>
  );
}

AdsBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdsBanner);
