import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar, { styles as toolbarStyles } from "./Toolbar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const styles = (theme) => ({
  title: {
    fontSize: 24,
    color: theme.palette.common.white,
    textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: 700,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  leftLink: {
    fontSize: 16,
    //color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    // textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: 700,
    color: "purple"
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  button: {
    "&:hover": {
      backgroundColor: "lightgrey",
     // color: theme.palette.secondary.main
    },
    flex: 1,
   // display: "flex",
    fontWeight: 700,
    fontSize: 16,
    //justifyContent: "flex-end",
    color:"purple"
  },
});


function AdminToolBar(props) {
  const { classes, user } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonColor, SetButtonColor] = useState("secondary");

  useEffect(() => {
    //  window.addEventListener('mousemove', checkButton)
    //  return function cleanup() {
    //     window.removeEventListener("mousemove", checkButton); 
    });
  
//   const checkButton = () =>{
//   const myElement = document.getElementById("b1");
//   let classes = myElement.getAttribute("aria-haspopup");
//   if(classes==="true"){
//     console.log( "d");
//     handleClose();
//   }
//  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (

      <Toolbar className={classes.toolbar} style={{ background: "white" }}>
        <Button
          id="b1"
          className={classes.button} 
          aria-controls="customized-menu"
          aria-haspopup="true"     
          onClick={handleClick}        
        >
          Management
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          getContentAnchorEl={null}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}> <Link
            color="black"
            variant="h6"
            underline="none"
            className={classes.leftLink}
            to="/AdsCreate"
          >
            {"Post Ads"}
          </Link></MenuItem>
          <MenuItem onClick={handleClose}> <Link
            color="black"
            variant="h6"
            underline="none"
            className={classes.leftLink}
            to="/AdsList"
          >
            {"Edit Ads"}
          </Link></MenuItem>
          <MenuItem onClick={handleClose}> <Link
            color="black"
            variant="h6"
            underline="none"
            className={classes.leftLink}
            to="/SecondHandCreate"
          >
            {"Post Secondhand"}
          </Link></MenuItem>
          <MenuItem onClick={handleClose}> <Link
            color="black"
            variant="h6"
            underline="none"
            className={classes.leftLink}
            to="/SecondHandList"
          >
            {"Edit Secondhand"}
          </Link></MenuItem>
          <MenuItem onClick={handleClose}> <Link
              color="black"
              variant="h6"
              underline="none"
              className={classes.leftLink}
              to="/UserEdit"
          >
            {"Edit Profile"}
          </Link></MenuItem>
          
        </Menu>

        {/* <Button
          id="b1"
          className={classes.button} 
          aria-controls="customized-menu"
          aria-haspopup="true"     
          onClick={handleClick}        
        >
          Secondhand
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          getContentAnchorEl={null}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}> <Link
            color="black"
            variant="h6"
            underline="none"
            className={classes.leftLink}
            to="/SecondHandCreate"
          >
            {"Post Secondhand"}
          </Link></MenuItem>
          <MenuItem onClick={handleClose}> <Link
            color="black"
            variant="h6"
            underline="none"
            className={classes.leftLink}
            to="/SecondHandEdit"
          >
            {"Edit Secondhand"}
          </Link></MenuItem>
          
        </Menu> */}
       
      </Toolbar>

  );
}

AdminToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminToolBar);
