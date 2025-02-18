import React,{useState,useEffect} from "react";
import {Container,Grid,CssBaseline,TextField ,withStyles,createStyles,Button} from "@material-ui/core";
import AppAppBar from "../LandingPage/Sections/AppAppBar";
import AdsBanner from "../../components/modules/views/AdsBanner";
import AdsListAll from "../../components/modules/views/AdsListAll";
import AppFooter from "../../components/modules/views/AppFooter";


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
 

const AdsPage = ({classes}) =>{
    // let windowScrollTop= 0;
    // if (window.innerWidth >= 768) {
    //     // windowScrollTop = window.pageYOffset / 3;
    //     window.scrollTo(0, 0);
    // }
return(
   <React.Fragment>
       <AppAppBar  changeColorOnScroll={{
          height: 400,
          color: "white"
        }}/>
        <AdsBanner/>
        <AdsListAll/>
       <AppFooter />
   </React.Fragment>

)
    
}
export default withStyles(styles)(AdsPage);