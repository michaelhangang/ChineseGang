import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../components/Typography";
import BannerLayout from "./BannerLayout";
const backgroundImage = "/static/banner_image.jpg";

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
    marginTop: theme.spacing(2),
  },
});

function Banner(props) {
  const { classes } = props;
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
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
      <BannerLayout backgroundClassName={classes.background}>
        {/* Increase the network loading priority of the background image. */}
        {/* <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        /> */}
        {/* <Typography color="inherit" align="center" variant="h2" marked="center">
          Upgrade
        </Typography> */}
        {/* <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
        >
          content
        </Typography> */}

        <Typography variant="h4" color="inherit" className={classes.more}>
          Discover the experience
        </Typography>
      </BannerLayout>
    </div>
  );
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Banner);
