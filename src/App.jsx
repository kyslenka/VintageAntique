import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import "./main.css";
import Navbar from "./Navbar.jsx";
import Navbar2 from "./Navbar2.jsx";
// import FooterPage from "./FooterPage.jsx";
import SignUp from "./SignUp.jsx";
import LogIn from "./LogIn.jsx";
import Home from "./Home.jsx";
import Catalogue from "./Catalogue.jsx";
import ProductForm from "./ProductForm.jsx";
import ProductDetails from "./ProductDetails.jsx";
import SearchResults from "./SearchResults.jsx";
import ShoppingCart from "./ShoppingCart.jsx";
import Checkout from "./Checkout.jsx";
import AddressForm from "./AddressForm.jsx";
import PaymentForm from "./PaymentForm.jsx";
import Review from "./Review.jsx";

class App extends Component {
  async componentDidMount() {
    const response = await fetch("/session");
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({ type: "LOGIN_SUCCESS", username: body.username });
    }
  }
  renderHome = () => {
    return <Home />;
  };
  renderSearchResults = () => {
    return <SearchResults />;
  };
  renderCatalogue = routerData => {
    const catalogueId = routerData.match.params.catalogueId;
    return <Catalogue id={catalogueId} />;
  };
  renderProductDetails = routerData => {
    const productId = routerData.match.params.productId;
    const catalogueId = routerData.match.params.catalogueId;
    return <ProductDetails id={productId} catalogueId={catalogueId} />;
  };
  renderProductForm = () => {
    return <ProductForm />;
  };
  renderShoppingCart = routerData => {
    const productId = routerData.match.params.productId;
    const catalogueId = routerData.match.params.catalogueId;
    return <ShoppingCart id={productId} catalogueId={catalogueId} />;
  };
  renderCheckout = () => {
    return <Checkout />;
  };
  renderAddressForm = () => {
    return <AddressForm />;
  };
  renderPaymentForm = () => {
    return <PaymentForm />;
  };
  renderReview = () => {
    return <Review />;
  };
  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        {this.props.login ? (
          <div>
            <Navbar />
            <Route exact={true} path="/" render={this.renderHome} />
            <Route
              exact={true}
              path="/searchResults"
              render={this.renderSearchResults}
            />
            <Route
              exact={true}
              path="/catalogue/:catalogueId"
              render={this.renderCatalogue}
            />
            <Route
              exact={true}
              path="/catalogue/:catalogueId/product/:productId"
              render={this.renderProductDetails}
            />
            <Route
              exact={true}
              path="/sellItem"
              render={this.renderProductForm}
            />
            <Route
              exact={true}
              path="/cart/catalogue/:catalogueId/product/:productId"
              render={this.renderShoppingCart}
            />
            <Route exact={true} path="/checkout" render={this.renderCheckout} />
            <Route
              exact={true}
              path="/addressForm"
              render={this.renderAddressForm}
            />
            <Route
              exact={true}
              path="/paymentForm"
              render={this.renderPaymentForm}
            />
            <Route exact={true} path="/review" render={this.renderReview2} />
            {/* <FooterPage /> */}
          </div>
        ) : (
          <div>
            <Navbar2 />
            <SignUp />
            <LogIn />
            {/* <FooterPage /> */}
          </div>
        )}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { login: state.loggedIn };
};

export default connect(mapStateToProps)(App);
