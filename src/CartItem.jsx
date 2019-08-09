import React, { Component } from "react";
import styled from "styled-components";

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

class CartItem extends Component {
  render() {
    const { image, title, price, id } = this.props;
    return (
      <Item key={title}>
        <Image>
          <img src={image} style={{ height: "150px" }} />
        </Image>
        <Description>{title}</Description>
        <Price>{price}</Price>
        {/* <Button
          type="button"
          onClick={() => this.handleOnClickRemove(product.id)}
        >
          Remove Item
        </Button> */}
      </Item>
    );
  }
}

export default CartItem;
