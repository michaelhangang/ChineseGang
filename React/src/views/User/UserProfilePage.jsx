import React ,{useState,useEffect}from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import classNames from "classnames";
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Parallax from "../../components/Parallax";
import NavPills from "../../components/NavPills";
import AppAppBar from "../LandingPage/Sections/AppAppBar";
import AppFooter from "../../components/modules/views/AppFooter";
import auth from "../../FirebaseConfig";
import {Helmet} from "react-helmet";
import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
import baseUrl from "../../baseURL";
import { useLocation } from "react-router-dom";
import ModelSecondHand from "../../components/ModelSecondHand";
import Container from "@material-ui/core/Container";
import {HeaderCheckbox} from "@material-ui/data-grid";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(styles);

const UserProfilePage = (props) =>{
    const location = useLocation();
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    const[userEmail,setUserEmail] = useState("");
    const[name,setName] = useState("");
    const[occupation,setOccupation] = useState("");
    const[motto,setMotto] = useState("");
    const[isVip,setIsVip] = useState(false);
    const[image,setImage] = useState("");
    const[secondhandData,setRows] = useState ();
    const[socialMedia,setSocialMedia] = useState ();

    useEffect(() => {
            if(location.state!==undefined){
                let uid = location.state.detail;
                baseUrl.get(`usersinfo/${uid}`).then(
                    res=>{
                        setName(res.data.name);
                        setUserEmail(res.data.userEmail);
                        setOccupation(res.data.occupation);
                        setMotto(res.data.motto);
                        setIsVip(res.data.isVip);
                        setImage(res.data.image);
                        setSocialMedia(res.data.socialMedia);
                        if(res.data.isVip){
                            baseUrl.get('secondHand').then(resd=>{
                                let items =  resd.data;
                                if(items !==null){
                                    let newitems = [];
                                        items.reverse().forEach((item,index)=>{
                                          if (item.publisherID == uid)
                                              newitems.push(item);
                                    });
                                    setRows(newitems);
                                }


                            });
                        }
                    }
                );


            }else {
                auth.onAuthStateChanged( user=> {
                    if (user) {
                        baseUrl.get(`usersinfo/${user.uid}`).then(
                            res=>{
                                setName(res.data.name);
                                setUserEmail(res.data.userEmail);
                                setOccupation(res.data.occupation);
                                setMotto(res.data.motto);
                                setIsVip(res.data.isVip);
                                setImage(res.data.image);
                                setSocialMedia(res.data.socialMedia);
                                if(res.data.isVip){
                                    baseUrl.get('secondHand').then(resd=>{
                                        let items =  resd.data;
                                        if(items !==null){
                                            let newitems = [];
                                            items.reverse().forEach((item,index)=>{
                                                if (item.publisherID == user.uid)
                                                    newitems.push(item);
                                            });
                                            if(newitems.length!==0)
                                            setRows(newitems);
                                        }


                                    });
                                }

                            }
                        );
                    } else {
                        console.log("no user ");
                    }
                });
            }

    },[location]);


    return (
        <div>
            <AppAppBar changeColorOnScroll={{
                height: 250,
                color: "white"
            }}/>
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={12} md={6}>
                                <div className={classes.profile}>

                                    <div>
                                        <img src={image} alt="..." className={imageClasses}/>
                                    </div>

                                    <div className={classes.name}>
                                        <h2 className={classes.title}>{name}</h2>
                                        <h5>{occupation}</h5>
                                        <h4>{userEmail}</h4>

                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-twitter"} />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-instagram"} />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={"fab fa-facebook"} />
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <div className={classes.description}>
                            <p>
                                {motto}
                            </p>
                        </div>

                        {isVip&&socialMedia&&<iframe allowFullScreen id="wallsio-iframe" src={socialMedia}
                                style={{border:"0",margin:"8vh auto" , height:"450px",width:"100%"}} loading="lazy" title="My social wall"></iframe>}

                        {secondhandData &&isVip&&
                            <div>
                        <Typography variant="h5" style={{textAlign:"center", fontWeight:"700", margin:"5vh auto"}} >SecondHand Center </Typography>
                        <Grid container spacing={5} style={{margin:"5vh auto"}}>

                            {secondhandData.map(item =>
                                <Grid item xs={12} md={3}>
                                    <div className={classes.item}>
                                        <img
                                            className={classes.image}
                                            src={item.image}
                                            alt="suitcase"
                                        />
                                        <ModelSecondHand publisherID={item.publisherID} name={item.name}
                                                         description={item.description} price={item.price}
                                                         quantity={item.quantity} podate={item.podate}/>

                                    </div>
                                </Grid>)
                            }
                        </Grid></div>}
                        {/*<Grid container justify="center">*/}
                        {/*    <Grid item  xs={12} sm={12} md={8} className={classes.navWrapper}>*/}
                        {/*        <NavPills*/}
                        {/*            alignCenter*/}
                        {/*            color="primary"*/}
                        {/*            tabs={[*/}
                        {/*                {*/}
                        {/*                    tabButton: "Studio",*/}
                        {/*                    tabIcon: Camera,*/}
                        {/*                    tabContent: (*/}
                        {/*                        <Grid container justify="center">*/}
                        {/*                            <Grid item xs={12} sm={12} md={4}>*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={studio1}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                                /!*<img*!/*/}
                        {/*                                /!*    alt="..."*!/*/}
                        {/*                                /!*    src={studio2}*!/*/}
                        {/*                                /!*    className={navImageClasses}*!/*/}
                                                        {/*/>*/}
                        {/*                            </Grid>*/}
                        {/*                            <Grid item xs={12} sm={12} md={4}>*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={studio5}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={studio4}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                            </Grid>*/}
                        {/*                        </Grid>*/}
                        {/*                    ),*/}
                        {/*                },*/}
                        {/*                {*/}
                        {/*                    tabButton: "Work",*/}
                        {/*                    tabIcon: Palette,*/}
                        {/*                    tabContent: (*/}
                        {/*                        <Grid container justify="center">*/}
                        {/*                            <Grid item xs={12} sm={12} md={4}>*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={work1}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={work2}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={work3}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                            </Grid>*/}
                        {/*                            <Grid item xs={12} sm={12} md={4}>*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={work4}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={work5}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                            </Grid>*/}
                        {/*                        </Grid>*/}
                        {/*                    ),*/}
                        {/*                },*/}
                        {/*                {*/}
                        {/*                    tabButton: "Favorite",*/}
                        {/*                    tabIcon: Favorite,*/}
                        {/*                    tabContent: (*/}
                        {/*                        <Grid container justify="center">*/}
                        {/*                            <Grid item xs={12} sm={12} md={4}>*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={work4}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={studio3}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                            </Grid>*/}
                        {/*                            <Grid item xs={12} sm={12} md={4}>*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={work2}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={work1}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                                <img*/}
                        {/*                                    alt="..."*/}
                        {/*                                    src={studio1}*/}
                        {/*                                    className={navImageClasses}*/}
                        {/*                                />*/}
                        {/*                            </Grid>*/}
                        {/*                        </Grid>*/}
                        {/*                    ),*/}
                        {/*                },*/}
                        {/*            ]}*/}
                        {/*        />*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>)
}
export default UserProfilePage;