import React,{ useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import { Link,useHistory  } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);
const ModelSecondHand = ({publisherID,name, description, price,quantity,podate}) =>{
    const [classicModal, setClassicModal] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const linkToProfile = ()=>{
        history.push({
            pathname: '/userProfilePage',
            search: '?query=abc',
            state: { detail: publisherID }
        });
    }
    return (
        <div>
            <Button
               // color="primary"
                block
                onClick={() => setClassicModal(true)}
            >
                <LibraryBooks className={classes.icon} />
                Details
            </Button>

            <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal
                }}
                open={classicModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setClassicModal(false)}
                aria-labelledby="classic-modal-slide-title"
                aria-describedby="classic-modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setClassicModal(false)}
                    >
                        <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle} style={{textAlign:"center"}}>{name}</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                    <p style={{overflowWrap:"anywhere"}}>
                        {description}
                    </p>
                    <p>
                        ${price} X {quantity}
                    </p>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", marginTop:"7vh"}}>

                        {podate}


                    </div>
                </DialogContent>
                <DialogActions className={classes.modalFooter} style={{alignItems:"baseline"}}>
                    {/*<Link style={{textDecoration:"none",textTransform: "capitalize",}} to={"/UserProfilePage"}>*/}
                        <Button color="transparent" style={{textTransform: "capitalize",color:"purple"}} onClick={linkToProfile}>
                           Publisher Profile
                        </Button>
                    {/*</Link>*/}
                    <Button
                        onClick={() => setClassicModal(false)}
                        color="danger"
                        simple
                        style={{color:"red"}}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )

}


export default  ModelSecondHand;