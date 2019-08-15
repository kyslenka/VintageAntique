import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm.jsx";
import PaymentForm from "./PaymentForm.jsx";
import Review from "./Review.jsx";
import Success from "./Success.jsx";
import { connect } from "react-redux";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

class Checkout extends Component {
  state = {
    step: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cVV: ""
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
    if (step === 2) {
      this.handleSubmitOrder();
    }
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleReset = () => {
    this.setState({
      step: 1
    });
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmitOrder = async () => {
    console.log("form submitted");
    let data = new FormData();
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    data.append("address1", this.state.address1);
    data.append("address2", this.state.address2);
    data.append("city", this.state.city);
    data.append("state", this.state.state);
    data.append("zip", this.state.zip);
    data.append("country", this.state.country);
    data.append("cardName", this.state.cardName);
    data.append("cardNumber", this.state.cardNumber);
    data.append("expDate", this.state.expDate);
    data.append("cVV", this.state.cVV);
    const response = await fetch("/checkoutData", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "COMPLETE_CHECKOUT"
      });
    }
  };
  render() {
    const { classes } = this.props;
    const { step } = this.state;
    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      cardName,
      cardNumber,
      expDate,
      cVV
    } = this.state;
    const values = {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      cardName,
      cardNumber,
      expDate,
      cVV
    };
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                  Checkout
                </Typography>
                <Stepper activeStep={step} className={classes.stepper}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  <AddressForm2
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                  />
                </React.Fragment>
              </Paper>
            </main>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                  Checkout
                </Typography>
                <Stepper activeStep={step} className={classes.stepper}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  <PaymentForm2
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                  />
                </React.Fragment>
              </Paper>
            </main>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                  Checkout
                </Typography>
                <Stepper activeStep={step} className={classes.stepper}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  <Review2
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                  />
                </React.Fragment>
              </Paper>
            </main>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                  Checkout
                </Typography>
                <Stepper activeStep={step} className={classes.stepper}>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  <Success />
                </React.Fragment>
              </Paper>
            </main>
          </React.Fragment>
        );
    }
  }
}
Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(Checkout));
