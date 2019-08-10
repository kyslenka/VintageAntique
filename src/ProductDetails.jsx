import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  layout: {
    width: "auto",
    minHeight: "calc(100vh - 5px)",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "91.25%"
  },
  cardContent: {
    flexGrow: 1
  }
});

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { product: "" };
  }
  componentDidMount = () => {
    this.fetchProduct();
  };
  fetchProduct = async () => {
    const response = await fetch(
      `/product?productId=${this.props.id}&catalogueId=${
        this.props.catalogueId
      }`
    );
    const body = await response.json();
    if (body.success) {
      this.setState({ product: body.product });
    }
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
    if (!this.state.product) {
      return "Loading...";
    }
    const { classes } = this.props;
    const { image, title, description, price } = this.state.product;
    console.log(this.state);
    return (
      <Grid item key={title} sm={6} md={4} lg={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            title={title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h6" component="h2">
              {title}
            </Typography>
            <Typography>{description}</Typography>
            <Typography>{price}</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={this.handleOnClickAdd}
              size="small"
              color="primary"
            >
              Add to cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

ProductDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ProductDetails));
