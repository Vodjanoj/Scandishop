import React, { Component } from "react";
import ProductAttributes from "./ProductAttributes";
import { connect } from "react-redux";
import { filterPrices } from '../Utils/filterPrices';
import { getProductsById } from "../../graphql/queries";
import classes from "./ProductDetails.module.css";
import { withRouter } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import Gallery from "./Gallery";

class ProductDetails extends Component {
  state = {
    productDetails: [],
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

    console.log("idForCart", idForCart);

    this.props.onAddToCart({
      id: this.state.productDetails.id + idForCart,
      gallery: this.state.productDetails.gallery,
      attributes: this.state.productDetails.attributes,
      prices: this.state.productDetails.prices,
      selectedAttributes: this.state.selectedAttributes,
    });
  };

  // onSelecItem = (atrrib) => {
  //   console.log("id", atrrib);
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       isAttrSelected: !this.state.isAttrSelected,
  //       option: atrrib
  //     };
  //   });
  // };

  componentDidMount() {
    const productId = this.props.match.params.productId;
    console.log("productId", productId);
    const loadProductDetailsHandler = async () => {
      const data = await getProductsById(productId);

      const selectedAttributes = data.attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.name,
        selectedAttrItemId: attribute.items[0].id,
      }));

      console.log("myAttributes", data);
      console.log("selectedAttributes", selectedAttributes);

      this.setState((prevState) => {
        return {
          ...prevState,
          productDetails: data,
          selectedImage: data.gallery[0],
          selectedAttributes: selectedAttributes,
        };
      });
    };
    loadProductDetailsHandler();
  }
  render() {
    if (this.state.productDetails) {
      console.log("this.state", this.state);
    }

    let price;

    if (this.state.productDetails.prices && this.props.currSymbol !== "") {
      const amount = filterPrices(
        this.state.productDetails.prices,
        this.props.setCurrSymbol
      );
      price = amount[0].amount;
    }

    return (
      <>
        <div className={classes.details}>
          <Gallery
            onSelectImage={this.selectImageHandler}
            selectedImage={this.state.selectedImage}
            images={this.state.productDetails.gallery}
          />

          <div className={classes.order}>
            <div>{this.state.productDetails.brand}</div>
            <div>{this.state.productDetails.name}</div>

            {this.state.productDetails.attributes && (
              <div className={classes.attributes}>
                {this.state.productDetails.attributes.map(
                  (attribute, index) => {
                    let selectedAttribute = this.state.selectedAttributes.find(
                      (selectAtr) => attribute.id === selectAtr.id
                    );
                    return (
                      <ProductAttributes
                        key={index + attribute.id}
                        name={attribute.name}
                        attributes={attribute}
                        selected={
                          selectedAttribute
                            ? selectedAttribute.selectedAttrItemId
                            : ""
                        }
                        onSelectAttr={this.onSelectAttrHandler}
                      />
                    );
                  }
                )}
              </div>
            )}
            <div>
              {this.props.setCurrSymbol}
              {price}
            </div>
            <div
              className={classes.description}
              dangerouslySetInnerHTML={this.createMarkup()}
            />
            <button
              onClick={this.addToCartHandler}
              className={classes.button}
            ></button>
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
