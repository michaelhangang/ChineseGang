import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Spinner from "../components/Spinner";
import baseUrl from "../../../baseURL";
import auth from "../../../FirebaseConfig";
import { Redirect } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Done from "@material-ui/icons/Done";
 const CLIENT = {
   sandbox:
     "AaTwQTP6E8UEqg5Q1i6dn505bWlK-YlbyL6KJqaj_oV21Lw16zzW6-paMhW7ej0Su5Du1VK6taTncxun",
   production:
     "your_production_key"
 };

 const CLIENT_ID =
   process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
      user: null,
      uid: null,
      users: null,
      redirect: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }

  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }

    auth.onAuthStateChanged( user=> {
      if (user) {
        baseUrl.get(`usersinfo/${user.uid}`).then(
            res=>{
              this.state.user= res.data;
              this.setState({user:res.data});
            }
        );
      } else {
        console.log("no user ");
      }
    });

  }

  createOrder = (data, actions) => {

    // this.state.users.forEach(element => {
    //
    //  // console.log(this.state.user);
    //
    //   if(element.useremail ===  this.state.user)
    //   {
    //     console.log(element);
    //     // var updateUser = {id: element.id, firebaseid: element.firebaseid, is_Vip: true, useremail: element.useremail, userpassword: element.userpassword};
    //     // console.log(updateUser);
    //     baseUrl.put('usersinfo/vip',{"id": element.id, "firebaseid": element.firebaseid, "isVip": true, "useremail": element.useremail, "userpassword":element.userpassword})
    //     .then(res => {
    //     console.log(res.data);
    //     });
    //   }
    //
    //
    // });

    //redirect to home page
    //this.setState({ redirect: true });


    return actions.order.create({
      purchase_units: [
        {
          description: +"Become Vip",
          amount: {
            currency_code: "USD",
            value: 0.05
          }
        }
      ]
    });
    
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });

      //redirect to home page
    //this.setState({ redirect: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
        <Grid container >
          <Grid item xs={12} md = {6} style={{margin:"30vh auto"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", border:"2px solid yellow",borderRadius:"30px"}}>
              { this.state.redirect ? (<Redirect push to="/"/>) : null }
              {loading && <Spinner />}
              {showButtons && (

                  <div style={{width:"75%", margin:"3vh 10%"}}>
                    <img src={"/static/royal_gold.png"} style={{height: "14vh", display:"block", margin:"0 auto"}}/>
                    <h4 style={{display:"flex"}}><Done/>VIP Logo!</h4>
                    <h4 style={{display:"flex"}}><Done/>Show your advertisement on your profile page!</h4>
                     <h4 style={{display:"flex"}}><Done/>{"Show your social media on your profile page!"}  </h4>
                  </div>
              )}
              {showButtons && (
                  <div  style={{width:"35%",textAlign:"center"}}>
                    <p>{"Starting at $5.99/mo"}</p>
                    <p>{"(Prepaid Annually)"}</p>
                    <PayPalButton onClick={()=>{ this.state.user.isVip=true; this.state.user.vip=true;
                    baseUrl.put('usersinfo',this.state.user).then(
                        res => {
                          // if(res.data !=null){
                          //     console.log(res.data);
                          // }
                        });  }} createOrder={(data, actions) => this.createOrder(data, actions)} onApprove={(data, actions) => this.onApprove(data, actions)}/>
                  </div>

              )}
              {paid && (<div className="main">
            <img alt="Vip" src={"/static/vipicon.png"} />
            <h2>
              Congrats! you become our VIP{" "}
              <span role="img" aria-label="emoji">
                {" "}
                😉
              </span>
            </h2>
          </div>)}
            </div>
          </Grid>
        </Grid>
    );
  }
}


 export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
