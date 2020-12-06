import React,{useState,useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {Container,Grid,CssBaseline,TextField ,withStyles,createStyles,Button} from "@material-ui/core";
import baseUrl from "../../baseURL";
import { useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar" ;
import MuiAlert from '@material-ui/lab/Alert';
import AppAppBarColor from "../LandingPage/Sections/AppAppBarColor";
import auth from "../../FirebaseConfig";
import AddAPhoto from '@material-ui/icons/AddAPhoto';

const  today = new Date();
const  currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const styles = createStyles((theme) =>({
        form:{
            width: "100%",
            marginTop: theme.spacing(3),
            padding:" 10vh 60vh",
            backgroundColor:"white",
            zIndex:"3",
        },
        submit:{
            marginTop: "3vh"
        }
    })
)
const UserEdit = ({classes, ads} )=> {
    const[id,setId] = useState("");
    const[userEmail,setUserEmail] = useState("");
    const[name,setName] = useState("");
    const[occupation,setOccupation] = useState("");
    const[motto,setMotto] = useState("");
    const[isVip,setIsVip] = useState(false);
    const[image,setImage] = useState("");
    const [vip,setVip] =useState(false);
    const [openAlert,setOpenAlert] =useState(false);


    const handleSubmit= event=> {
        event.preventDefault();
        const userInfo = {
            id: id,
            userEmail: userEmail,
                name:name,
                occupation:occupation,
                motto:motto,
                isVip:isVip,
                image:image,
                vip:isVip
        };
        baseUrl.put('usersinfo',userInfo).then(
            res => {
                setOpenAlert(true)
                if(res.data ==null){

                }
            });

    }
    const  fileSelectorHandler = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => { setImage(reader.result);
        };


    } // selectFile

    useEffect(() => {
        auth.onAuthStateChanged( user=> {
            if (user) {
                baseUrl.get(`usersinfo/${user.uid}`).then(
                    res=>{
                        console.log(res.data);
                        setId(res.data.id);
                        setName(res.data.name);
                        setUserEmail(res.data.userEmail);
                        setOccupation(res.data.occupation);
                        setMotto(res.data.motto);
                        setIsVip(res.data.isVip);
                        setImage(res.data.image);
                        setVip(res.data.vip);
                    }
                );
            } else {
                console.log("no user ");
            }
        });

    },[]);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        //SetError(false);
        setOpenAlert(false);
    };
    const   Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    return(
        <React.Fragment>
            <AppAppBarColor/>
            <CssBaseline />
            <Container style={{marginTop:100}} >
                <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        <strong>Update Success!</strong>
                    </Alert>
                </Snackbar>
                <form className={classes.form}  onSubmit={handleSubmit} >
                    <Grid container spacing={2} justify="center">
                        <Grid item >
                            <Typography variant="h5" color="textSecondary" >
                                Profile Info
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="name"
                                       value = {name}
                                       fullWidth
                                       label="Name"
                                       margin="normal"
                                       onChange={e=>setName(e.target.value)}/>
                        </Grid>

                        <Grid item xs={12} style={{display:"flex", alignItems:"center"}}>
                            <span style={{marginRight: "20px",}}>
                                <AddAPhoto/>
                            </span>
                            <input  type="file" onChange={fileSelectorHandler } name="d"/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="date_input"
                                value={userEmail}
                                label="Email"
                                fullWidth
                                margin="normal"
                                //   className={classes.textField}
                                onChange={e=>setUserEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="date_input"
                                value={occupation}
                                label="Occupation"
                                margin="normal"
                                //   className={classes.textField}
                                fullWidth
                                onChange={e=>setOccupation(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                fullWidth
                                defaultValue=""
                                variant="outlined"
                                value = {motto}
                                label="Motto"
                                margin="normal"
                                onChange={e=>setMotto(e.target.value)}
                            />
                        </Grid>

                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>

                </form>

            </Container>

        </React.Fragment>
    );
}
export default withStyles(styles)(UserEdit);