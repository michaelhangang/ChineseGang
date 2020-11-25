import React,{useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link,Redirect,useHistory  } from "react-router-dom";
import auth from "../../FirebaseConfig";
import Snackbar from "@material-ui/core/Snackbar" ;
import MuiAlert from '@material-ui/lab/Alert';
import AppAppBar from "../LandingPage/Sections/AppAppBar";
import zIndex from "@material-ui/core/styles/zIndex";
const backgroundImage = "/static/bg7.jpg";


const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding:"20vh 70vh",
   
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "purple",
    zIndex:"3"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    padding:"10vh",
    backgroundColor:"white",
    zIndex:"3"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%"
    }
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [loginEmail,setEmail] =useState('');
  const [loginPassword,setPassword] =useState('');
  const [openAlert,setOpenAlert] =useState(false);
  const [error,SetError] =useState(false);
  const [errorText,SetErrorText] =useState('');

    
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    SetError(false);
    setOpenAlert(false);
    };
  
  const  signInWithEmailAndPassword = () => {
    auth.signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(function (_firebaseUser) {
        history.push("/");
        // setLoggedIn(true);
 
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          SetError(true);
           setPassword('');
          SetErrorText('The password is wrong.');
        }
        else {
          SetError(true);
          SetErrorText(errorMessage);
        }
      }
      );
  }
  const handleSubmit= event=> {
    event.preventDefault();
    signInWithEmailAndPassword();
  }

  return (
    <div >
      <AppAppBar style={{position:"absolute"}} />
      <CssBaseline />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + backgroundImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography style={{color:"white", zIndex:"3"}} component="h1" variant="h5">
          Sign in
        </Typography>
         {
        <Snackbar open={error} autoHideDuration={3000} onClose={handleClose} >
        <MuiAlert elevation={3} variant="filled" severity="error">
                 {errorText}
        </MuiAlert>  
        </Snackbar>} 
        <form className={classes.form}  onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange ={e => setEmail(e.target.value)}
            value ={loginEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange ={e => setPassword(e.target.value)}
            value ={loginPassword}
          />
          
          <div style={{textAlign:"center" }}>
          <Button
            type="submit"
            style={{backgroundColor:"purple", textAlign:"center"}}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <br/>
          <Link to="/SignUp" variant="body2" >
                {"Don't have an account? Sign Up"}
          </Link>
          </div>
         
        </form>
      </div>
      
      </div>
        </div>
  );
}
