import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import Toolbar, {
  styles as toolbarStyles,
} from "../../../components/Toolbar";
import { Link } from "react-router-dom";
import AdminToolBar from "../../../components/AdminToolBar";
import auth from "../../../FirebaseConfig";
import AccountBox from '@material-ui/icons/AccountBox';
import baseUrl from "../../../baseURL";

const styles = (theme) => ({
  title: {
    fontSize: 34,
    color: theme.palette.common.white,
    textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: 700,
  },
  link:{
    fontSize:16,
    color: theme.palette.common.white,
    // textTransform: "uppercase",
    textDecoration: "none",
    marginLeft: 20

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
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    // textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: 700,
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  trans:{backgroundColor:"transparent"},
  transback:{backgroundColor:"purple"},
  center: {
    flex: 1,
    textAlign:"center"
  }
});

function AppAppBar(props) {
  const {classes} = props;
  const [user,setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged( user=> {
      if (user) {
        baseUrl.get(`usersinfo/${user.uid}`).then(
            res=>{
              setUser(res.data);
            }
        );
      } else {
        console.log("no user ");
      }
    });
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const signoutWithFirebase = () => {
    auth.signOut().then(function () {
      if (!auth.currentUser) {
        // Alert.alert('user was logged out!');
        setUser(null);
      }
    });
  };
  const headerColorChange = () => {
    const {  changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.trans);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.transback);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes.trans);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes.transback);
    }
  };
  
  return (
    
      <AppBar position="fixed" className={classes.trans}>
        {user&&<AdminToolBar/>}
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
        <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.link}
            to="/AdsPage"
          >
            {"Ads"}
          </Link>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.link}
            to="/SecondHandPage"
          >
            {"SecondHand"}
          </Link>
          </div>
          <div className={classes.center} >
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            to="/"
          >
            {"Chinese Gang"}
          </Link>
          </div>
          {!user&&<div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              to="/SignIn"
            >
              {"Sign In"}
            </Link>
            
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink)}
              to="/SignUP"
            >
              {"Sign Up"}
            </Link>
          </div>}
          {user&& <div className={classes.right}>
            <div style={{display:"flex",fontSize: 16, }}  >
            <Link to="/UserProfilePage"><AccountBox style={{marginRight:"10px",color:"white"}}/> </Link>
            {user.name}
              {user.isVip&&
              <img src={"/static/red_orb_gold_crown.png"} style={{height: "4vh", marginLeft: "1em"}}/>
              }
            </div>
            {!user.isVip &&
            <Link to="/BecomeVip" underline="none" className={clsx(classes.rightLink)}>{"Update to VIP"}   </Link>
            }
            <Link
            variant="h1"
            underline="none"
            className={clsx(classes.rightLink)}
            onClick={signoutWithFirebase}
          >
            {"Logout"}
          </Link></div>}
        </Toolbar>
        {/* <div className={classes.placeholder} /> */}

      </AppBar>
    
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
