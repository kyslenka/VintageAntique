import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import CartItem from "./CartItem.jsx";

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
  color: black;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
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
  font-weight: 400;
  font-size: 20px;
`;

const Price = styled.div`
  padding-top: 30px;
  text-align: center;
  font-size: 16px;
  color: black;
  font-weight: 300;
`;

const Button = styled.div`
  height: 20px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  width: auto;
  text-align: center;
  background-color: #8a2be2;
`;

const Total = styled.div`
  font-weight: 500;
  font-size: 20px;
  text-align: end;
`;

class ShoppingCart extends Component {
  calculateTotalPrice = () => {
    let totalPrice = 0;
    this.props.cart.forEach(product => {
      console.log(product, totalPrice);
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

  // fetchProduct = async () => {
  //   const response = await fetch(
  //     `cart/product?productId=${this.props.id}&catalogueId=${
  //       this.props.catalogueId
  //     }`
  //   );
  //   const body = await response.json();
  //   if (body.success) {
  //     this.setState({ product: body.product });
  //   }
  // };

  handleOnClickRemove = async () => {
    const data = {
      catalogueId: this.props.catalogueId,
      productId: this.props.catalogueId
    };
    const response = await fetch("/remove/cart/product", {
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
    const hasProducts = cart.length;
    console.log(hasProducts);
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
              Remove
            </Button>
          </Item>
        ))}
        <Total>Total Price: ${this.calculateTotalPrice()}</Total>
        <Button
          type="button"
          onClick={this.handleOnClickCheckout}
        >
          Checkout
        </Button>
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
