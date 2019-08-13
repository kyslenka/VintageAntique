import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import "./main.css";
import Navbar from "./Navbar.jsx";
import SignUp from "./SignUp.jsx";
import LogIn from "./LogIn.jsx";
import Home from "./Home.jsx";
import Catalogue from "./Catalogue.jsx";
import ProductForm from "./ProductForm.jsx";
import ProductDetails2 from "./ProductDetails2.jsx";
import SearchResults from "./SearchResults.jsx";
import ShoppingCart2 from "./ShoppingCart2.jsx";
import Checkout from "./Checkout.jsx";
import AddressForm from "./AddressForm.jsx";
import PaymentForm from "./PaymentForm.jsx";
import Review from "./Review.jsx";
import Footer from "./Footer.jsx";
import Products from "./Products.jsx";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #fff;
  box-sizing: border-box;
`;

const Routes = styled.div`
  /* min-height: 100vh; */
  min-height: calc(100vh - 60px - 130px);
`;
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
  renderProductDetails2 = routerData => {
    const productId = routerData.match.params.productId;
    const catalogueId = routerData.match.params.catalogueId;
    return <ProductDetails2 id={productId} catalogueId={catalogueId} />;
  };
  renderProductForm = () => {
    return <ProductForm />;
  };
  renderShoppingCart2 = routerData => {
    const productId = routerData.match.params.productId;
    const catalogueId = routerData.match.params.catalogueId;
    return <ShoppingCart2 id={productId} catalogueId={catalogueId} />;
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
  renderProducts = () => {
    return <Products />;
  };
  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        {this.props.login ? (
          <Wrapper>
            <Navbar />
            <Routes>
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
                render={this.renderProductDetails2}
              />
              <Route
                exact={true}
                path="/sellItem"
                render={this.renderProductForm}
              />
              <Route
                exact={true}
                path="/cart/catalogue/:catalogueId/product/:productId"
                render={this.renderShoppingCart2}
              />
              <Route
                exact={true}
                path="/checkout"
                render={this.renderCheckout}
              />
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
              <Route
                exact={true}
                path="/allProducts"
                render={this.renderProducts}
              />
            </Routes>
            <Footer />
          </Wrapper>
        ) : (
          <div>
            <Navbar />
            <SignUp />
            <LogIn />
            <Footer />
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
