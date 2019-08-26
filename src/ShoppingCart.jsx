import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #eee;
  overflow: hidden;
  min-height: 100vh;
`;
const CheckoutContainer = styled.div`
  display: flex;
  padding: 0 120px;
`;

const TitleContainer = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`;
const Title = styled.div`
  text-align: left;
  > h2 {
    font-size: 40px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: normal;
    color: black;
  }
`;
const CartItemList = styled.div`
  flex: 1;
  min-height: 100vh;
`;
const Container = styled.div`
  background-color: #fff;
  padding: 15px 0;
  margin-bottom: 8px;
  overflow: hidden;
`;

const ProductBox = styled.div`
  background-color: #fff;
  min-width: 280px;
  display: flex;
`;
const Image = styled.div`
  flex: 1;
  padding: 10px;
`;

const Details = styled.div`
  flex: 4;
  padding: 20px;
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
  font-family: Arial, Helvetica, sans-serif;
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
  font-family: Arial, Helvetica, sans-serif;
  width: 30%;
  > p {
    margin: 0 0 11.5px;
    font-size: 18px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  font-weight: 500;
  background: #d4d3d3;
  text-transform: uppercase;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  &:hover {
    background: #e2dfdf;
  }
`;

const Order = styled.div`
  background: #fff;
  min-height: 39vh;
  padding: 10px;
  width: 300px;
  align-self: flex-start;
  margin-left: 30px;
`;
const OrderDetails = styled.div`
  > h4 {
    margin: 10px 0;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 26px;
  }
`;
const Summary = styled.div`
  border-top: 4px solid #262626;
  padding-top: 15px;
  padding-bottom: 25px;
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
  padding-top: 45px;
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
  outline: none;
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
  &:hover {
    background-color: #ca241a;
  }
`;
const ProductEmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: #fff;
  height: 500px;
  width: 800px;
  box-shadow: 0 -6px 0 #fff, 0 1px 6px rgba(0, 0, 0, 0.35);
  > h2 {
    text-transform: uppercase;
    font-size: 34px;
    padding: 10px;
  }
  > p {
    color: #666;
    font-size: 24px;
    text-transform: uppercase;
  }
`;
const ButtonLink = styled(Link)`
  display: inline-block;
  background-color: #cfbce88c;
  margin-top: 20px;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 3px;
  padding: 12px 12px;
  font-size: 16px;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #dfd1f18c;
  }
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
    this.fetchItemsInCart();
  };
  fetchItemsInCart = async () => {
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
  handleOnClickCheckout = () => {
    this.props.history.push("/checkout");
  };
  handleOnClickRemove = async () => {
    const data = {
      catalogueId: this.props.catalogueId,
      productId: this.props.id
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
        {cart.length > 0 && (
          <CheckoutContainer>
            <CartItemList>
              {cart.map(product => (
                <Container key={product.title}>
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
                      <span style={{ textAlign: "right" }}>
                        {product.price}
                      </span>
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
        )}
        {cart.length === 0 && (
          <ProductEmptyCart>
            <h2>Your shopping bag is empty</h2>
            <p>Fill it in with your favorite finds</p>
            <ButtonLink to={"/allProducts"}>Start Shopping</ButtonLink>
          </ProductEmptyCart>
        )}
      </Wrapper>
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
