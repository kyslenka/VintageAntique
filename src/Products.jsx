import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ItemCard from "./ItemCard.jsx";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
`;

class Products extends Component {
  render() {
    const { catalogues } = this.props;
    const productsArray = catalogues.map(catalogue => {
      return catalogue.products;
    });
    const products = [].concat(...productsArray);
    console.log(products);
    return (
      <div>
        <Wrapper>
          {products.map(product => {
            const catalogue = catalogues.find(c => {
              return c.products.some(p => p.id === product.id);
            });
            return (
              <ItemCard
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                id={product.id}
                catalogueId={catalogue.id}
              />
            );
          })}
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { catalogues: state.catalogues };
};

export default connect(mapStateToProps)(Products);
