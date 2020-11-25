import React,{useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link,Redirect,useHistory  } from "react-router-dom";
import auth from "../../FirebaseConfig";
import Snackbar from "@material-ui/core/Snackbar" ;
import MuiAlert from '@material-ui/lab/Alert';
import AppAppBar from "../LandingPage/Sections/AppAppBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link  to="/" color="inherit" >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
    <Container component="main" maxWidth="xs">
        <AppAppBar style={{backgroundColor:"purple"}} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
