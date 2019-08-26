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
  align-items: center;
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
const TextBox = styled.div`
  max-width: 450px;
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 20px;
  font-family: "Times, Times New Roman, serif";
`;
const CopyRight = styled.div`
  font-size: 20px;
  font-family: "Times, Times New Roman, serif";
`;
const ListItem = styled.div`
  padding: 7px 25px;
  font-size: 20px;
  font-family: "Times, Times New Roman, serif";
  list-style: none;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <Container>
          <TextBox>
            The{" "}
            <span style={{ fontFamily: "Parisienne, cursive" }}>
              VintageAntique
            </span>{" "}
            is a top marketplace to buy and sell antiques online.
            <span>
              Our mission is to help you find a unique masterpiece to satisfy
              all your demands.
            </span>
          </TextBox>
          <CopyRight>Copyright &copy; 2019 VintageAntique</CopyRight>
        </Container>
        <Container style={{ flex: 1 }}>
          <ListItem>
            <li>
              <TextLink to={"/catalogue/furniture"}>Furniture</TextLink>
            </li>
            <li>
              <TextLink to={"/catalogue/paintings"}>Paintings</TextLink>
            </li>
            <li>
              <TextLink to={"/catalogue/jewellery"}>Jewellery</TextLink>
            </li>
          </ListItem>
        </Container>
        <Container>
          <List>
            <li>
              <ListItem>
                <Icon style={{ fontSize: 22, paddingTop: 3, marginRight: 10 }}>
                  home
                </Icon>{" "}
                528 Parc Avenue, New York, NY 10031, US
              </ListItem>
            </li>
            <li>
              <List>
                <Icon style={{ fontSize: 22, paddingTop: 3, marginRight: 10 }}>
                  mail_outline
                </Icon>
                info@vintageantique.com
              </List>
            </li>
            <li>
              <ListItem>
                <Icon style={{ fontSize: 22, paddingTop: 3, marginRight: 10 }}>
                  phone
                </Icon>
                + 01 298 742 88
              </ListItem>
            </li>
          </List>
        </Container>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
