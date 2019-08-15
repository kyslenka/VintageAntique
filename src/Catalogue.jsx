import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import ItemCard from "./ItemCard.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    width: "auto"
  },
  cardGrid: {},
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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
`;

const CircularProgressWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
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
      return (
        <CircularProgressWrapper>
          <CircularProgress />
        </CircularProgressWrapper>
      );
    }
    const catalogue = this.state.catalogues.find(
      catalogue => catalogue.id === id
    );
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <div className={classes.heroUnit} />
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Wrapper>
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
            </Wrapper>
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
