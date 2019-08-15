import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CatalogueButtons from "./CataloguesButtons.jsx";
import HomeTable from "./HomeTable.jsx";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #fff;
  box-sizing: border-box;
`;
const HeroImage = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("/assets/furniture.png");
  background-size: cover;
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const HeroTitle = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  > h1 {
    margin: 10%;
    font-size: 4em;
    font-weight: 300;
  }
  > h3 {
    font-size: 2em;
    font-style: italic;
    font-weight: 300;
    padding-bottom: 50px;
  }
`;

const ButtonLink = styled(Link)`
  position: relative;
  padding: 1.4rem 4.2rem;
  padding-right: 3.1rem;
  font-size: 1.4rem;
  color: #fff;
  letter-spacing: 0.7rem;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 600ms cubic-bezier(0.77, 0, 0.175, 1);
  cursor: pointer;
  user-select: none;
  &:before,
  &:after {
    content: "";
    position: absolute;
    transition: inherit;
    z-index: -1;
  }
  &:hover {
    color: #96b7c4;
    transition-delay: 0.6s;
  }
  &:hover:before {
    transition-delay: 0s;
  }
  &:hover:after {
    background: rgba(0, 0, 0, 0.5);
    transition-delay: 0.4s;
  }
  &:before {
    top: 0;
    left: 50%;
    height: 100%;
    width: 0;
    border: 1px solid #fff;
    border-left: 0;
    border-right: 0;
  }
  &:after {
    bottom: 0;
    left: 0;
    height: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  &:hover:before {
    left: 0;
    width: 100%;
  }
  &:hover:after {
    top: 0;
    height: 100%;
  }
`;

const CatalogueContainer = styled.div`
  background-color: #fff;
  min-width: 100%;
  position: relative;
  min-height: 80vh;
  padding: 80px 0 0;
`;
const CatalogueTitle = styled.div`
  text-align: center;
  min-width: 100%;
  > h1 {
    margin: 0px 0 50px;
    padding: 0 15px;
    font-family: Proxima Nova, "proxima-nova", "Helvetica Neue", Helvetica,
      sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 34px;
    line-height: 48px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #4a4a4a;
  }
`;

const Catalogues = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Home extends Component {
  render() {
    return (
      <Wrapper>
        <HeroImage>
          <HeroTitle>
            <h1>Welcome to VintageAntique</h1>
            <h3>Explore the collection of masterpieces</h3>
            <ButtonLink to={"/allProducts"}>View All</ButtonLink>
          </HeroTitle>
        </HeroImage>
        <CatalogueContainer>
          <CatalogueTitle>
            <h1>Shop by Category</h1>
          </CatalogueTitle>
          <Catalogues>
            <CatalogueButtons />
          </Catalogues>
        </CatalogueContainer>
        <HomeTable />
      </Wrapper>
    );
  }
}

export default Home;
