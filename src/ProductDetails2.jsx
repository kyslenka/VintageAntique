import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #fff;
  margin: 50px;
`;
const Container = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 2fr auto 1fr;
  max-width: 900px;
  margin: auto;
`;

const LeftColumn = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  overflow: hidden;
  grid-column: span 2;
  position: relative;
  > img {
    position: absolute;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const RightColumn = styled.div`
  grid-column: span 1;
`;
const ProductDescription = styled.div`
  margin-bottom: 20px;

  > h1 {
    font-size: 32px;
    margin-bottom: 25px;
    font-weight: normal;
    color: black;
  }
  > p {
    font-size: 18px;
    font-weight: 300;
    color: black;
    line-height: 28px;
    max-width: 400px;
  }
`;
const Price = styled.div`
  > span {
    font-size: 22px;
    font-weight: 300;
    color: black;
    margin-right: 20px;
  }
`;
const Button = styled.div`
  display: inline-block;
  background-color: #cfbce88c;
  border-radius: 6px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  color: black;
  text-decoration: none;
  padding: 16px 20px;
  transition: all 0.5s;
  font-family: Arial, Helvetica, sans-serif;
  &:hover {
    background-color: #dfd1f18c;
  }
`;

class ProductDetails2 extends Component {
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
  handleOnClickAdd = async () => {
    const data = {
      catalogueId: this.props.catalogueId,
      productId: this.props.id
    };
    const response = await fetch("/cart/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    console.log(body);
    if (body.success) {
      this.props.history.push(
        `/cart/catalogue/${this.props.catalogueId}/product/${this.props.id}`
      );
    }
  };
  render() {
    if (!this.state.product) {
      return "Loading...";
    }
    const { image, title, description, price } = this.state.product;
    console.log(this.state);
    return (
      <Wrapper>
        <Container>
          <LeftColumn>
            <img src={image} />
          </LeftColumn>
          <RightColumn>
            <ProductDescription>
              <h1>{title}</h1>
              <Price>
                <span>{price}</span>
              </Price>
              <p>{description}</p>
            </ProductDescription>
            <Button onClick={this.handleOnClickAdd}>Add to cart</Button>
          </RightColumn>
        </Container>
      </Wrapper>
    );
  }
}

export default withRouter(ProductDetails2);
