import React, { Component } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

class PaymentForm2 extends Component {
  continue = event => {
    event.preventDefault();
    this.props.nextStep();
  };
  back = event => {
    event.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { classes } = this.props;
    const { values, handleChange } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={handleChange("cardName")}
              defaultValue={values.cardName}
              id="cardName"
              label="Name on card"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={handleChange("cardNumber")}
              defaultValue={values.cardNumber}
              id="cardNumber"
              label="Card number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onChange={handleChange("expDate")}
              defaultValue={values.expDate}
              id="expDate"
              label="Expiry date"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange("cVV")}
              defaultValue={values.cVV}
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button onClick={this.back} className={classes.button}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.continue}
            className={classes.button}
          >
            Next
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

PaymentForm2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentForm2);
