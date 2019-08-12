import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// const Wrapper = styled.div`
//   background: #eee;
//   min-height: 100vh;
// `;
const CheckoutContainer = styled.div`
  width: 1150px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  min-height: 100vh;
  background: #eee;
  min-height: 100vh;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr auto;
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
const CartItemList = styled.div`
  margin-bottom: 20px;
  /* display: flex; */
`;
const Container = styled.div`
  background-color: #fff;
  padding: 15px 0;
  position: relative;
  margin-bottom: 4px;
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
      //   <Wrapper>
      <CheckoutContainer className="wrapper">
        <TitleContainer className="box item1">
          <Title>
            <h2>Shopping Bag</h2>
          </Title>
        </TitleContainer>
        <CartItemList className="box item2">
          <Container>
            {/* <Cart1Container> */}
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
            {/* </Cart1Container> */}
          </Container>
        </CartItemList>
        <Order className="box item3">
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
      </CheckoutContainer>
      //   </Wrapper>
    );
  }
}

export default ShoppingCart2;
