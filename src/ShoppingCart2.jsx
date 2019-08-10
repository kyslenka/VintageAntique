import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #eee;
  min-height: calc(100vh - 10px);
`;
const Container = styled.div`
  width: 1170px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  /* display: grid;
  grid-gap: 10px;
  grid-template-columns: 100px 100px 100px; */
`;
const CartCheckout = styled.div`
  text-align: left;
`;
const Cart = styled.div`
  margin-left: -15px;
  margin-right: -15px;
`;
const TitleContainer = styled.div`
  width: 100%;
  float: left;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Title = styled.div`
  text-align: left;
  > h2 {
    font-size: 60px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 0.9;
    margin-top: 23px;
    margin-bottom: 11.5px;
    font-weight: normal;
    color: grey;
  }
`;

class ShoppingCart2 extends Component {
  render() {
    return (
      <Wrapper>
        <Container>
          <CartCheckout>
            <Cart>
              <TitleContainer>
                <Title>
                  <h2>Shopping Bag</h2>
                </Title>
              </TitleContainer>
            </Cart>
          </CartCheckout>
        </Container>
      </Wrapper>
    );
  }
}

export default ShoppingCart2;
