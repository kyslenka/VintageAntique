import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  /* min-height: 100vh; */
  background: #fff;
  margin: 50px;
  /* max-width: 1070px;
  margin: 0 auto;
  padding: 15px; */
  /* flex-flow: column wrap; */
  /* align-items: center;
  justify-content: space-between; */
`;
const Container = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;
  /* justify-content: center; */
`;
// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   width: 100%;
// `;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-basis: 100%;
//   flex: 1;
// `;

// const Column1 = styled.div`
//   background-color: blue;
//   height: 100px;
// `;

// const Column2 = styled.div`
//   height: 100px;
//   background-color: green;
// `;
// const Title = styled.div`
//   text-align: center;
//   position: absolute;
//   /* top: 50%;
//   left: 50%; */
//   > h2 {
//     font-size: 2em;
//     font-weight: 300;
//   }
// `;
// const Image = styled.div`
//   > img {
//     width: 200px;
//     height: 200px;
//     display: inline-block;
//   }
// `;
// const Description = styled.div`
//   text-align: center;
//   min-width: 45%;
// `;

// const Button = styled.button`
//   position: relative;
//   border: 2px solid #fff;
//   font-weight: 600;
//   background: rgba(0, 0, 0, 0.5);
//   color: #fff;
//   text-transform: uppercase;
//   letter-spacing: 1.5px;
//   padding: 0 10px;
//   height: 50px;
//   width: 25%;
//   line-height: 50px;
//   margin-top: 10%;
//   cursor: pointer;
// `;

const LeftColumn = styled.div`
  grid-column: span 2;
  /* grid-column: 1 / 3; */
  /* grid-row: 1; */
  /* margin-top: 80px; */
  /* width: 65%; */
  /* flex: 1; */
  position: relative;
  > img {
    max-width: 100%;
    /* position: absolute;
    left: 0;
    top: 0; */
  }
`;
const RightColumn = styled.div`
  grid-column: span 1;
  /* grid-row: 1 / 3; */
  /* width: 35%; */
  /* flex: 1; */
`;
const ProductDescription = styled.div`
  margin-bottom: 20px;
  /* > span {
    font-size: 12px;
    color: #358ed7;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
  } */
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
  background-color: #e4990e;
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
    background-color: #ecac35;
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
