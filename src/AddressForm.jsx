import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    };
  }
  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };
  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };
  handleAddress1Change = event => {
    this.setState({ address1: event.target.value });
  };
  handleAddress2Change = event => {
    this.setState({ address2: event.target.value });
  };
  handleCityChange = event => {
    this.setState({ city: event.target.value });
  };
  handleStateChange = event => {
    this.setState({ state: event.target.value });
  };
  handleZipChange = event => {
    this.setState({ zip: event.target.value });
  };
  handleCountryChange = event => {
    this.setState({ country: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={this.handleFirstNameChange}
              value={this.state.firstName}
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="fname"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onChange={this.handleAddress1Change}
              value={this.state.address1}
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={this.handleAddress2Change}
              value={this.state.address2}
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={this.handleCityChange}
              value={this.state.city}
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={this.handleStateChange}
              value={this.state.state}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={this.handleZipChange}
              value={this.state.zip}
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={this.handleCountryChange}
              value={this.state.country}
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="billing country"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AddressForm;
