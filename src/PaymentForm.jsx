import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class PaymentForm extends Component {
  constructor() {
    super();
    this.state = {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cVV: ""
    };
  }
  handleCardNameChange = event => {
    this.setState({ cardName: event.target.value });
  };
  handleCardNumberChange = event => {
    this.setState({ cardNumber: event.target.value });
  };
  handleExpDateChange = event => {
    this.setState({ expDate: event.target.value });
  };
  handleCVVChange = event => {
    this.setState({ cVV: event.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              onChange={this.handleCardNameChange}
              value={this.state.cardName}
              id="cardName"
              label="Name on card"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              onChange={this.handleCardNumberChange}
              value={this.state.cardNumber}
              id="cardNumber"
              label="Card number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              onChange={this.handleExpDateChange}
              value={this.state.expDate}
              id="expDate"
              label="Expiry date"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              onChange={this.handleCVVChange}
              value={this.state.cVV}
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default PaymentForm;
