import React,{ useState, useEffect } from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(styles);
const Model = ({title, contact, content,podate,theme}) =>{
    const [classicModal, setClassicModal] = useState(false);
    const classes = useStyles();
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
                    <h4 className={classes.modalTitle} style={{textAlign:"center"}}>{title}</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                    <p style={{overflowWrap:"anywhere"}}>
                        {content}
                    </p>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", marginTop:"7vh"}}>

                        {podate}

                        <p>
                        {contact}
                         </p>
                    </div>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    {/*<Button color="transparent" simple>*/}
                    {/*    Nice Button*/}
                    {/*</Button>*/}
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


export default  Model;