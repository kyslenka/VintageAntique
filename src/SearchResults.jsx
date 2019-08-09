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

class SearchResults extends Component {
  render() {
    const { catalogues, query } = this.props;
    const productsArray = catalogues.map(catalogue => {
      return catalogue.products;
    });
    const products = [].concat(...productsArray);
    const hasQuery = query.length > 0;
    const resultData = hasQuery ? products : [];
    console.log(products);
    const results = resultData.filter(product => {
      return product.title.toLowerCase().includes(query.toLowerCase());
    });
    return (
      <div>
        <Wrapper>
          {results.map(product => (
            <ItemCard
              title={product.title}
              image={product.image}
              price={product.price}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { catalogues: state.catalogues, query: state.query };
};

export default connect(mapStateToProps)(SearchResults);
