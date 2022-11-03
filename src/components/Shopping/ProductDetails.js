import React, { Component } from "react";
import ProductAttributes from "./ProductAttributes";
import { getProductsById } from "../../graphql/queries";
import classes from "./ProductDetails.module.css";
import { withRouter } from "react-router-dom";

class ProductDetails extends Component {
  state = {
    productDetails: [],
  };

  createMarkup = () => {
    return { __html: this.state.productDetails.description };
  };

  checkProduct = (id) => {
    console.log("id", id);
  };

  componentDidMount() {
    console.log("mounted");
    const productId = this.props.match.params.productId;
    console.log("productId", productId);
    const loadProductDetailsHandler = async () => {
      const data = await getProductsById(productId);

      this.setState((prevState) => {
        return {
          ...prevState,
          productDetails: data,
        };
      });
    };
    loadProductDetailsHandler();
  }
  render() {
    if (this.state.productDetails) {
      console.log("productDetails", this.state.productDetails.description);
    }
    if (this.state.productDetails.attributes) {
      console.log("productAttr", this.state.productDetails);
    }
    return (
      <>
        <div>
          {this.state.productDetails.attributes && (
            <img
              src={this.state.productDetails.gallery[0]}
              style={{ height: "400px" }}
            ></img>
          )}
        </div>

        {this.state.productDetails.attributes && (
          <div className={classes.description} dangerouslySetInnerHTML={this.createMarkup()} />
        )}

        {this.state.productDetails.attributes && (
          <div>
            {this.state.productDetails.attributes.map((item, index) => (
              <ProductAttributes
                key={index + item.id}
                name={item.name}
                attributes={item.items}
                checkItem={this.checkProduct.bind(this, item.name)}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(ProductDetails);
