import React,{useState,useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {Container,Grid,CssBaseline,TextField ,withStyles,createStyles,Button} from "@material-ui/core";
import baseUrl from "../../baseURL";
import { Link,Redirect,useHistory  } from "react-router-dom";
import AppAppBarColor from "../LandingPage/Sections/AppAppBarColor";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import auth from "../../FirebaseConfig";

const  today = new Date();
const  currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const styles = createStyles((theme) =>({
   form:{
      width: "100%", 
      marginTop: theme.spacing(3),
      padding:"10vh 60vh",
      backgroundColor:"white",
      zIndex:"3"
   },
        submit:{
            marginTop: "3vh"
        }
})

)
const   Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AdsCreate = ({classes} )=> {
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[date,setDate] = useState(currentDate);
    const[price,setPrice] = useState();
    const[quantity,setQuantity] = useState();
    const[image,setImage] = useState("");
    const[publisher,setPublisher] = useState();
    const history = useHistory();
    const [openAlert,setOpenAlert] =useState(false);

   
    const handleSubmit= event=> {
      event.preventDefault();
        if(publisher!==undefined){
            const item = {
                name: name,
                description:description,
                price:price,
                quantity:quantity,
                podate: date,
                image:image,
                publisherID:publisher
            };


            baseUrl.post('secondHand',item).then(
                res => {
                    if(res.data ==null){

                    }
                });
            history.push("/SecondHandList");

        }

    }

    const  fileSelectorHandler = (event) => {
      const file = event.target.files[0];
    //  setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => { setImage(reader.result); 
      };
      } // selectFile

    const  allnumeric = (inputtxt) => {
        var numbers = /^[0-9]+$/;
        if(inputtxt.match(numbers))
            return true;
        else
        {
            setOpenAlert(true);
            return false;
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        //SetError(false);
        setOpenAlert(false);
    };

    useEffect(() => {
        auth.onAuthStateChanged( user=> {
            if (user) {
                setPublisher(user.uid);

            } else {
                console.log("no user ");
            }
        });

    },[]);

    return(
      <React.Fragment>
        <AppAppBarColor/>
         <CssBaseline />
        <Container  style={{marginTop:100}}>
        <form className={classes.form}  onSubmit={handleSubmit} >
         <Grid container spacing={2} justify="center">
            <Grid item >
         <Typography variant="h5" color="textSecondary" >
           Create SecondHand
        </Typography> 
        </Grid>
       
        <Grid item xs={12}>

        <TextField id="outlined-basic"  
                    fullWidth
                    label="Name"
                   margin="normal"
                    required
                    value = {name}
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
          id="outlined-multiline-static"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          label="Description"
          required
          defaultValue=""
          variant="outlined"
          value = {description}
          onChange={e=>setDescription(e.target.value)}
        />
        </Grid>

        <Grid item xs={12}>
        <TextField
        id="date"
        type="date"
        required
        fullWidth
        label="Date"
        margin="normal"
        defaultValue={date}
      //   className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e=>setDate(e.target.value)}
       />
        </Grid>

        <Grid item xs={6}>
         <TextField id="outlined-basic"
                    required
                    fullWidth
                    label="Price"
                  //  margin="normal"
                    value = {price}
                    onChange={e=> {
                        if( allnumeric(e.target.value) )
                        setPrice(e.target.value);
                        else setPrice("");
                    }
                        }/>
        </Grid>
        <Grid item xs={6}>
                 <TextField id="outlined-basic"
                            required
                            fullWidth
                            label="Quantity"
                     //       margin="normal"
                            value = {quantity}
                            onChange={e=>{  if( allnumeric(e.target.value) )
                                             setQuantity(e.target.value); else setQuantity("")}}/>
        </Grid>

        <Grid item>
          <Button
            type="submit"           
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </Grid>
      </Grid>

      </form>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    <strong>Please input numeric characters only!</strong>
                </Alert>
            </Snackbar>
    </Container>
       
    </React.Fragment>
   );
}
 export default withStyles(styles)(AdsCreate);