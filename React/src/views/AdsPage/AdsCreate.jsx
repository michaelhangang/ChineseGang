import React,{useState,useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {Container,Grid,CssBaseline,TextField ,withStyles,createStyles,Button} from "@material-ui/core";
import baseUrl from "../../baseURL";
import { Link,Redirect,useHistory  } from "react-router-dom";
import AppAppBarColor from "../LandingPage/Sections/AppAppBarColor";
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
   }
})
)
const AdsCreate = ({classes} )=> {
    const[title,setTitle] = useState("");
    const[content,setContent] = useState("");
    const[date,setDate] = useState(currentDate);
    const[contact,setContact] = useState("");
    const[image,setImage] = useState("");
    const history = useHistory();
    const[publisher,setPublisher] = useState();

    useEffect(() => {
        auth.onAuthStateChanged( user=> {
            if (user) {
                setPublisher(user.uid);
            } else {
                console.log("no user ");
            }
        });

    },[]);

    const handleSubmit= event=> {
      event.preventDefault();
      const ads = {
        title: title,
        content:content,
        contact:contact,
        podate: date,
        image:image,
        publisherID:publisher
       };
      baseUrl.post('information',ads).then(
        res => {
          if(res.data ==null){

          }
        });
        history.push("/AdsList");
    }
   const  fileSelectorHandler = (event) => {
      const file = event.target.files[0];
      // setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => { setImage(reader.result); 
      };
      
      
      } // selectFile
   
   return(
      <React.Fragment>
        <AppAppBarColor/>
         <CssBaseline />
        <Container  style={{marginTop:100}}>

        <form className={classes.form}  onSubmit={handleSubmit} >
         <Grid container spacing={2} justify="center">
            <Grid item >
         <Typography variant="h5" color="textSecondary" >
           Create Ads
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
               <input  type="file" onChange={fileSelectorHandler } required/>
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
        defaultValue={date}
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
            Create
          </Button>
        </Grid>
      </Grid>

      </form>
    </Container>
       
    </React.Fragment>
   );
}
 export default withStyles(styles)(AdsCreate);