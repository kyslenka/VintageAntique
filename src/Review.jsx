import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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

class Review extends Component {
  continue = event => {
    event.preventDefault();
    this.props.nextStep();
  };
  back = event => {
    event.preventDefault();
    this.props.prevStep();
  };
  calculateTotalPrice = () => {
    let totalPrice = 0;
    this.props.cart.forEach(product => {
      console.log(product, totalPrice);
      totalPrice += Number(product.price.replace("$", "").replace(",", ""));
    });
    return totalPrice;
  };
  render() {
    const { classes } = this.props;
    const { cart } = this.props;
    const {
      values: {
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
      }
    } = this.props;
    console.log(address1);
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {cart.map(product => (
            <ListItem className={classes.listItem} key={product.title}>
              <ListItemText primary={product.title} />
              <Typography variant="body2">{product.price}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              ${this.calculateTotalPrice()}
            </Typography>
          </ListItem>
        </List>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping
              </Typography>
              <Typography gutterBottom>
                {firstName} <span>{lastName}</span>
              </Typography>
              {address1 && (
                <>
                  <Typography gutterBottom>
                    {address1}, {city}, {state}, {zip}, {country}
                  </Typography>
                  <Typography gutterBottom>{address2}</Typography>
                </>
              )}
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Payment details
              </Typography>
              <Grid container>
                <React.Fragment>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Card type</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Visa</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Card holder</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{cardName} </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Card Number</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>
                      **** **** **** {cardNumber.slice(-4)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>Expiry date</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{expDate}</Typography>
                  </Grid>
                </React.Fragment>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <div className={classes.buttons}>
          <Button onClick={this.back} className={classes.button}>
            Back
          </Button>
          <Button
            type="submit"
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

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(withStyles(styles)(Review));
