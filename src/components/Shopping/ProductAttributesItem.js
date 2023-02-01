import React, { Component } from "react";
import classes from "./ProductAttributesItem.module.css";

class ProductAttributesItem extends Component {
  render() {
    const isColor = this.props.isColor;

    return (
      <>
        <label
          className={`${classes[`attribute-item`]} ${!isColor &&
            classes[`not-colored`]} ${this.props.cartOverlay &&
            classes[`cart-overlay`]} ${this.props.mainCart &&
            classes[`main-cart`]}`}
          style={{
            backgroundColor: isColor && this.props.displValue,
            width: !isColor && !this.props.cartOverlay && "63px",
            height: !isColor && !this.props.cartOverlay && "45px",
          }}
        >
          <input
            type="radio"
            name={`${
              this.props.cartOverlay
                ? this.props.id + "_" + this.props.name
                : this.props.name
            } ${
              this.props.mainCart
                ? this.props.id + "_" + this.props.name + "_" + "main_cart"
                : ""
            }`}
            value={this.props.value}
            checked={
              this.props.selected.length > 0 &&
              this.props.selected[0].selectedAttrItemId ===
                this.props.displValue
            }
            disabled={this.props.cartOverlay || this.props.mainCart}
            onChange={this.props.changeAtr}
          ></input>
          <span
            className={classes.checkmark}
            style={{
              width: !isColor && !this.props.cartOverlay && "63px",
              height: !isColor && !this.props.cartOverlay && "45px",
            }}
          >
            {!isColor && this.props.value}
          </span>
        </label>
      </>
    );
  }
}

export default ProductAttributesItem;
