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
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 2px 4px 0px #ddd;
  margin: 20px;
  border-radius: var(--border-radius);
  text-align: center;
`;

// const Card = styled.div`
//   overflow: hidden;
//   background: #fff;
//   box-shadow: 0px 2px 4px 0px #ddd;
//   margin: 20px;
//   border-radius: var(--border-radius);
//   text-align: center;
// `;

const CardTitle = styled.h1`
  margin: 0;
  padding: 20px;
  background: #3f51b5;
  color: #fff;
  font-size: 1.6rem;
`;

const CardBody = styled.div`
  display: grid;
  margin: 20px;
`;

const Form = styled.form`
  width: 90%;
  min-width: 300px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;

const FormInput = styled.input`
  width: 95%;
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;
const TextArea = styled.textarea`
  width: 95%;
  height: 100px;
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;

const Center = styled.div`
  text-align: center;
`;

// const buttonStyles = css`
//   padding: 10px 20px;
//   border-radius: var(--border-radius);
//   cursor: pointer;
//   border: none;
//   color: #fff;
//   font-size: 1rem;
//   background: var(--primary-color);
//   outline: none;
//   text-decoration: none;
// `;

// const Button = styled.button`
//   ${buttonStyles}
// `;
// export const FormButton = styled.button`
//   margin: 10px 0;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   cursor: pointer;
//   width: ${(props) => (props.wide ? '100%' : 'auto')};
// `;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  background: #3f51b5;
  outline: none;
  text-decoration: none;
`;

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px 0;
  border-radius: 6px;
  position: relative;
`;

class ProductForm extends Component {
  constructor(props) {
    super(props);
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
  // handleLocationChange = event => {
  //   this.setState({ location: event.target.value });
  // };
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
    // data.append("location", this.state.location);
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
        <CardTitle>Fill this form to sell your item</CardTitle>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Wrapper>
              <div>
                <label>
                  Product Name
                  <FormInput
                    onChange={this.handleTitleChange}
                    value={this.state.title}
                    type="text"
                    placeholder="Type your product name"
                  />
                </label>
              </div>
              <div>
                <label>
                  <div>
                    Product Image
                    {/* <button>Upload a file</button> */}
                    <input onChange={this.handleImageChange} type="file" />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Price
                  <FormInput
                    onChange={this.handlePriceChange}
                    type="text"
                    value={this.state.price}
                  />
                </label>
              </div>
              {/* <label>
                Seller Location
                <FormInput
                  onChange={this.handleLocationChange}
                  type="text"
                  value={this.state.location}
                />
              </label> */}
              <label>
                Choose the Category
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleCategoryChange}
                  options={options}
                />
              </label>
              <label>
                Product Description
                <textarea
                  onChange={this.handleDescriptionChange}
                  type="textarea"
                  value={this.state.decsription}
                  placeholder="Type the description of your item"
                  cols={80}
                  rows={10}
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: "14px",
                    padding: "10px",
                    margin: "10px 0",
                    display: "block"
                  }}
                />
              </label>
              <div>
                <Center>
                  <SubmitButton>Add Item</SubmitButton>
                </Center>
              </div>
            </Wrapper>
          </Form>
        </CardBody>
      </CardProduct>
    );
  }
}

export default withRouter(ProductForm);
