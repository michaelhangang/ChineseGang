import React,{useState,useLayoutEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link,Redirect,useHistory  } from "react-router-dom";
import auth from "../../FirebaseConfig";
import MuiAlert from '@material-ui/lab/Alert';
import AppAppBar from "../LandingPage/Sections/AppAppBar";
import { DataGrid, ColDef,CellParams ,GridApi} from '@material-ui/data-grid';
import baseUrl from "../../baseURL";
import { ReorderSharp } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar" ;
import AppAppBarColor from "../LandingPage/Sections/AppAppBarColor";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link  to="/" color="inherit" >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const styles = createStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: 20,
  },
}));

 const  AdsList = (classes) => {
   const[rows,setRows] = useState ([]); 
   const [selectedAd, setSelection] = useState();
   const history = useHistory();
   const [openAlert,setOpenAlert] =useState(false);
   const columns = [
    { field: 'title', headerName: 'TITLE', width: 270 ,disableClickEventBubbling: true,},
    { field: 'contact', headerName: 'CONTACT', width: 270,disableClickEventBubbling: true, },
    { field: 'podate', headerName: 'DATE', width: 270,disableClickEventBubbling: true, },
    { field: 'id', headerName: 'ID', width: 270,hide:true },
    { field: 'image', headerName: 'IMAGE', width: 270 ,hide:true},
    { field: 'content', headerName: 'CONTENT', width: 270 ,hide:true},
  
    {
      field: "action",
      headerName: "ACTION",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow = {};
  
          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });
  
          setSelection(thisRow);
          history.push({
            pathname: '/AdsEdit',
            search: '?query=abc',
            state: { detail: thisRow }
        });
         
        };
  
        return <Button onClick={onClick}>Edit</Button>;
      }},

      {
        field: "action1",
        headerName: "ACTION",
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const onClick = () => {
            const api = params.api;
            const fields = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && !!c);
            const thisRow = {};
    
            fields.forEach((f) => {
              thisRow[f] = params.getValue(f);
            });
    
            setSelection(thisRow);
            baseUrl.delete(`information/${thisRow.id}`).then(res=>{
              let ads =  res.data;
              setOpenAlert(true);
              if(ads !==null){
                 
              }
             });  
          };
    
          return <Button onClick={onClick}>Delete</Button>;
        }}
  ];
  const   Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
  };
  
   useLayoutEffect(()=>{
    baseUrl.get('information').then(res=>{
     let ads =  res.data;
     if(ads !==null){
       setRows(ads);
     }
    });  
  });
  
  
  
  return(
    <React.Fragment>
      <AppAppBarColor></AppAppBarColor>
        <CssBaseline />
        <Container style={{marginTop:120}}>
        <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="success">
            <strong>Delete Success!</strong>
        </Alert> 
        </Snackbar>
          <Grid container spacing={2} justify="center">

           <Grid item>
            {/* <Typography style={{marginTop:30}}> */}
            <Typography variant="h5" color="textSecondary" align="center" style={{marginTop:90, marginBottom:30}}>
              Ads  
            </Typography> 
           </Grid>
          
         <div style={{ height: 450, width: '100%' }}>
             <DataGrid rows={rows} columns={columns} pageSize={8}   onRowClick={(newSelection) => {
             setSelection(newSelection); 
          }} />  
          </div>    
          </Grid>
       </Container>     
   </React.Fragment>
  );
}
export default withStyles(styles)(AdsList);