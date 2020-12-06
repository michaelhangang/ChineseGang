import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import baseUrl from "../../../baseURL";
import PaypalButtons from "../components/PaypalButtons";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../../../FirebaseConfig";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
const styles = (theme) => ({
    root: {
        display: "flex",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.light,
      },
})


function UserVip(props) {
    const { classes } = props;
    const [user, setUser] = useState(null);
    const [vip, setVip] = useState(false);
    const [showPaypal, setShowPaypal] = useState(false);

    useEffect(() => {
      auth.onAuthStateChanged( user=> {
          if (user) {
              baseUrl.get(`usersinfo/${user.uid}`).then(
                  res=>{
                      setVip(res.data.vip);
                  }
              );
          } else {
              console.log("no user ");
          }
        });


    });


    const showPaypalButtons = () => {
        setShowPaypal(true);
    };

    if(vip)
    {
        return (
            <Grid container >
                <Grid item xs={12} md = {6} style={{margin:"30vh auto"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <img style={{height: '50vh'}} alt="vip icon" src = "/static/vipicon.png"/>
                        <h2 >You are our VIP!</h2>
                    </div>
            </Grid>

    </Grid>
        )
    }else
    {
      if (showPaypal) {
        return <PaypalButtons />;
    } else {
        
          return (
          <Grid container >
              <Grid item xs={12} md = {6} style={{margin:"30vh auto"}}>
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
              <img
              src="/static/becomevip.png"
              alt="vip icon"

              />
              <h2>Do you want to become our VIP? </h2>
              <div >
              <Button onClick={showPaypalButtons}   variant="contained"
                      style={{backgroundColor:"black", color:"white"}}>
              <b>Yes</b>
              </Button>

              <Link  style={{ textDecoration: "none", marginLeft:"4em"}} to="/" >
                  <Button
                      style={{backgroundColor:"black", color:"white"}}
                      variant="contained">No
                  </Button>
              </Link>

              </div>
                  </div>
              </Grid>

          </Grid>
          );
        

      }
    }
}

UserVip.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(UserVip);