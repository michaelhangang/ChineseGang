import React,{useState,useEffect} from "react";
import {Container,Grid,CssBaseline,TextField ,withStyles,createStyles,Button} from "@material-ui/core";
import UserVip from "../../components/modules/views/UserVip";
import AppAppBarColor from "../LandingPage/Sections/AppAppBarColor";


const styles = createStyles((theme) =>({
    form:{
       width: "100%", 
       marginTop: theme.spacing(33),
       padding:"10vh",
       backgroundColor:"white",
       zIndex:"3"
    }
 })
 )

const UserVipPage = ({classes}) =>{

return(

   <React.Fragment>
       <AppAppBarColor />
        <UserVip />
   </React.Fragment>

)
    
}
export default withStyles(styles)(UserVipPage);