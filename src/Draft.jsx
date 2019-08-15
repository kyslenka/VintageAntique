import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

class Navbar extends Component {
  handleQueryChange = evt => {
    this.props.dispatch({ type: "SET_QUERY", query: evt.target.value });
  };
  render() {
    return (
      <div>
        <LogoLink to="/">
          <Logo>VintageAntique</Logo>
        </LogoLink>
        <NavLinks>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/catalogue">Catalogue</Navlink>
          <Navlink to="/sell">Sell item</Navlink>
          <Navlink to="/signup">Sign up</Navlink>
          <Navlink to="/login">Log in</Navlink>
        </NavLinks>
        <SearchBar
          type="text"
          placeholder="Search for products"
          onChange={this.handleQueryChange}
          value={this.props.query}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { query: state.query };
};

export default connect(mapStateToProps)(Navbar);


import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import "./main.css";
// import Navbar from "./Navbar.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { Server } from "http";

class App extends Component {
  //   renderSignup = () => {
  //     return <Signup />;
  //   };
  render() {
    // if (this.props.login) {
    //   return (
    //     <BrowserRouter>
    //       {/* <Signup /> */}
    //       {/* <Navbar /> */}
    //       {/* <Route path="/" exact render={this.renderHome} /> */}
    //       {/* <Route path="/catalogue" render={renderCatalogue} />
    //       <Route path="/sell" render={renderSell} /> */}
    //       {/* <Route path="/signup" render={this.renderSignup} /> */}
    //       {/* <Route path="/login" render={this.renderLogin} /> */}
    //     </BrowserRouter>
    //   );
    // }
    return (
      <div>
        <h1>Sign up</h1>
        <Signup />
        <h1>Log in</h1>
        <Login />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return { login: state.loggedIn };
// };

export default App;

// server.js
const express = require("express");
const multer = require("multer");
const upload = multer();
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const reloadMagic = require("./reload-magic-client.js");
const passwords = {};
const sessions = {};
reloadMagic(app);

app.use("/", express.static("build"));

const generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};
app.post("/signup", upload.none(), (req, res) => {
  const username = req.body.username;
  const enteredPassword = req.body.password;
  if (passwords[username]) {
    return res.send({ success: false, message: "Username taken" });
  }
  passwords[username] = enteredPassword;
  res.send(JSON.stringify({ success: true }));
});
app.post("/login", upload.none(), (req, res) => {
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const expectedPassword = passwords[username];
  if (enteredPassword === expectedPassword) {
    const sessionId = generateId();
    sessions[sessionId] = username;
    res.cookie("sid", sessionId);
    res.send(JSON.stringify({ success: true }));
  }
  res.send(JSON.stringify({ success: false }));
});
app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000);

// store.js
import { createStore } from "redux";

const initialState = { query: "", loggedIn: false, username: "" };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.query };
    case "LOGIN_SUCCESS":
      return { ...state, loggedIn: true, username: action.username };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

// Login.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let body = await response.json();
    console.log("parsed body", body);
    if (!body.success) {
      alert("Login failed");
      return;
    }
    this.props.dispatch({
      type: "LOGIN_SUCCESS",
      username: this.state.username
    });
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        Username
        <input type="text" onChange={this.handleUsernameChange} />
        Password
        <input type="text" onChange={this.handlePasswordChange} />
        <input type="submit" />
      </form>
    );
  };
}

export default connect()(Login);

// Signup.jsx
import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = evt => {
    this.setState({ username: evt.target.value });
  };
  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    const response = await fetch("/signup", { method: "POST", body: data });
    const body = await response.json();
    if (!body.success) return alert(body.message);
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        Username
        <input type="text" onChange={this.handleUsernameChange} />
        Password
        <input type="text" onChange={this.handlePasswordChange} />
        <button type="submit">Submit</button>
      </form>
    );
  };
}

export default Signup;


// Login.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let body = await response.json();
    console.log("parsed body", body);
    if (!body.success) {
      alert("Login failed");
      return;
    }
    this.props.dispatch({
      type: "LOGIN_SUCCESS",
      username: this.state.username
    });
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        Username
        <input type="text" onChange={this.handleUsernameChange} />
        Password
        <input type="text" onChange={this.handlePasswordChange} />
        <input type="submit" />
      </form>
    );
  };
}

export default connect()(Login);


// Navbar.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Links from "./Links";

class Navbar extends Component {
  handleQueryChange = evt => {
    this.props.dispatch({ type: "SET_QUERY", query: evt.target.value });
  };
  render() {
    return (
      <div>
        <LogoLink to="/">
          <Logo>VintageAntique</Logo>
        </LogoLink>
        <NavLinks>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/catalogue">Catalogue</Navlink>
          <Navlink to="/sell">Sell item</Navlink>
          <Navlink to="/signup">Sign up</Navlink>
          <Navlink to="/login">Log in</Navlink>
        </NavLinks>
        <SearchBar
          type="text"
          placeholder="Search for products"
          onChange={this.handleQueryChange}
          value={this.props.query}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { query: state.query };
};

export default connect(mapStateToProps)(Navbar);

// Links.jsx
import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SignUp from "./SignUp.jsx";

const styles = theme => ({
  link: {
    margin: theme.spacing.unit
  }
});

class Links extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Typography>
        <Link
          component={SignUp}
          to="/signup"
          className={classes.link}
          color="primary"
          variant="inherit"
        >
          Sign up
        </Link>
      </Typography>
    );
  }
}

Links.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Links);

// Signup.jsx
import React, { Component } from "react";
import ItemCard from "./ItemCard";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = evt => {
    this.setState({ username: evt.target.value });
  };
  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    const response = await fetch("/signup", { method: "POST", body: data });
    const body = await response.json();
    if (!body.success) return alert(body.message);
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        Username
        <input type="text" onChange={this.handleUsernameChange} />
        Password
        <input type="text" onChange={this.handlePasswordChange} />
        <button type="submit">Submit</button>
      </form>
    );
  };
}

export default Signup;


ItemCard.jsx
class ItemCard extends Component {
  render() {
    const card = catalogues.products[id];
    const { catalogues, classes, image, title, price } = this.props;
    return (
      <div>
        <Grid item key={card} sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={card.image}
              title={card.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {card.title}
              </Typography>
              <Typography>{card.price}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
  }
}

Home.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductForm from "./ProductForm";

class Home extends Component {
  render() {
    console.log("I'm here!");
    const { catalogues, query } = this.props;
    const searchResults = catalogues.filter(catalogue =>
      catalogue.title.toLowerCase().includes(query.toLowerCase())
    );
    return (
      <div>
        <ul>
          <li>
            {searchResults.map(catalogue => (
              <Link to={`/catalogue/${catalogue.id}`}>{catalogue.title}</Link>
            ))}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { catalogues: state.catalogues, query: state.query };
};

export default connect(mapStateToProps)(Home);

ProductForm.jsx
import React, { Component } from "react";
import styled from "styled-components";
import Select from "react-select";
import ProductDetails from "./ProductDetails";

const options = [
  { value: "furniture", label: "Furniture" },
  { value: "paintings", label: "Paintings" },
  { value: "jewellery", label: "Jewellery" }
];

const CardProduct = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 2px 4px 0px #ddd;
  margin: 20px;
  border-radius: var(--border-radius);
  text-align: center;
`;

// const Card = styled.div`
//   overflow: hidden;
//   background: #fff;
//   box-shadow: 0px 2px 4px 0px #ddd;
//   margin: 20px;
//   border-radius: var(--border-radius);
//   text-align: center;
// `;

const CardTitle = styled.h1`
  margin: 0;
  padding: 20px;
  background: #404040;
  color: #fff;
  font-size: 1.6rem;
`;

const CardBody = styled.div`
  display: grid;
  margin: 20px;
`;

const Form = styled.form`
  width: 60%;
  min-width: 300px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;

export const FormInput = styled.input`
  width: 100%;
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
  padding: 10px;
  margin: 10px 0;
`;

const Center = styled.div`
  text-align: center;
`;

// const buttonStyles = css`
//   padding: 10px 20px;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   border: none;
//   color: #fff;
//   font-size: 1rem;
//   background: var(--primary-color);
//   outline: none;
//   text-decoration: none;
// `;

// const Button = styled.button`
//   ${buttonStyles}
// `;
// export const FormButton = styled.button`
//   margin: 10px 0;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   cursor: pointer;
//   width: ${(props) => (props.wide ? '100%' : 'auto')};
// `;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: var(--border-radius);
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  background: var(--primary-color);
  outline: none;
  text-decoration: none;
`;

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px 0;
  border-radius: 6px;
  position: relative;
`;

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      title: "",
      description: "",
      price: "",
      selectedOption: null
    };
  }
  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };
  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };
  handleImageChange = event => {
    this.setState({ image: event.target.files[0] });
  };
  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };
  handleCategoryChange = selectedOption => {
    this.setState({ selectedOption });
    console.log("Option selected:", selectedOption);
  };
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("form submitted");
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("img", this.state.image);
    data.append("price", this.state.price);
    data.append("category", this.state.selectedOption);
    data.append("description", this.state.description);
    fetch("/newitem", { method: "POST", body: data, credentials: "include" });
  };
  render() {
    return (
      <CardProduct>
        <CardTitle>Fill this form to sell your item</CardTitle>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Wrapper>
              <label>
                Product Name
                <FormInput
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                  type="text"
                  placeholder="Type your product name"
                />
              </label>
              <label>
                Product Image
                <FormInput onChange={this.handleImageChange} type="file" />
              </label>
              <label>
                Price
                <FormInput
                  onChange={this.handlePriceChange}
                  type="text"
                  value={this.state.price}
                />
              </label>
              <label>
                Choose the Category
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleCategoryChange}
                  options={options}
                />
              </label>
              <label>
                Product Description
                <FormInput
                  onChange={this.handleDescriptionChange}
                  type="text"
                  value={this.state.decsription}
                  placeholder="Type the description of your item"
                />
              </label>
              <Center>
                <SubmitButton type="submit">Add Item</SubmitButton>
              </Center>
            </Wrapper>
          </Form>
        </CardBody>
      </CardProduct>
    );
  }
}

export default ProductForm;


ProductDetails.jsx
import React, { Component } from "react";
import initialCatalogues from './data.js'
import SearchResults from "./SearchResults";

class ProductDetails extends Component {
  render() {
    const { image, title, description, price } = this.props;
    return (
      <div>
        <div>
          <img
            src={"/images/table.jpg"}
            styles={{ height: "100px", width: "100px" }}
          />
          <div>
              <h2>{}</h2>
          </div>
        </div>
      </div>
    );
  }
}


export default ProductDetails;

SearchResults.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ItemCard from "./ItemCard.jsx";

class SearchResults extends Component {
  render() {
    const { catalogues, query } = this.props;
    const product = catalogues.products[id];
    const searchResults = product.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    return (
      <div>
        <ul>
          <li>
            {searchResults.map(product => (
              <ItemCard
                title={product.title}
                image={product.image}
                price={product.price}
              />
            ))}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { catalogues: state.catalogues, query: state.query };
};

export default connect(mapStateToProps)(SearchResults);

Navbar.jsxclass Navbar extends Component {
  handleQueryChange = evt => {
    this.props.dispatch({ type: "SET_QUERY", query: evt.target.value });
  };
  render() {
    const { classes, query, setLogout } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className="nav" position="static">
          <Toolbar>
            <div className={classes.navLink}>
              <Link className={classes.link} to="/">
                Home
              </Link>
              <Link className={classes.link} to="/catalogue">
                Catalogue
              </Link>
              <Link className={classes.link} to="/sellItem">
                Sell item
              </Link>
            </div>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              VintageAntique
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                type="text"
                onChange={this.handleQueryChange}
                value={query}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.navLink}>
              <Link className={classes.link} to="/signup">
                Sign up
              </Link>
              <Link className={classes.link} to="/login">
                Log in
              </Link>
            </div>
            <div>
              <AddShoppingCartIcon />
            </div>
            <Link onClick={setLogout} className={classes.link} to="/logout">
              Log out
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

function handleLogout(dispatch) {
  fetch("/logout", { method: "POST", credentials: "same-origin" });
  dispatch({ type: "LOGOUT" });
}

const mapDispatchToProps = dispatch => ({
  setLogout: () => handleLogout(dispatch)
});

const mapStateToProps = state => {
  return { query: state.query };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navbar));


ShoppingCart.jsx
import React, { Component } from "react";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTooltip,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBInput,
  MDBBtn
} from "mdbreact";

class eCommercePage extends Component {
  state = {
    data: [
      {
        src:
          "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg",
        title: "iPhone",
        subTitle: "Apple",
        color: "White",
        price: "800",
        qty: "2"
      },
      {
        src:
          "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/6.jpg",
        title: "Headphones",
        subTitle: "Sony",
        color: "Red",
        price: "200",
        qty: "2"
      },
      {
        src:
          "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg",
        title: "iPad Pro",
        subTitle: "Apple",
        color: "Gold",
        price: "600",
        qty: "1"
      }
    ],
    columns: [
      {
        label: "",
        field: "img"
      },
      {
        label: <strong>Product</strong>,
        field: "product"
      },
      {
        label: <strong>Color</strong>,
        field: "color"
      },
      {
        label: <strong>Price</strong>,
        field: "price"
      },
      {
        label: <strong>QTY</strong>,
        field: "qty"
      },
      {
        label: <strong>Amount</strong>,
        field: "amount"
      },
      {
        label: "",
        field: "button"
      }
    ]
  };

  render() {
    const rows = [];
    const { columns, data } = this.state;

    data.map(row => {
      return rows.push({
        img: <img src={row.src} alt="" className="img-fluid z-depth-0" />,
        product: [
          <h5 className="mt-3" key={new Date().getDate + 1}>
            <strong>{row.title}</strong>
          </h5>,
          <p key={new Date().getDate} className="text-muted">
            {row.subTitle}
          </p>
        ],
        color: row.color,
        price: `$${row.price}`,
        qty: (
          <MDBInput
            type="number"
            default={row.qty}
            className="form-control"
            style={{ width: "100px" }}
          />
        ),
        amount: <strong>${row.qty * row.price}</strong>,
        button: (
          <MDBTooltip placement="top">
            <MDBBtn color="primary" size="sm">
              X
            </MDBBtn>
            <div>Remove item</div>
          </MDBTooltip>
        )
      });
    });

    return (
      <MDBRow className="my-2" center>
        <MDBCard className="w-100">
          <MDBCardBody>
            <MDBTable className="product-table">
              <MDBTableHead
                className="font-weight-bold"
                color="mdb-color lighten-5"
                columns={columns}
              />
              <MDBTableBody rows={rows} />
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    );
  }
}

export default eCommercePage;

ShoppingCart.jsximport React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
`;

class ShoppingCart extends Component {
  // calculateTotalPrice = () => {
  //   let totalPrice = 0;
  //   this.state.cart.map(product => (totalPrice += product.price));
  //   return totalPrice;
  // };
  componentDidMount = () => {
    this.fetchProduct();
  };
  fetchProduct = async () => {
    const response = await fetch(
      `/cart/product?productId=${this.props.id}&catalogueId=${
        this.props.catalogueId
      }`
    );
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "ADD_TO_CART",
        product: body.product,
        cart: body.cart
      });
    }
  };
  handleOnClickCheckout = () => {
    this.props.history.push("/checkout");
  };
  render() {
    if (!this.props.cart) {
      return "Loading...";
    }
    const { classes, cart } = this.props;
    const { image, title, description, price, id } = this.props.product;
    return (
      <Grid item key={id} sm={6} md={4} lg={3}>
        <Wrapper>
          {this.props.cart.map(product => (
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia} image={product.image} />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.title}
                </Typography>
                <Typography>{product.price}</Typography>
                {/* <Typography>{location}</Typography> */}
              </CardContent>
              {/* <Typography>Total: {calculateTotalPrice()}</Typography> */}
            </Card>
          ))}
        </Wrapper>
        <CardActions>
          <Button
            onClick={this.handleOnClickRemove}
            size="small"
            color="primary"
          >
            Remove Item
          </Button>
          <Button
            onClick={this.handleOnClickCheckout}
            size="small"
            color="primary"
          >
            Checkout
          </Button>
        </CardActions>
      </Grid>
    );
  }
}

ShoppingCart.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { product: state.product, cart: state.cart };
};

export default withRouter(connect(mapStateToProps)(ShoppingCart));


ShoppingCart.jsx
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
// import PropTypes from "prop-types";
// import classNames from "classnames";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import { withStyles } from "@material-ui/core/styles";

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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
`;

class ShoppingCart extends Component {
  // calculateTotalPrice = () => {
  //   let totalPrice = 0;
  //   this.state.cart.map(product => (totalPrice += product.price));
  //   return totalPrice;
  // };
  calculateTotal = () => {
    return Number(this.props.price).toFixed(2);
  }
  componentDidMount = () => {
    this.fetchProduct();
  };
  fetchProduct = async () => {
    const response = await fetch(
      `/cart/product?productId=${this.props.id}&catalogueId=${
        this.props.catalogueId
      }`
    );
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "ADD_TO_CART",
        product: body.product,
        cart: body.cart
      });
    }
  };
  handleOnClickCheckout = () => {
    this.props.history.push("/checkout");
  };
  render() {
    if (!this.props.cart) {
      return "Loading...";
    }
    const { cart } = this.props;
    return (
      <div>
        <Wrapper>
          <h3>Your Cart</h3>
          {cart.map(product => (
            <div>
              <div>{product.image}</div>
              <div>{product.title}</div>
              <div>${Number(product.price).toFixed(2)}</div>
            </div>
          ))}
          ${this.calculateTotal()}
        </Wrapper>
        <button
          type="button"
          onClick={this.handleOnClickRemove}
          size="small"
          color="primary"
        >
          Remove Item
        </button>
        <button
          type="button"
          onClick={this.handleOnClickCheckout}
          size="small"
          color="primary"
        >
          Checkout
        </button>
      </div>
    );
  }
}

// ShoppingCart.propTypes = {
//   classes: PropTypes.object.isRequired
// };

const mapStateToProps = state => {
  return { product: state.product, cart: state.cart };
};

export default withRouter(connect(mapStateToProps)(ShoppingCart));

ShoppingCart.jsx
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const Cart = styled.div`
  width: 55vw;
  height: 90vh;
  margin: 80px auto;
  background: #fff;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  height: 60px;
  border-bottom: 1px solid #e1e8ee;
  padding: 20px 30px;
  color: #5e6977;
  font-size: 18px;
  font-weight: 400;
`;

const Item = styled.div`
  padding: 20px 30px;
  height: 120px;
  display: flex;
  & > div:nth-child {
    border-top: 1px solid #e1e8ee;
    border-bottom: 1px solid #e1e8ee;
  }
`;

const Image = styled.div`
  margin-right: 60px;
  margin-left: 40px;
`;

const Description = styled.div`
  padding-top: 30px;
  margin-right: 60px;
  font-weight: bold;
  font-size: 20px;
`;

const Price = styled.div`
  padding-top: 30px;
  text-align: center;
  font-size: 16px;
  color: black;
  font-weight: bold;
`;
const Buttons = styled.div`
  height: 20vh;
  /* display: flex;
  align-items: flex-end;
  justify-content: center; */
`;

const Button = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  width: auto;
  text-align: center;
  background-color: #8a2be2;
`;
// handlleAddProduct = () => {const existingProduct = cart.find(p => p.id === product.id);

//   if (existingProduct) {}

class ShoppingCart extends Component {
  // calculateTotalPrice = () => {
  //   let totalPrice = 0;
  //   this.state.cart.map(product => (totalPrice += product.price));
  //   return totalPrice;
  // };
  // calculateTotal = () => {
  //   return Number(this.props.price).toFixed(2);
  // };
  componentDidMount = () => {
    this.fetchProduct();
  };
  fetchProduct = async () => {
    const response = await fetch(
      `/cart/product?productId=${this.props.id}&catalogueId=${
        this.props.catalogueId
      }`
    );
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "ADD_TO_CART",
        product: body.product,
        cart: body.cart
      });
    }
  };
  handleOnClickCheckout = () => {
    this.props.history.push("/checkout");
  };
  render() {
    if (!this.props.cart) {
      return "Loading...";
    }
    const { cart, product } = this.props;
    return (
      <Cart>
        <Title>Your Cart</Title>
        {cart.map(product => (
          <Item>
            <Image>
              <img src={product.image} style={{ height: "150px" }} />
            </Image>
            <Description>{product.title}</Description>
            <Price>{product.price}</Price>
          </Item>
        ))}
        {/* <div>Total Price: {this.calculateTotal()}</div> */}
        <Buttons>
          <Button type="button" onClick={this.handleOnClickRemove}>
            Remove Item
          </Button>
          <Button type="button" onClick={this.handleOnClickCheckout}>
            Checkout
          </Button>
        </Buttons>
      </Cart>
    );
  }
}

const mapStateToProps = state => {
  return { product: state.product, cart: state.cart };
};

export default withRouter(connect(mapStateToProps)(ShoppingCart));


ProductDetails.jsx
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
  handleOnClick = () => {
    this.props.history.push(
      `/cart/catalogue/${this.props.catalogueId}/product/${this.props.id}`
    );
  };
  render() {
    if (!this.state.product) {
      return "Loading...";
    }
    const { classes } = this.props;
    const { image, title, description, price, id } = this.state.product;
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
            {/* <Typography>{location}</Typography> */}
          </CardContent>
          <CardActions>
            <Button onClick={this.handleOnClick} size="small" color="primary">
              Add to cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

Checkout.jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm.jsx";
import PaymentForm from "./PaymentForm.jsx";
import Review from "./Review.jsx";

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
    activeStep: 0
  };

  handleNext = () => {
      
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        {/* <AppBar
          position="absolute"
          color="default"
          className={classes.appBar}
        /> */}
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Checkout);

AddressForm.jsx
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class AddressForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      checkbox: false
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
  handleCheckboxChange = event => {
    this.setState({ checked: true });
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
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleCheckboxChange}
                  checked={this.state.checkbox}
                  color="secondary"
                  name="saveAddress"
                  //   value="yes"
                />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AddressForm;

Review.jsx
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" }
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA"
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" }
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
});

function Review(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);




calculateTotal(price) {
    this.setState(prevState => ({
      total: prevState.total + this.props.cart.product.price
    }));
  }

  // calculateTotal = () => {
  //   return Number(this.props.price).toFixed(2);
  // };

  ShoppingCart.jsx
  import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import CartItem from "CartItem.jsx";

const Cart = styled.div`
  width: 55vw;
  height: 90vh;
  margin: 80px auto;
  background: #fff;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  height: 60px;
  border-bottom: 1px solid #e1e8ee;
  padding: 20px 30px;
  color: #5e6977;
  font-size: 18px;
  font-weight: 400;
`;

const Item = styled.div`
  padding: 20px 30px;
  height: 120px;
  display: flex;
  & > div:nth-child {
    border-top: 1px solid #e1e8ee;
    border-bottom: 1px solid #e1e8ee;
  }
`;

const Image = styled.div`
  margin-right: 60px;
  margin-left: 40px;
`;

const Description = styled.div`
  padding-top: 30px;
  margin-right: 60px;
  font-weight: bold;
  font-size: 20px;
`;

const Price = styled.div`
  padding-top: 30px;
  text-align: center;
  font-size: 16px;
  color: black;
  font-weight: bold;
`;
const Buttons = styled.div`
  height: 20vh;
  /* display: flex;
  align-items: flex-end;
  justify-content: center; */
`;

const Button = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  width: auto;
  text-align: center;
  background-color: #8a2be2;
`;

class ShoppingCart extends Component {
  calculateTotalPrice = () => {
    let totalPrice = 0;
    this.props.cart.forEach(product => {
      totalPrice += Number(product.price.replace("$", "").replace(",", ""));
    });
    return totalPrice;
  };

  componentDidMount = () => {
    this.fetchProduct();
  };
  fetchProduct = async () => {
    const response = await fetch(
      `/cart/product?productId=${this.props.id}&catalogueId=${
        this.props.catalogueId
      }`
    );
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "ADD_TO_CART",
        product: body.product,
        cart: body.cart
      });
    }
  };
  handleOnClickCheckout = () => {
    this.props.history.push("/checkout");
  };

  handleOnClickRemove = async id => {
    const data = {
      productId: this.props.id
    };
    const response = await fetch("/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "REMOVE_FROM_CART",
        cart: body.cart
      });
    }
  };
  // Send a request to the server to remove item from the cart there
  // server code should remove item from cart, and respond with the new cart, without the item
  // Dispatch to update the cart in redux

  render() {
    // if (!this.props.cart) {
    //   return "Loading...";
    // }
    const { cart } = this.props;
    const addedItems = cart.length > 0;
    const nodes = addedItems ? (
      cart.map(product => (
        <CartItem
          image={product.image}
          title={product.title}
          price={product.price}
          // key={product.id}
        />
      ))
    ) : (
      <em>Please add some products to the cart.</em>
    );
    return (
      <Cart>
        <Title>Your Cart</Title>
        <div>{nodes}</div>
        {/* {cart.map(product => (
          <Item key={product.title}>
            <Image>
              <img src={product.image} style={{ height: "150px" }} />
            </Image>
            <Description>{product.title}</Description>
            <Price>{product.price}</Price>
            <Button
              type="button"
              onClick={() => this.handleOnClickRemove(product.id)}
            >
              Remove Item
            </Button>
          </Item>
        ))} */}
        <div>Total Price: {this.calculateTotalPrice()}</div>
        <Buttons>
          <Button type="button" onClick={this.handleOnClickCheckout}>
            Checkout
          </Button>
        </Buttons>
      </Cart>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    cart: state.cart
  };
};

export default withRouter(connect(mapStateToProps)(ShoppingCart));

render() {
  // if (!this.props.cart) {
  //   return "Loading...";
  // }
  const { cart } = this.props;
  const addedItems = cart.length > 0
  addedItems ? (
    cart.map(product => {
  return (
    // <Cart>
    //   <Title>Your Cart</Title>
      // {cart.map(product => (
        <Item key={product.title}>
          <Image>
            <img src={product.image} style={{ height: "150px" }} />
          </Image>
          <Description>{product.title}</Description>
          <Price>{product.price}</Price>
          <Button
            type="button"
            onClick={() => this.handleOnClickRemove(product.id)}
          >
            Remove Item
          </Button>
        </Item>
  )
})
  ) : (<em>Currently your cart is empty</em>)
  return (
    <Cart>
      <Title>Your Cart</Title>
      {/* <div>Total Price: {this.calculateTotalPrice()}</div> */}
      <Buttons>
        <Button type="button" onClick={this.handleOnClickCheckout}>
          Checkout
        </Button>
      </Buttons>
    </Cart>
  )
}
}

ShoppingCart.jsx
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const Cart = styled.div`
  width: 55vw;
  height: 90vh;
  margin: 80px auto;
  background: #fff;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  height: 60px;
  border-bottom: 1px solid #e1e8ee;
  padding: 20px 30px;
  color: #5e6977;
  font-size: 18px;
  font-weight: 400;
`;

const Item = styled.div`
  padding: 20px 30px;
  height: 120px;
  display: flex;
  & > div:nth-child {
    border-top: 1px solid #e1e8ee;
    border-bottom: 1px solid #e1e8ee;
  }
`;

const Image = styled.div`
  margin-right: 60px;
  margin-left: 40px;
`;

const Description = styled.div`
  padding-top: 30px;
  margin-right: 60px;
  font-weight: bold;
  font-size: 20px;
`;

const Price = styled.div`
  padding-top: 30px;
  text-align: center;
  font-size: 16px;
  color: black;
  font-weight: bold;
`;
const Buttons = styled.div`
  height: 20vh;
  /* display: flex;
  align-items: flex-end;
  justify-content: center; */
`;

const Button = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  width: auto;
  text-align: center;
  background-color: #8a2be2;
`;

class ShoppingCart extends Component {
  calculateTotalPrice = () => {
    let totalPrice = 0;
    this.props.cart.forEach(product => {
      totalPrice += Number(product.price.replace("$", "").replace(",", ""));
    });
    return totalPrice;
  };

  componentDidMount = () => {
    this.fetchProduct();
  };
  fetchProduct = async () => {
    const response = await fetch(
      `/cart/product?productId=${this.props.id}&catalogueId=${
        this.props.catalogueId
      }`
    );
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "ADD_TO_CART",
        product: body.product,
        cart: body.cart
      });
    }
  };
  handleOnClickCheckout = () => {
    this.props.history.push("/checkout");
  };

  handleOnClickRemove = async () => {
    const data = {
      catalogueId: this.props.catalogueId,
      productId: this.props.id
    };
    const response = await fetch("/cart/remove/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({
        type: "REMOVE_FROM_CART",
        product: body.product,
        cart: body.cart
      });
    }
  };
  // Send a request to the server to remove item from the cart there
  // server code should remove item from cart, and respond with the new cart, without the item
  // Dispatch to update the cart in redux

  render() {
    // if (!this.props.cart) {
    //   return "Loading...";
    // }
    const { cart } = this.props;
    return (
      <Cart>
        <Title>Your Cart</Title>
        {cart.map(product => (
          <Item key={product.title}>
            <Image>
              <img src={product.image} style={{ height: "150px" }} />
            </Image>
            <Description>{product.title}</Description>
            <Price>{product.price}</Price>
            <Button
              type="button"
              onClick={() => this.handleOnClickRemove(product.id)}
            >
              Remove Item
            </Button>
          </Item>
        ))}
        <div>Total Price: {this.calculateTotalPrice()}</div>
        <Buttons>
          <Button type="button" onClick={this.handleOnClickCheckout}>
            Checkout
          </Button>
        </Buttons>
      </Cart>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    cart: state.cart,
    totalPrice: state.totalPrice
  };
};

export default withRouter(connect(mapStateToProps)(ShoppingCart));


AddressForm.jsx
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class AddressForm extends Component {
  state = {
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

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  render() {
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
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={this.handleChange}
              defaultValue={values.firstName}
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
              onChange={this.handleChange}
              defaultValue={values.lastName}
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
              onChange={this.handleChange}
              defaultValue={values.address1}
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={this.handleChange}
              defaultValue={values.address2}
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
              onChange={this.handleChange}
              defaultValue={values.city}
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={this.handleChange}
              defaultValue={values.state}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={this.handleChange}
              defaultValue={values.zip}
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
              onChange={this.handleChange}
              defaultValue={values.country}
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


Review2.jsx
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

const payments = [
  { name: "Card type", detail: "Card name" },
  { name: "Card holder", detail: "First Name" },
  { name: "Card number", detail: "Card Number" },
  { name: "Expiry date", detail: "Exp Date" }
];

class Review2 extends Component {
  continue = event => {
    event.preventDefault();
    //Process Form to server
    this.props.nextStep();
  };
  back = event => {
    event.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { classes, cart } = this.props;
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
              $34.06
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            <Typography gutterBottom>
              {firstName}
              {lastName}
            </Typography>
            <Typography gutterBottom>
              {address1}
              {city}
              {state}
              {zip}
              {country}
            </Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Payment details
            </Typography>
            <Grid container>
              {payments.map(payment => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Button
          label="Place order"
          variant="contained"
          color="primary"
          onClick={this.continue}
          className={classes.button}
        />
        <Button
          label="Back"
          variant="contained"
          color="primary"
          onClick={this.back}
          className={classes.button}
        />
      </React.Fragment>
    );
  }
}

Review2.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(Review2);


const stripe = require("stripe")("pk_test_bL3rlTEmUTKKzKqnOi4Cx24u00RDFgX5di");

stripe.checkout.sessions.create({
  success_url: "https://example.com/success",
  cancel_url: "https://example.com/cancel",
  payment_method_types: ["card"],
  line_items: [{
    name: "T-shirt",
    description: "Comfortable cotton t-shirt",
    amount: 1500,
    currency: "cad",
    quantity: 2
  }]
}, function(err, session) {
  // asynchronously called
});

{payments.map(payment => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}


Navbar.jsx
// This component is only responsible for shared formatting (position, height, logo, etc)
class Navbar {
  render() {
      return (
          <div class={classes.root}>
              <Header>
                  <div>
                      <Logo>
                  </div>
                  <div>
                      {this.props.children}
                  </div>
              </Header>
          </div>
      )
  }
}

class LoggedInNavbar extends React.Component {
  render() {
      return (
          <div className={classes.navLink}>
            <Link className={classes.link} to="/">
              Home
            </Link>
            <Link className={classes.link} to="/catalogue">
              Catalogue
            </Link>
            <Link className={classes.link} to="/sellItem">
              Sell item
            </Link>
          </div>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              type="text"
              onChange={this.handleQueryChange}
              value={query}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div className={classes.navLink}>
            <Link onClick={setLogout} className={classes.link} to="/logout">
              Log out
            </Link>
          </div>
          <div>
            <AddShoppingCartIcon onClick={this.handleIconChange} />
          </div>
      )
  }
}



// App.js

{this.props.loggedIn
  ? <Navbar><LoggedInNavbar /></Navbar>
  : <Navbar><LoggedOutNavbar /></Navbar>
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #eee;
  min-height: 100vh;
`;
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;
  display: flex;
`;
const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Title = styled.div`
  text-align: left;
  > h2 {
    font-size: 40px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 0.9;
    margin-top: 23px;
    margin-bottom: 11.5px;
    font-weight: normal;
    color: black;
  }
`;

const Cart1Container = styled.div`
  flex: 2;
  /* position: relative; */
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  /* width: 55%; */
`;

const ProductEmptyCart = styled.div`
  background: #fff;
  padding: 200px 50px;
  text-align: center;
  > h2 {
    text-transform: uppercase;
    font-size: 40px;
  }
  > p {
    color: #666;
    font-size: 24px;
    text-transform: uppercase;
  }
`;
const ButtonLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 12px;
  font-size: 18px;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #eee;
  }
`;

// const ProductItem = styled.div`
//   margin-bottom: 20px;
// `;
const Article = styled.div`
  background-color: #fff;
  position: relative;
  margin-bottom: 4px;
  overflow: hidden;
`;
const ProductBox = styled.div`
  min-height: 180px;
  min-width: 280px;
  display: flex;
  /* flex: 2 auto auto; */
  align-items: center;
  /* justify-content: center; */
`;
const Image = styled.div`
  flex: 1;
  padding: 20px;
`;

const Details = styled.div`
  flex: 2;
  padding: 20px;
  margin-bottom: auto;
  > h4 {
    font-weight: 500;
    font-size: 20px;
    text-transform: uppercase;
    margin-top: 11.5px;
    margin-bottom: 11.5px;
    color: black;
  }
`;
const Description = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
`;
const ItemId = styled.div`
  width: 33.33333333%;
  float: left;
  > p {
    margin: 0 0 11.5px;
  }
  > span {
    color: #757575;
  }
`;
const Price = styled.div`
  width: 33.33333333%;
  float: left;
  > p {
    margin: 0 0 11.5px;
  }
`;
const Remove = styled.div`
  width: 43.33333333%;
`;

const Button = styled.button`
  padding: 12px;
  margin: 0;
  border: 1px solid black;
`;

const Order = styled.div`
  background: #fff;
  margin-bottom: 20px;
  width: 25%;
`;
const OrderDetails = styled.div`
  > h4 {
    margin: 10px 0;
    padding: 0 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 30px;
  }
`;
const Summary = styled.div`
  border-top: 4px solid #262626;
  padding-top: 15px;
  padding-bottom: 15px;
`;
const Subtotal = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`;
class ShoppingCart2 extends Component {
  render() {
    return (
      <Wrapper>
        <TitleContainer>
          <Title>
            <h2>Shopping Bag</h2>
          </Title>
        </TitleContainer>
        <Container>
          <Cart1Container>
            {/* <ProductEmptyCart>   
                <h2>Your shopping cart is empty</h2>
                <p>Fill it in with your favorite finds</p>
                <ButtonLink to={"/allProducts"}>Start Shopping</ButtonLink>
              </ProductEmptyCart> */}
            {/* <ProductItem> */}
            <Article>
              <ProductBox>
                <Image>
                  <img src="/assets/furniture.png" style={{ width: "100%" }} />
                  {/* {product.image} */}
                </Image>
                <Details>
                  <h4>Victorian Sofa</h4>
                  {/* <h4>{product.title}</h4> */}
                  <Description>
                    <ItemId>
                      <p>Item Number</p>
                      <span>2</span>
                      {/* <span>{product.id}</span> */}
                    </ItemId>
                    <Price>
                      <p>Price</p>
                      <span>$1234</span>
                      {/* <span>{product.price}</span> */}
                    </Price>
                    <Button>Remove</Button>
                  </Description>
                </Details>
              </ProductBox>
            </Article>
            {/* </ProductItem> */}
          </Cart1Container>
          <Order>
            <OrderDetails>
              <h4>Order Summary</h4>
              <Summary>
                <Subtotal>
                  <span>Item Price</span>
                  <span>$1234</span>
                  {/* <span>{product.price}</span> */}
                </Subtotal>
                <div />
                <div />
                <div />
                <div />
              </Summary>
              <div />
            </OrderDetails>
          </Order>
        </Container>
      </Wrapper>
    );
  }
}

export default ShoppingCart2;

<div style="background: #EEE; width: 500px; display: flex; justify-content: space-between;">
  <button>1</button>
  <button>2</button>
  <button>3</button>
</div>;

{/* <ProductEmptyCart>   
                <h2>Your shopping cart is empty</h2>
                <p>Fill it in with your favorite finds</p>
                <ButtonLink to={"/allProducts"}>Start Shopping</ButtonLink>
              </ProductEmptyCart> */}
            {/* <ProductItem> */}


            import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #eee;
  min-height: 100vh;
`;
const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Title = styled.div`
  text-align: left;
  > h2 {
    font-size: 40px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 0.9;
    margin-top: 23px;
    margin-bottom: 11.5px;
    font-weight: normal;
    color: black;
  }
`;
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 85%;
`;
const Cart1Container = styled.div`
  flex: 2;
  /* position: relative; */
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  /* width: 55%; */
`;

const ProductEmptyCart = styled.div`
  background: #fff;
  padding: 200px 50px;
  text-align: center;
  > h2 {
    text-transform: uppercase;
    font-size: 40px;
  }
  > p {
    color: #666;
    font-size: 24px;
    text-transform: uppercase;
  }
`;
const ButtonLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 12px;
  font-size: 18px;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #eee;
  }
`;

const ProductBox = styled.div`
  background-color: #fff;
  min-height: 180px;
  min-width: 280px;
  display: flex;
`;
const Image = styled.div`
  flex: 1;
  padding: 10px;
`;

const Details = styled.div`
  flex: 3;
  padding: 20px;
  margin-bottom: auto;
  > h4 {
    font-weight: 500;
    font-size: 24px;
    text-transform: uppercase;
    margin-top: 11.5px;
    margin-bottom: 11.5px;
    color: black;
  }
`;
const Description = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ItemId = styled.div`
  width: 30%;
  > p {
    margin: 0 0 11.5px;
    font-size: 18px;
  }
  > span {
    color: #757575;
  }
`;
const Price = styled.div`
  width: 30%;
  > p {
    margin: 0 0 11.5px;
    font-size: 18px;
  }
`;
const Remove = styled.div``;

const Button = styled.button`
  padding: 12px;
  margin: 0;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 18px;
`;

const Order = styled.div`
  background: #fff;
  width: 30%;
  min-height: 36vh;
  padding: 10px;
`;
const OrderDetails = styled.div`
  > h4 {
    margin: 10px 0;
    padding: 0 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 30px;
  }
`;
const Summary = styled.div`
  border-top: 4px solid #262626;
  padding-top: 15px;
  padding-bottom: 15px;
`;
const Subtotal = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  > span {
    text-align: left;
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #262626;
  }
`;
const OrderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  > span {
    text-align: left;
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #262626;
  }
`;
const TotalPrice = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 25px;
  > span {
    font-weight: 500;
    text-align: left;
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #262626;
  }
`;

const CheckoutButton = styled.button`
  margin: 15px 0;
  cursor: pointer;
  width: 100%;
  color: #fff;
  background-color: #d22b20;
  border-color: #bc261d;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid;
  padding: 10px 12px;
  font-size: 23px;
  border-radius: 0;
  transition-property: background-color, border, color, opacity;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #eee;
  min-height: 100vh;
`;
const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Title = styled.div`
  text-align: left;
  > h2 {
    font-size: 40px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 0.9;
    margin-top: 23px;
    margin-bottom: 11.5px;
    font-weight: normal;
    color: black;
  }
`;
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 85%;
`;
const Cart1Container = styled.div`
  flex: 2;
  /* position: relative; */
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  /* width: 55%; */
`;

const ProductEmptyCart = styled.div`
  background: #fff;
  padding: 200px 50px;
  text-align: center;
  > h2 {
    text-transform: uppercase;
    font-size: 40px;
  }
  > p {
    color: #666;
    font-size: 24px;
    text-transform: uppercase;
  }
`;
const ButtonLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 12px;
  font-size: 18px;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #eee;
  }
`;

const ProductBox = styled.div`
  background-color: #fff;
  min-height: 180px;
  min-width: 280px;
  display: flex;
`;
const Image = styled.div`
  flex: 1;
  padding: 10px;
`;

const Details = styled.div`
  flex: 3;
  padding: 20px;
  margin-bottom: auto;
  > h4 {
    font-weight: 500;
    font-size: 24px;
    text-transform: uppercase;
    margin-top: 11.5px;
    margin-bottom: 11.5px;
    color: black;
  }
`;
const Description = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ItemId = styled.div`
  width: 30%;
  > p {
    margin: 0 0 11.5px;
    font-size: 18px;
  }
  > span {
    color: #757575;
  }
`;
const Price = styled.div`
  width: 30%;
  > p {
    margin: 0 0 11.5px;
    font-size: 18px;
  }
`;
const Remove = styled.div``;

const Button = styled.button`
  padding: 12px;
  margin: 0;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 18px;
`;

const Order = styled.div`
  background: #fff;
  width: 30%;
  min-height: 36vh;
  padding: 10px;
`;
const OrderDetails = styled.div`
  > h4 {
    margin: 10px 0;
    padding: 0 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 30px;
  }
`;
const Summary = styled.div`
  border-top: 4px solid #262626;
  padding-top: 15px;
  padding-bottom: 15px;
`;
const Subtotal = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  > span {
    text-align: left;
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #262626;
  }
`;
const OrderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  > span {
    text-align: left;
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #262626;
  }
`;
const TotalPrice = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 25px;
  > span {
    font-weight: 500;
    text-align: left;
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    color: #262626;
  }
`;

const CheckoutButton = styled.button`
  margin: 15px 0;
  cursor: pointer;
  width: 100%;
  color: #fff;
  background-color: #d22b20;
  border-color: #bc261d;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid;
  padding: 10px 12px;
  font-size: 23px;
  border-radius: 0;
  transition-property: background-color, border, color, opacity;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;
class ShoppingCart2 extends Component {
  render() {
    return (
      <Wrapper>
        <TitleContainer>
          <Title>
            <h2>Shopping Bag</h2>
          </Title>
        </TitleContainer>
        <Container>
          <Cart1Container>
            <ProductBox>
              <Image>
                <img src="/assets/furniture.png" style={{ width: "100%" }} />
                {/* {product.image} */}
              </Image>
              <Details>
                <h4>Victorian Sofa</h4>
                {/* <h4>{product.title}</h4> */}
                <Description>
                  <ItemId>
                    <p>Item Number</p>
                    <span>2</span>
                    {/* <span>{product.id}</span> */}
                  </ItemId>
                  <Price>
                    <p>Price</p>
                    <span>$1234</span>
                    {/* <span>{product.price}</span> */}
                  </Price>
                  <Button>Remove</Button>
                </Description>
              </Details>
            </ProductBox>
          </Cart1Container>
          <Order>
            <OrderDetails>
              <h4>Order Summary</h4>
              <Summary>
                <Subtotal>
                  <span>Item Price</span>
                  <span style={{ textAlign: "right" }}>$1234</span>
                  {/* <span>{product.price}</span> */}
                </Subtotal>
                <OrderContainer>
                  <span>Shipping</span>
                  <span style={{ textAlign: "right" }}>Free</span>
                </OrderContainer>
                <TotalPrice>
                  <span>Total Price</span>
                  <span style={{ textAlign: "right" }}>$1234</span>
                </TotalPrice>
              </Summary>
              <CheckoutButton>Checkout</CheckoutButton>
              <div />
            </OrderDetails>
          </Order>
        </Container>
      </Wrapper>
    );
  }
}

export default ShoppingCart2;


import React, { Component } from "react";
import styled from "styled-components";
import Select from "react-select";
import { withRouter } from "react-router-dom";

const options = [
  { value: "furniture", label: "Furniture" },
  { value: "paintings", label: "Paintings" },
  { value: "jewellery", label: "Jewellery" }
];

const CardProduct = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 2px 4px 0px #ddd;
  margin: 20px;
  border-radius: var(--border-radius);
  text-align: center;
`;

// const Card = styled.div`
//   overflow: hidden;
//   background: #fff;
//   box-shadow: 0px 2px 4px 0px #ddd;
//   margin: 20px;
//   border-radius: var(--border-radius);
//   text-align: center;
// `;

const CardTitle = styled.h1`
  margin: 0;
  padding: 20px;
  background: #3f51b5;
  color: #fff;
  font-size: 1.6rem;
`;

const CardBody = styled.div`
  display: grid;
  margin: 20px;
`;

const Form = styled.form`
  width: 90%;
  min-width: 300px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;

const FormInput = styled.input`
  width: 95%;
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;
const TextArea = styled.textarea`
  width: 95%;
  height: 100px;
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;

const Center = styled.div`
  text-align: center;
`;

// const buttonStyles = css`
//   padding: 10px 20px;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   border: none;
//   color: #fff;
//   font-size: 1rem;
//   background: var(--primary-color);
//   outline: none;
//   text-decoration: none;
// `;

// const Button = styled.button`
//   ${buttonStyles}
// `;
// export const FormButton = styled.button`
//   margin: 10px 0;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   cursor: pointer;
//   width: ${(props) => (props.wide ? '100%' : 'auto')};
// `;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  background: #3f51b5;
  outline: none;
  text-decoration: none;
`;

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px 0;
  border-radius: 6px;
  position: relative;
`;

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      title: "",
      description: "",
      price: "",
      selectedOption: null
    };
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };
  handleImageChange = event => {
    this.setState({ image: event.target.files[0] });
  };
  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };
  // handleLocationChange = event => {
  //   this.setState({ location: event.target.value });
  // };
  handleCategoryChange = selectedOption => {
    this.setState({ selectedOption });
    console.log("Option selected:", selectedOption);
  };
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("form submitted");
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("img", this.state.image);
    data.append("price", this.state.price);
    // data.append("location", this.state.location);
    data.append("category", this.state.selectedOption.value);
    data.append("description", this.state.description);
    await fetch("/newitem", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    this.props.history.push(`/catalogue/${this.state.selectedOption.value}`);
  };
  render() {
    return (
      <CardProduct>
        <CardTitle>Fill this form to sell your item</CardTitle>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Wrapper>
              <div>
                <label>
                  Product Name
                  <FormInput
                    onChange={this.handleTitleChange}
                    value={this.state.title}
                    type="text"
                    placeholder="Type your product name"
                  />
                </label>
              </div>
              <div>
                <label>
                  <div>
                    Product Image
                    {/* <button>Upload a file</button> */}
                    <input onChange={this.handleImageChange} type="file" />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Price
                  <FormInput
                    onChange={this.handlePriceChange}
                    type="text"
                    value={this.state.price}
                  />
                </label>
              </div>
              {/* <label>
                Seller Location
                <FormInput
                  onChange={this.handleLocationChange}
                  type="text"
                  value={this.state.location}
                />
              </label> */}
              <label>
                Choose the Category
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleCategoryChange}
                  options={options}
                />
              </label>
              <label>
                Product Description
                <textarea
                  onChange={this.handleDescriptionChange}
                  type="textarea"
                  value={this.state.decsription}
                  placeholder="Type the description of your item"
                  cols={80}
                  rows={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "14px",
                    padding: "10px",
                    margin: "10px 0",
                    display: "block"
                  }}
                />
              </label>
              <div>
                <Center>
                  <SubmitButton>Add Item</SubmitButton>
                </Center>
              </div>
            </Wrapper>
          </Form>
        </CardBody>
      </CardProduct>
    );
  }
}

export default withRouter(ProductForm);




render() {
    const { cart } = this.props;
    console.log(this.props);
    return (
      <Wrapper>
        <TitleContainer>
          <Title>
            <h2>Shopping Bag</h2>
          </Title>
        </TitleContainer>
        <CheckoutContainer>
          <CartItemList>
            {cart.map(product => (
              <Container key={product.id}>
                <ProductBox>
                  <Image>
                    <img
                      src={product.image}
                      style={{ width: 150, height: 150, objectFit: "cover" }}
                    />
                  </Image>
                  <Details>
                    <h4>{product.title}</h4>
                    <Description>
                      <ItemId>
                        <p>Item Number</p>
                        <span>{product.id}</span>
                      </ItemId>
                      <Price>
                        <p>Price</p>
                        <span>{product.price}</span>
                      </Price>
                      <Button
                        type="button"
                        onClick={() => this.handleOnClickRemove(product.id)}
                      >
                        Remove
                      </Button>
                    </Description>
                  </Details>
                </ProductBox>
              </Container>
            ))}
          </CartItemList>
          <Order>
            <OrderDetails>
              <h4>Order Summary</h4>
              <Summary>
                {cart.map(product => (
                  <Subtotal>
                    <span>Item Price</span>
                    <span style={{ textAlign: "right" }}>{product.price}</span>
                  </Subtotal>
                ))}
                <OrderContainer>
                  <span>Shipping</span>
                  <span style={{ textAlign: "right" }}>Free</span>
                </OrderContainer>
                <TotalPrice>
                  <span>Total Price</span>
                  <span style={{ textAlign: "right" }}>
                    ${this.calculateTotalPrice()}
                  </span>
                </TotalPrice>
              </Summary>
              <CheckoutButton
                type="button"
                onClick={this.handleOnClickCheckout}
              >
                Checkout
              </CheckoutButton>
              <div />
            </OrderDetails>
          </Order>
        </CheckoutContainer>
      </Wrapper>
    );
  }
}