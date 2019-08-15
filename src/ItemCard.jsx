import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: "40px 0"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  }
});

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover > div:first-child {
    backface-visibility: hidden;
    transform: translateZ(0) scale(1.1);
  }
  & > div:first-child {
    background-repeat: no-repeat;
    background-size: 200px;
    width: 100%;
    height: 100%;
    transition: 0.4s ease-in-out;
    display: block;
    overflow: hidden;
    object-fit: cover;
    background-color: #fff;
  }
`;

class ItemCard extends Component {
  componentDidMount = () => {
    this.fetchItemsInCart();
  };
  fetchItemsInCart = async () => {
    console.log(this.props);
    const response = await fetch(
      `/cart/product?productId=${this.props.id}&catalogueId=${
        this.props.catalogueId
      }`
    );
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "IN_THE_CART",
        product: body.product,
        cart: body.cart
      });
    }
  };
  handleOnClick = () => {
    this.props.history.push(
      `/catalogue/${this.props.catalogueId}/product/${this.props.id}`
    );
    console.log(this.props);
  };
  handleOnClickAdd = async () => {
    const data = {
      catalogueId: this.props.catalogueId,
      productId: this.props.id
    };
    const response = await fetch("/cart/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    console.log(body);
    if (body.success) {
      this.props.history.push(
        `/cart/catalogue/${this.props.catalogueId}/product/${this.props.id}`
      );
    }
  };
  render() {
    const { classes, image, title, price, id } = this.props;
    return (
      <Grid item key={title} sm={6} md={4} lg={3}>
        <div style={{ padding: 10, height: "100%" }}>
          <StyledCard style={{ padding: 10 }}>
            <CardMedia className={classes.cardMedia} image={image} />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h2">
                {title}
              </Typography>
              <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                {price}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "space-between" }}>
              <Button onClick={this.handleOnClick} size="medium">
                View
              </Button>
              <Button
                disabled={this.props.isInCart}
                onClick={this.handleOnClickAdd}
                size="medium"
              >
                {this.props.isInCart ? "In Cart" : "Add to Cart"}
              </Button>
            </CardActions>
          </StyledCard>
        </div>
      </Grid>
    );
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const isInCart = state.cart.some(item => item.id === ownProps.id);
  return { isInCart };
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(ItemCard))
);
