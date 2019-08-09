import React, { Component } from "react";
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
import { withRouter } from "react-router-dom";
import styled from "styled-components";

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
    padding: `${theme.spacing.unit * 8}px 0`
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

  & > div:first-child {
    background-size: 150px;
  }
`;

class ItemCard extends Component {
  handleOnClick = () => {
    this.props.history.push(
      `/catalogue/${this.props.catalogueId}/product/${this.props.id}`
    );
    console.log(this.props);
  };
  render() {
    const { classes, image, title, price, id } = this.props;
    return (
      <Grid item key={title} sm={6} md={4} lg={3}>
        <StyledCard>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            title={title}
          />
          {/* <img src={image} /> */}
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h6" component="h2">
              {title}
            </Typography>
            <Typography>{price}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.handleOnClick} size="small" color="primary">
              View
            </Button>
          </CardActions>
        </StyledCard>
      </Grid>
    );
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ItemCard));
