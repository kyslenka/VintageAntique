import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

const FooterWrapper = styled.div`
  background: #333;
  color: #fff;
  bottom: 0;
`;
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1 auto;
  width: 100%;
  margin-top: auto;
`;

const Container = styled.div`
  text-align: center;
  flex: 2;
`;
const TextLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 7px 25px;
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  font-family: "Times, Times New Roman, serif";
  &:hover {
    color: #ddd;
  }
`;
const List = styled.ul`
  list-style-type: none;
  padding: 7px 25px;
  max-width: 550px;
  margin: 0 auto;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <Container>
          <div
            style={{
              maxWidth: 450,
              margin: "0 auto",
              marginBottom: "20px",
              fontSize: "20px",
              fontFamily: "Times, Times New Roman, serif"
            }}
          >
            The{" "}
            <span style={{ fontFamily: "Parisienne, cursive" }}>
              VintageAntique
            </span>{" "}
            is a top marketplace to buy and sell antiques online.
            <span>
              Our mission is to help you find a unique masterpiece to satisfy
              all your demands.
            </span>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontFamily: "Times, Times New Roman, serif"
            }}
          >
            Copyright &copy; 2019 VintageAntique
          </div>
        </Container>
        <Container style={{ flex: 1 }}>
          <List>
            <li>
              <TextLink to={"/catalogue/furniture"}>Furniture</TextLink>
            </li>
            <li>
              <TextLink to={"/catalogue/paintings"}>Paintings</TextLink>
            </li>
            <li>
              <TextLink to={"/catalogue/jewellery"}>Jewellery</TextLink>
            </li>
          </List>
        </Container>
        <Container>
          <List>
            <li>
              <div
                style={{
                  padding: "7px 25px",
                  fontSize: "20px",
                  fontFamily: "Times, Times New Roman, serif"
                }}
              >
                <Icon style={{ fontSize: 22, paddingTop: 3, marginRight: 10 }}>
                  home
                </Icon>{" "}
                528 Parc Avenue, New York, NY 10031, US
              </div>
            </li>
            <li>
              <div
                style={{
                  padding: "7px 25px",
                  fontSize: "20px",
                  fontFamily: "Times, Times New Roman, serif"
                }}
              >
                <Icon style={{ fontSize: 22, paddingTop: 3, marginRight: 10 }}>
                  mail_outline
                </Icon>
                info@vintageantique.com
              </div>
            </li>
            <li>
              <div
                style={{
                  padding: "7px 25px",
                  fontSize: "20px",
                  fontFamily: "Times, Times New Roman, serif"
                }}
              >
                <Icon style={{ fontSize: 22, paddingTop: 3, marginRight: 10 }}>
                  phone
                </Icon>
                + 01 298 742 88
              </div>
            </li>
          </List>
        </Container>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
