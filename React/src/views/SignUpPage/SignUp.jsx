import React,{ useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar" ;
import { Link } from "react-router-dom";
import auth from "../../FirebaseConfig";
import AppAppBar from "../LandingPage/Sections/AppAppBar";
import baseUrl from "../../baseURL";

const backgroundImage = "/static/bg7.jpg";



const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding:"15vh 70vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "purple",
    zIndex:"3"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    padding:"5vh 10vh",
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

export default function SignUp() {
  const classes = useStyles();
 
  const [registrationEmail,setEmail] =useState('');
  const [name,setName] =useState('');
  const [registrationPassword,setPassword] =useState('');
  const [openAlert,setOpenAlert] =useState(false);
  const [error,SetError] =useState(false);
  const [errorText,SetErrorText] =useState('');

const   Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    SetError(false);
    setOpenAlert(false);
};
const handleSubmit= event=> {
    event.preventDefault();
    registerWithFirebase();
  }
const registerWithFirebase = () => {

    if (registrationPassword.length < 4) {
       SetError(true);
       setPassword('');
      SetErrorText('password length should be more than 4 digit.');
      return;
    }
    auth.createUserWithEmailAndPassword(registrationEmail, registrationPassword)
      .then(function (_firebaseUser) {
           setOpenAlert(true);
           setEmail('');
           setPassword('');
           const userinfo = {
               id: _firebaseUser.user.uid,
               userEmail:_firebaseUser.user.email,
               name:name,
               occupation:"",
               motto:"",
               isVip:false,
               image:"static/AvatarAdDownload.png",
               vip:false,
               socialMedia:""
           };
          // console.log(_firebaseUser.user.uid);console.log(_firebaseUser.user.email);
           baseUrl.post("usersinfo",userinfo).then(
               res => {
                   if(res.data ==null){
                      // console.log(res.data);
                   }
               });
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          SetError(true);
           setPassword('');
          SetErrorText('The password is too weak.');
        }
        else {
           SetError(true);
          SetErrorText(errorMessage);
       
        }
      
      }
      );
  }


  // Post info to server
  // useEffect(() => {
  //   baseUrl.post('information',info)
  //   .then(res => {
  //     console.log(res.data);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
          <VpnKeyIcon />
        </Avatar>
        <Typography style={{color:"white", zIndex:"3"}} component="h1" variant="h5">
          Sign up
        </Typography>
        <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="success">
            <strong>You are logging in now!</strong>
        </Alert> 
        </Snackbar>
        {
        <Snackbar open={error} autoHideDuration={3000} onClose={handleClose} >
        <MuiAlert elevation={3} variant="filled" severity="error">
                 {errorText}
        </MuiAlert>  
        </Snackbar>}    
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          
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
                onChange={ e => setEmail(e.target.value)}                    
                value ={registrationEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={ e => setName(e.target.value)}
                value ={name}
              />
          
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ e => setPassword(e.target.value)}
                value={registrationPassword}
              />
        
          <div style={{textAlign:"center" }}>
          <Button
            type="submit"
            style={{backgroundColor:"purple"}}

            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <br/>
              <Link to="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
              </div>
        </form>
      </div>
      </div >
      </div >
  );
}
