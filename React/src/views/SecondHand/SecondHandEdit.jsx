import React,{useState,useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {Container,Grid,CssBaseline,TextField ,withStyles,createStyles,Button} from "@material-ui/core";
import baseUrl from "../../baseURL";
import { useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar" ;
import MuiAlert from '@material-ui/lab/Alert';
import AppAppBarColor from "../LandingPage/Sections/AppAppBarColor";

const  today = new Date();
const  currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const styles = createStyles((theme) =>({
   form:{
      width: "100%", 
      marginTop: theme.spacing(3),
      padding:"10vh",
      backgroundColor:"white",
      zIndex:"3"
   }
})
)
const AdsEdit = ({classes, ads} )=> {
    const[title,setTitle] = useState("");
    const[content,setContent] = useState("");
    const[date,setDate] = useState(currentDate);
    const[contact,setContact] = useState("");
    const[image,setImage] = useState("");
    const[id,setId] = useState();
    const[file,setFile] = useState();
    const [openAlert,setOpenAlert] =useState(false);


    const location = useLocation();
   
    const handleSubmit= event=> {
      event.preventDefault();
      const ads = {
        id: id,
        title: title,
        content:content,
        contact:contact,
        podate: date,
        image:image
       };
      baseUrl.put('information',ads).then(
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
        if(location!==null){
          let ad = location.state.detail;
          if(ad!==undefined){
          setTitle(ad.title);
          setContent(ad.content);
          setDate(ad.podate);
          setContact(ad.contact);
          setId(ad.id);
          setImage(ad.image);
          }
        }
     }, [location]);

     const dataURLtoFile= (dataurl, filename)=> {
     
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
          
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new File([u8arr], filename, {type:mime});
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
            <strong>Update Success!</strong>
        </Alert> 
        </Snackbar>
        <form className={classes.form}  onSubmit={handleSubmit} >
         <Grid container spacing={2} justify="center">

            <Grid item >
            <Typography variant="h5" color="textSecondary" >
           Edit SecondHand
           </Typography> 
        </Grid>
        {/* <img src={image}/> */}
        <Grid item xs={12}>
        <Typography>
          Title
        </Typography>
        <TextField id="outlined-basic"  
                    variant="outlined" 
                    required
                    value = {title}
                    onChange={e=>setTitle(e.target.value)}/>
        </Grid>

        <Grid item xs={12}>
            <input  type="file" onChange={fileSelectorHandler } name="d"/>
        </Grid>


        <Grid item xs={12}>   
        <Typography>
            Content
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          required
          defaultValue=""
          variant="outlined"
          value = {content}
          onChange={e=>setContent(e.target.value)}
        />
        </Grid>

        <Grid item xs={12}>
        <Typography>
          Date   
         </Typography>
        <TextField
        id="date_input"
        type="date"
        defaultValue={date}
        value={date}
      //   className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e=>setDate(e.target.value)}
       />
        </Grid>

        <Grid item xs={12}>
         <Typography>
          Contact 
         </Typography>
         <TextField id="outlined-basic"  
                    variant="outlined"
                    value = {contact}
                    onChange={e=>setContact(e.target.value)}
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
 export default withStyles(styles)(AdsEdit);