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
    const [openAlert,setOpenAlert] =useState(false);
    const[publisher,setPublisher] = useState();


    const location = useLocation();
   
    const handleSubmit= event=> {
      event.preventDefault();
      const ads = {
        id: id,
        title: title,
        content:content,
        contact:contact,
        podate: date,
        image:image,
        publisherID:publisher

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
          setTitle(ad.title);
          setContent(ad.content);
          setDate(ad.podate);
          setContact(ad.contact);
          setId(ad.id);
          setImage(ad.image);
          setPublisher(ad.publisherID);
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
                            Edit Ads
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic"
                                   fullWidth
                                   required
                                   value = {title}
                                   label = "Title"
                                   margin="normal"
                                   onChange={e=>setTitle(e.target.value)}/>
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
                            required
                            defaultValue=""
                            variant="outlined"
                            value = {content}
                            label = "Content"
                            margin="normal"
                            fullWidth
                            onChange={e=>setContent(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="date"
                            type="date"
                            required
                            label = "Date"
                            margin="normal"
                            fullWidth
                            value={date}
                            //   className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e=>setDate(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic"
                                   required
                                   value = {contact}
                                   label = "Contact"
                                   margin="normal"
                                   fullWidth
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