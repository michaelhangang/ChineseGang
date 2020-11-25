import withRoot from "../../components/withRoot";
import React from "react";
import HightLights from "../../components/modules/views/HighLights";
import AppFooter from "../../components/modules/views/AppFooter";
import Banner from "../../components/modules/views/Banner";
import AdsBlock from "../../components/modules/views/AdsBlock";
import SecondHand from "../../components/modules/views/SecondHand";
import AppAppBar from "./Sections/AppAppBar";

function LandingPage() {

  return (
    <React.Fragment>
      <AppAppBar  changeColorOnScroll={{
          height: 400,
          color: "white"
        }}/>
      <Banner />
      <AdsBlock />
      <HightLights />
      <SecondHand />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(LandingPage);
