import React, { Component } from "react";
import ProductAttributes from "./ProductAttributes";
import { connect } from "react-redux";
import { filterPrices } from "../Utils/filterPrices";
import { getProductsById } from "../../graphql/queries";
import { getProductsAttributesById } from "../../graphql/queries";
import classes from "./ProductDetails.module.css";
import { withRouter } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import Gallery from "./Gallery";
import Button from "../UI/Button";

class ProductDetails extends Component {
  state = {
    productDetails: {},
    selectedImage: null,
    selectedAttributes: [],
  };

  createMarkup = () => {
    return { __html: this.state.productDetails.description };
  };

  onSelectAttrHandler = (attId, attItemId) => {
    const updatedSelcAttr = this.state.selectedAttributes.map((attribute) =>
      attribute.id === attId
        ? { ...attribute, selectedAttrItemId: attItemId }
        : attribute
    );

    this.setState((prevState) => {
      return {
        ...prevState,
        selectedAttributes: updatedSelcAttr,
      };
    });
  };

  selectImageHandler = (image) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedImage: image,
      };
    });
  };

  addToCartHandler = () => {
    const idForCart = this.state.selectedAttributes.reduce(
      (collectAttr, currentAtrItem) =>
        collectAttr + "_" + currentAtrItem.selectedAttrItemId,
      ""
    );

    this.props.onAddToCart({
      id: this.state.productDetails.id + idForCart,
      brand: this.state.productDetails.brand,
      name: this.state.productDetails.name,
      gallery: this.state.productDetails.gallery,
      attributes: this.state.productDetails.attributes,
      prices: this.state.productDetails.prices,
      selectedAttributes: this.state.selectedAttributes,
    });
  };

  componentDidMount() {
    const productId = this.props.match.params.productId;

    const loadProductDetailsHandler = async () => {
      const product = await getProductsById(productId);

      // A seperate query with fetchPolicy: "network-only" for getting attributes
      // of a product from a server, not from cache, by not getting the whole data of a product
      // from a server with each rendering of a component we save the network traffic.
      // If we get attributes from cache they are being mixed with attribites of other products,
      // so we have an issue with correct displaying of  attributes associated to a specific product
      const attributes = await getProductsAttributesById(productId);

      const selectedAttributes = attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.name,
        selectedAttrItemId: attribute.items[0].id,
      }));

      this.setState((prevState) => {
        return {
          ...prevState,
          productDetails: { ...product, attributes },
          selectedImage: product.gallery[0],
          selectedAttributes: selectedAttributes,
        };
      });
    };
    loadProductDetailsHandler();
  }

  render() {
    let price;

    if (this.state.productDetails.prices && this.props.currSymbol !== "") {
      const amount = filterPrices(
        this.state.productDetails.prices,
        this.props.setCurrSymbol
      );
      price = amount[0].amount;
    }

    console.log("this.state.productDetails.inStock", this.state.productDetails);

    return (
      <>
        <div className={classes.card}>
          <Gallery
            onSelectImage={this.selectImageHandler}
            selectedImage={this.state.selectedImage}
            images={this.state.productDetails.gallery}
          />

          <div className={classes.details}>
            <h1 className={classes.brand}>{this.state.productDetails.brand}</h1>
            <h2 className={classes.name}>{this.state.productDetails.name}</h2>

            {this.state.productDetails.attributes && (
              <div className={classes.attributes}>
                {this.state.productDetails.attributes.map(
                  (attribute, index) => (
                    <ProductAttributes
                      key={index + attribute.id}
                      name={attribute.name}
                      attributes={attribute}
                      selectedAttributes={this.state.selectedAttributes}
                      onSelectAttr={this.onSelectAttrHandler}
                    />
                  )
                )}
              </div>
            )}
            <div className={classes.price}>Price:</div>
            <div className={classes["current-price"]}>
              {this.props.setCurrSymbol}
              {price}
            </div>
            <Button disabled={!this.state.productDetails.inStock} clicked={this.addToCartHandler}>{this.state.productDetails.inStock ? 'Add to Cart' : 'Out of Stock'}</Button>
            <div
              className={classes.description}
              dangerouslySetInnerHTML={this.createMarkup()}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setCurrSymbol: state.currency.setCurrSymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (item) => dispatch(cartActions.addToCart(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetails));
