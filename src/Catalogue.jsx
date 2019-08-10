import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ItemCard from "./ItemCard.jsx";

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  layout: {
    width: "auto",
    padding: "100px 0",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: "100px 0"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
});

class Catalogue extends Component {
  constructor() {
    super();
    this.state = { catalogues: [] };
  }
  componentDidMount = () => {
    this.fetchCatalogues();
  };
  fetchCatalogues = async () => {
    const response = await fetch("/catalogue");
    const body = await response.json();
    if (body.success) {
      this.setState({ catalogues: body.catalogues });
    }
  };
  render() {
    const { classes, id } = this.props;
    if (this.state.catalogues.length === 0) {
      return "Loading...";
    }
    const catalogue = this.state.catalogues.find(
      catalogue => catalogue.id === id
    );
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            {/* <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {catalogue.title}
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                {catalogue.description}
              </Typography>
            </div> */}
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {catalogue.products.map(product => (
                <ItemCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  id={product.id}
                  catalogueId={catalogue.id}
                />
              ))}
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Catalogue.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Catalogue);
