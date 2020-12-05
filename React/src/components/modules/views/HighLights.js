import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import {Link} from "react-router-dom";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover": {
      zIndex: 1,
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15,
    },
    "&:hover $imageMarked": {
      opacity: 0,
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor",
    },
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
});

function HightLights(props) {
  const { classes } = props;

  const images = [
    {
      url:
        "https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=80",
      title: "Snorkeling",
      width: "40%",
      weburl:"https://www.seacology.org/travel/?gclid=Cj0KCQiA2af-BRDzARIsAIVQUOf9RLolE89A19bYrlYtfZ8_5R4lQ2otTzYErNwFNgTFQMGz2WKKfSIaAqE2EALw_wcB"
    },
    {
      url:
        "https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400&q=80",
      title: "Massage",
      width: "20%",
      weburl:"https://www.groupon.com/browse/london?topcategory=local&subcategory=massage&utm_source=google&utm_medium=cpc&utm_campaign=us_dt_sea_ggl_txt_txn_sr_cbp_ch1_nbr_k*massage_m*b_d*US-BS-Geocat-catch-all_g*bs-l3-massage-catch-all-broad_c*482664698760_ap*_t*kwd-10647421_acc*sa360-us-new-geocat-beauty-spas&loc_physical_ms=9001075&loc_interest_ms=&device=c&devicemodel=&campaignid=11488175242&adgroupid=113375400226&ds_aid=700000002103326&ds_acctype=GOOGLE&ds_cid=71700000074811214&ds_agid=58700006533291560&ds_k=massage&ds_kid=43700059076975560&ds_kids=p59076975560&acc=sa360-us-new-geocat-beauty-spas&gclick=Cj0KCQiA2af-BRDzARIsAIVQUOfMsNLdFlOkgP23iW8Tp4eIlLP2CXCqsu7CSUywiqPPU67HDogfkLwaAleEEALw_wcB&gclid=Cj0KCQiA2af-BRDzARIsAIVQUOfMsNLdFlOkgP23iW8Tp4eIlLP2CXCqsu7CSUywiqPPU67HDogfkLwaAleEEALw_wcB"
    },
    {
      url:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80",
      title: "Hiking",
      width: "40%",
      weburl:"https://greatlakes.guide/ideas/how-to-choose-a-hiking-trail?gclid=Cj0KCQiA2af-BRDzARIsAIVQUOd1_l0mNqqx80B5V-Puf4Y8X5JY288K6sZ7tpoUcQTsbPJaz-pBhaEaAjbQEALw_wcB"
    },
    {
      url:
        "https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400&q=80",
      title: "Tour",
      width: "38%",
      weburl:"https://www.undiscovered-destinations.com/?gclid=Cj0KCQiA2af-BRDzARIsAIVQUOe85UP7J6R9cVMDv8UTeVmLTleuuxYCLzb38nxlUQbwqMvKhxpVhdEaAqwQEALw_wcB"
    },
    {
      url:
        "https://images.unsplash.com/photo-1523309996740-d5315f9cc28b?auto=format&fit=crop&w=400&q=80",
      title: "Gastronomy",
      width: "38%",
      weburl:"https://chefconnexion.com/?gclid=Cj0KCQiA2af-BRDzARIsAIVQUOeOBaHBRgp6vaeR2mbx-Prp3pEK1Acc5XMn1Hs2SYL09wGvnCrUdEAaAvekEALw_wcB"
    },
    {
      url:
        "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400&q=80",
      title: "Shopping",
      width: "24%",
      weburl:"https://www.shopify.ca/free-trial?&term=website%20store&Network=Search&SiteTarget=&mt=b&adid=368509632417&device=c&test=&adpos=&CampaignId=1690202544&gclid=Cj0KCQiA2af-BRDzARIsAIVQUOcEMOKzw9jflIOkbRf-QLq4Ek_wCzNrb3fNCocW7y2TKNHlqPup-T8aAsSMEALw_wcB&gclsrc=aw.ds"
    },
    {
      url:
        "https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400&q=80",
      title: "Walking",
      width: "40%",
      weburl:"https://www.consumersearch.com/web?qo=semQuery&ad=semA&q=walks%20nearby&o=1221283&ag=fw4&an=google_s&adid=438465400509&agid=101297850425&campaignid=10170112987&clickid=Cj0KCQiA2af-BRDzARIsAIVQUOcXyE_157tLCo20hZrXyLUTUWK7-YKkhcyIoioUm8H4nNZprgWm4AcaAitrEALw_wcB&clid=aj-faqtoids-intl2&gclid=Cj0KCQiA2af-BRDzARIsAIVQUOcXyE_157tLCo20hZrXyLUTUWK7-YKkhcyIoioUm8H4nNZprgWm4AcaAitrEALw_wcB&kwid=kwd-315756918885&rch=intl226&utm_medium=gcpc&utm_source=g"
    },
    {
      url:
        "https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400&q=80",
      title: "Fitness",
      width: "20%",
      weburl:"http://www.bethanimalprint.com/"
    },
    {
      url:
        "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400&q=80",
      title: "Reading",
      width: "40%",
      weburl:"https://code.ngo/approach/literacy-programs/?gclid=Cj0KCQiA2af-BRDzARIsAIVQUOdeRkjSV6rajf5TPjg61BfMBl-05-FiIgF46D7f0Fba_RB4Zt9vlVYaAgtxEALw_wcB"
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Highlight
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                <Link
                   // variant="h6"
                    underline="none"
                    style={{color:"white"}}
                    to={{pathname: image.weburl}}
                    target="_blank"
                >
                  {image.title}
                </Link>

                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

HightLights.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HightLights);
