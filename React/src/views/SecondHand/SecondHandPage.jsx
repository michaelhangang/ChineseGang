import React from "react";
import { withStyles,createStyles} from "@material-ui/core";
import AppAppBar from "../LandingPage/Sections/AppAppBar";
import SecondHandBanner from "../../components/modules/views/SecondHandBanner";
import SecondHandListAll from "../../components/modules/views/SecondHandListAll";
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

const SecondHandPage = ({classes}) =>{
    // let windowScrollTop= 0;
    // if (window.innerWidth >= 768) {
    //     // windowScrollTop = window.pageYOffset / 3;
    //     window.scrollTo(0, 0);
    // }
    return(
   <React.Fragment>
       <AppAppBar   changeColorOnScroll={{
          height: 400,
          color: "white"
        }}/>
        <SecondHandBanner/>
        <SecondHandListAll/>
       <AppFooter />
   </React.Fragment>

)
    
}
export default withStyles(styles)(SecondHandPage);