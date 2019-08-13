import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WidjetWrapper = styled.div`
  min-width: 100%;
  position: relative;
  min-height: 140vh;
  padding: 30px 10px;
  background: #fafafa;
`;
const WidjetContainer = styled.div`
  width: 100%;
  max-width: 1440px !important;
  margin: 0 auto;
`;
const Events = styled.div`
  opacity: 1;
  transition: opacity 0.15s linear;
`;
const Item1 = styled.div`
  margin-bottom: 10px;
  float: left;
  width: 50%;
  position: relative;
`;
const TextLink = styled(Link)`
  color: #555;
  text-decoration: none;
  background-color: transparent;
  &:hover {
    color: #bbb2b2;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  opacity: 1;
  > img {
    width: 100%;
  }
`;
const Content = styled.div`
  text-align: left;
  min-height: 210px;
  padding: 20px;
  background: #fff;
`;
const ThemeContent = styled.div`
  text-align: left;
  > h3 {
    margin-bottom: 10px;
    line-height: 1.1;
    font-weight: 100;
  }
  > h2 {
    font-size: 30px;
    line-height: 33px;
    font: 100 24px/27px "freight-display-pro", Georgia, Palatino,
      "Palatino Linotype", Times, "Times New Roman", serif;
    margin-top: 0;
    color: #323232;
  }
  > p {
    font-size: 16px;
    line-height: 16px;
    padding-bottom: 15px;
  }
`;
const Item2 = styled.div`
  margin-bottom: 40px;
  float: right;
  width: 40%;
  position: relative;
`;

const ImageWrapper2 = styled.div`
  display: flex;
  opacity: 1;
  > img {
    width: 100%;
  }
`;
const Content2 = styled.div`
  text-align: left;
  min-height: 180px;
  padding: 20px;
  background: #fff;
`;
const ThemeContent2 = styled.div`
  text-align: left;
  > h3 {
    margin-bottom: 10px;
    line-height: 1.1;
    font-weight: 100;
  }
  > h2 {
    font-size: 30px;
    line-height: 33px;
    font: 100 24px/27px "freight-display-pro", Georgia, Palatino,
      "Palatino Linotype", Times, "Times New Roman", serif;
    margin-top: 0;
    color: #323232;
  }
  > p {
    font-size: 16px;
    line-height: 16px;
    padding-bottom: 15px;
  }
`;
class HomeTable extends Component {
  render() {
    return (
      <WidjetWrapper>
        <WidjetContainer>
          <Events>
            <Item1>
              <ImageWrapper>
                <img src={"/assets/chairs.jpg"} />
              </ImageWrapper>
              <Content>
                <ThemeContent>
                  <h3>Personal Space</h3>
                  <h2>Unique Chairs from Different Eras</h2>
                  <p>
                    A timeless palette of chairs to take you back in time of
                    authentic luxury furniture
                  </p>
                  <TextLink to={"/catalogue/furniture"}>SHOP NOW</TextLink>
                </ThemeContent>
              </Content>
            </Item1>
            <Item2>
              <ImageWrapper2>
                <img src={"/assets/forsale.jpg"} />
              </ImageWrapper2>
              <Content2>
                <ThemeContent2>
                  <h3>Have your own antique pieces for sale?</h3>
                  <h2>Let's make it happen!</h2>
                  <p>All you need is to fill out this form</p>
                  <TextLink to={"/sellItem"}>SELL ITEM</TextLink>
                </ThemeContent2>
              </Content2>
            </Item2>
          </Events>
        </WidjetContainer>
      </WidjetWrapper>
    );
  }
}

export default HomeTable;
