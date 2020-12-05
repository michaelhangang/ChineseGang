import React,{useState,useEffect} from "react";
import {Container,Grid,CssBaseline,TextField ,withStyles,createStyles,Button} from "@material-ui/core";
import AppAppBar from "../LandingPage/Sections/AppAppBar";
import SecondHandBanner from "../../components/modules/views/SecondHandBanner";
import SecondHandListAll from "../../components/modules/views/SecondHandListAll";


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
 

const SecondHandPage = ({classes}) =>{
return(
   <React.Fragment>
       <AppAppBar  changeColorOnScroll={{
          height: 400,
          color: "white"
        }}/>
        <SecondHandBanner/>
        <SecondHandListAll/>
   </React.Fragment>

)
    
}
export default withStyles(styles)(SecondHandPage);