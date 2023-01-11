import React, { Component } from "react";
import { connect } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";
import { getProductsAttributesById } from "../../graphql/queries";

class ProductList extends Component {
  addToCartHandler = (event, prodItem) => {
    event.preventDefault();

    const loadProductDetailsHandler = async () => {
      const attributes = await getProductsAttributesById(prodItem.id);

      const selectedAttributes = attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.name,
        selectedAttrItemId: attribute.items[0].id,
      }));

      const idForCart = selectedAttributes.reduce(
        (collectAttr, currentAtrItem) =>
          collectAttr + "_" + currentAtrItem.selectedAttrItemId,
        ""
      );

      this.props.onAddToCart({
        id: prodItem.id + idForCart,
        brand: prodItem.brand,
        name: prodItem.name,
        gallery: prodItem.gallery,
        attributes: attributes,
        prices: prodItem.prices,
        selectedAttributes: selectedAttributes,
      });
    };
    loadProductDetailsHandler();
  };

  render() {
    return (
      <>
        <div className={classes.products}>
          {this.props.items.map((item, index) => (
            <ProductItem
              id={item.id}
              addToCart={(event) => this.addToCartHandler(event, item)}
              key={index}
              brand={item.brand}
              name={item.name}
              inStock={item.inStock}
              prices={item.prices}
              currPrice={filterPrices(item.prices, this.props.setCurrSymbol)}
              image={item.image}
            />
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
