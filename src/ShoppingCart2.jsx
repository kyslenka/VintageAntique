import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Wrapper = styled.div`
  background: #eee;
  overflow: hidden;
  min-height: 100vh;
`;
const CheckoutContainer = styled.div`
  display: flex;
  padding: 0 120px;
  /* grid-gap: 20px;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: repeat(7, 100px);
  justify-content: center;
  /* width: 1150px; */
  /* margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  min-height: 100vh;
  background: #eee; */
`;
// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: 2fr auto;
// `;
const TitleContainer = styled.div`
  /* width: 100%;
  position: relative;
  min-height: 1px; */
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
  margin-bottom: 20px;
  /* grid-column: 1 / 4;
  grid-row: 2 / 4; */
  background-color: #fff;
  padding: 15px 0;
  position: relative;
  margin-bottom: 8px;
  overflow: hidden;
  /* margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 85%; */
`;
// const Cart1Container = styled.div`
//   flex: 2;
//   /* position: relative; */
//   min-height: 1px;
//   padding-left: 15px;
//   padding-right: 15px;
//   /* width: 55%; */
// `;

const ProductBox = styled.div`
  background-color: #fff;
  min-width: 280px;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-evenly;
`;
const Image = styled.div`
  flex: 1;
  /* flex: 1; */
  padding: 10px;
  overflow: hidden;
`;

const Details = styled.div`
  flex: 4;
  /* flex: 3; */
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
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  font-weight: 500;
  background: #d4d3d3;
  outline: none;
  text-decoration: none;
  text-transform: uppercase;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  &:hover {
    background: #e2dfdf;
  }
  /* padding: 12px;
  margin: 0;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 18px; */
`;

const Order = styled.div`
  background: #fff;
  /* width: 30%; */
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
const ProductEmptyCart = styled.div`
  background: #fff;
  padding: 150px 20px;
  margin: 0 auto;
  height: 500px;
  width: 800px;
  text-align: center;
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
class ShoppingCart2 extends Component {
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

export default withRouter(connect(mapStateToProps)(ShoppingCart2));
