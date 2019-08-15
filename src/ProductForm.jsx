import React, { Component } from "react";
import styled from "styled-components";
import Select from "react-select";
import { withRouter } from "react-router-dom";

const options = [
  { value: "furniture", label: "Furniture" },
  { value: "paintings", label: "Paintings" },
  { value: "jewellery", label: "Jewellery" }
];

const CardProduct = styled.div`
  max-width: 600px;
  padding: 10px 20px;
  background: #f4f7f8;
  margin: 20px auto;
  padding: 20px;
  background: #f4f7f8;
  border-radius: 8px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  box-shadow: 0 -6px 0 #fff, 0 1px 6px rgba(0, 0, 0, 0.35);
`;

const FormInput = styled.input`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin: 0;
  outline: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
  :focus {
    background: #dceefb;
  }
`;
const TextArea = styled.textarea`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin: 0;
  outline: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
  &:focus {
    background: #dceefb;
  }
`;

const Center = styled.div`
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 14px 20px;
  border-radius: 5px;
  border: 2px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  background: #3f51b5;
  outline: none;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  &:hover {
    background: #35449a;
  }
`;

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px 0;
  border-radius: 6px;
  position: relative;
`;

const FileLabel = styled.label`
  overflow: hidden;
  color: #8a97a0;
  border-radius: 0.5em;
  padding: 10px;
  &:hover {
    background-color: #dceefb;
  }
`;

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      image: null,
      title: "",
      description: "",
      price: "",
      selectedOption: null
    };
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };
  handleImageChange = event => {
    this.setState({ image: event.target.files[0] });
  };
  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  };
  handleCategoryChange = selectedOption => {
    this.setState({ selectedOption });
    console.log("Option selected:", selectedOption);
  };
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("form submitted");
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("img", this.state.image);
    data.append("price", this.state.price);
    data.append("category", this.state.selectedOption.value);
    data.append("description", this.state.description);
    await fetch("/newitem", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    this.props.history.push(`/catalogue/${this.state.selectedOption.value}`);
  };
  render() {
    return (
      <CardProduct>
        <form onSubmit={this.handleSubmit}>
          <Wrapper>
            <label style={{ display: "block", marginBottom: 8 }}>
              Product Name
            </label>
            <FormInput
              onChange={this.handleTitleChange}
              value={this.state.title}
              type="text"
              placeholder="Type product name"
            />
            <label style={{ display: "block", marginBottom: 14 }}>
              Product Image
            </label>
            <FileLabel>
              {" "}
              Upload file: {this.state.image && this.state.image.name}
              <input
                onChange={this.handleImageChange}
                type="file"
                ref={this.fileInput}
                style={{
                  cursor: "pointer",
                  width: 0.1,
                  opacity: 0
                }}
              />
            </FileLabel>
            <label style={{ display: "block", marginBottom: 8, marginTop: 20 }}>
              Product Price
            </label>
            <FormInput
              onChange={this.handlePriceChange}
              type="text"
              value={this.state.price}
              placeholder="Type product price"
            />
            <label style={{ display: "block", marginBottom: 8 }}>
              Choose the Category
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleCategoryChange}
              options={options}
              style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
            />
            <label style={{ display: "block", marginBottom: 8, marginTop: 30 }}>
              Product Description
            </label>
            <textarea
              onChange={this.handleDescriptionChange}
              type="textarea"
              value={this.state.decsription}
              placeholder="Type product description"
              cols={80}
              rows={6}
              style={{
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontSize: 16,
                padding: 10,
                margin: 0,
                outline: 0,
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: 4,
                backgroundColor: "#fff",
                color: "#8a97a0",
                boxShadow: "0 1px 0 rgba(0, 0, 0, 0.03) inset",
                marginBottom: 30,
                transition: "all 0.30s ease-in-out"
              }}
            />
            <Center>
              <SubmitButton>Submit</SubmitButton>
            </Center>
          </Wrapper>
        </form>
      </CardProduct>
    );
  }
}

export default withRouter(ProductForm);
