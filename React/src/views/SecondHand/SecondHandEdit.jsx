import React,{useState,useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {Container,Grid,CssBaseline,TextField ,withStyles,createStyles,Button} from "@material-ui/core";
import baseUrl from "../../baseURL";
import { useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar" ;
import MuiAlert from '@material-ui/lab/Alert';
import AppAppBarColor from "../LandingPage/Sections/AppAppBarColor";
import AddAPhoto from "@material-ui/icons/AddAPhoto";

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
const AdsEdit = ({classes, ads} )=> {
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[date,setDate] = useState(currentDate);
    const[price,setPrice] = useState();
    const[quantity,setQuantity] = useState();
    const[image,setImage] = useState("");
    const[id,setId] = useState();
    const [openAlert,setOpenAlert] =useState(false);
    const [message,setMessage] =useState("");


    const location = useLocation();
   
    const handleSubmit= event=> {
      event.preventDefault();
      const item = {
          id: id,
          name: name,
          description:description,
          price:price,
          quantity:quantity,
          podate: date,
          image:image
       };
      baseUrl.put('secondHand',item).then(
        res => {
            setMessage("Update Success!")
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
        if(location!==null){
          let secondhand = location.state.detail;
          if(secondhand!==undefined){
          setName(secondhand.name);
          setDescription(secondhand.description);
          setDate(secondhand.podate);
          setPrice(secondhand.price);
          setQuantity(secondhand.quantity);
          setId(secondhand.id);
          setImage(secondhand.image);
          }
        }
     }, [location]);

    const  allnumeric = (inputtxt) => {
        var numbers = /^[0-9]+$/;
        if(inputtxt.match(numbers))
            return true;
        else
        {
            setMessage("Please input numeric characters only!")
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
            <strong>{message}</strong>
         </Alert>
        </Snackbar>
        <form className={classes.form}  onSubmit={handleSubmit} >
                <Grid container spacing={2} justify="center">
                    <Grid item >
                        <Typography variant="h5" color="textSecondary" >
                            Edit SecondHand
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
                        <input  type="file" onChange={fileSelectorHandler } />
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
                            value={date}
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
                            Update
                        </Button>
                    </Grid>
                </Grid>

            </form>

            {/*  <form className={classes.form}  onSubmit={handleSubmit} >*/}
      {/*   <Grid container spacing={2} justify="center">*/}

      {/*      <Grid item >*/}
      {/*      <Typography variant="h5" color="textSecondary" >*/}
      {/*     Edit SecondHand*/}
      {/*     </Typography> */}
      {/*  </Grid>*/}
      {/*  /!* <img src={image}/> *!/*/}
      {/*  <Grid item xs={12}>*/}
      {/*  <Typography>*/}
      {/*    Name*/}
      {/*  </Typography>*/}
      {/*  <TextField id="outlined-basic"  */}
      {/*              variant="outlined" */}
      {/*              required*/}
      {/*              value = {name}*/}
      {/*              onChange={e=>setName(e.target.value)}/>*/}
      {/*  </Grid>*/}

      {/*  <Grid item xs={12}>*/}
      {/*      <input  type="file" onChange={fileSelectorHandler } name="d"/>*/}
      {/*  </Grid>*/}


      {/*  <Grid item xs={12}>   */}
      {/*  <Typography>*/}
      {/*      Description*/}
      {/*  </Typography>*/}
      {/*  <TextField*/}
      {/*    id="outlined-multiline-static"*/}
      {/*    multiline*/}
      {/*    rows={4}*/}
      {/*    required*/}
      {/*    defaultValue=""*/}
      {/*    variant="outlined"*/}
      {/*    value = {description}*/}
      {/*    onChange={e=>setDescription(e.target.value)}*/}
      {/*  />*/}
      {/*  </Grid>*/}

      {/*  <Grid item xs={12}>*/}
      {/*  <Typography>*/}
      {/*    Date   */}
      {/*   </Typography>*/}
      {/*  <TextField*/}
      {/*  id="date_input"*/}
      {/*  type="date"*/}
      {/*  defaultValue={date}*/}
      {/*  value={date}*/}
      {/*//   className={classes.textField}*/}
      {/*  InputLabelProps={{*/}
      {/*    shrink: true,*/}
      {/*  }}*/}
      {/*  onChange={e=>setDate(e.target.value)}*/}
      {/* />*/}
      {/*  </Grid>*/}

      {/*  <Grid item xs={12}>*/}
      {/*   <Typography>*/}
      {/*       Price*/}
      {/*   </Typography>*/}
      {/*   <TextField id="outlined-basic"  */}
      {/*              variant="outlined"*/}
      {/*              value = {price}*/}
      {/*              onChange={e=> {*/}
      {/*                  if( allnumeric(e.target.value) )*/}
      {/*                      setPrice(e.target.value);*/}
      {/*                  else setPrice("");*/}
      {/*              }}*/}
      {/*               />*/}

      {/*  </Grid>*/}
      {/*  <Grid item xs={12}>*/}
      {/*           <Typography>*/}
      {/*               Quantity*/}
      {/*           </Typography>*/}
      {/*           <TextField id="outlined-basic"*/}
      {/*                      variant="outlined"*/}
      {/*                      required*/}
      {/*                      value = {quantity}*/}
      {/*                      onChange={e=>{  if( allnumeric(e.target.value) )*/}
      {/*                          setQuantity(e.target.value); else setQuantity("")}}/>*/}
      {/*       </Grid>*/}

      {/*  <Grid item>*/}
      {/*    <Button*/}
      {/*      type="submit"           */}
      {/*      variant="contained"*/}
      {/*      color="primary"*/}
      {/*      className={classes.submit}*/}
      {/*    >*/}
      {/*      Update*/}
      {/*    </Button>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      {/*</form>*/}
      
    </Container>
       
    </React.Fragment>
   );
}
 export default withStyles(styles)(AdsEdit);