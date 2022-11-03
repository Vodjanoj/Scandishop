import React, { Component } from "react";
import classes from "./ProductAttributesItem.module.css";

class ProductAttributesItem extends Component {
  render() {
    const isColor = this.props.isColor;
  
    console.log("ProductAttributesItem props", this.props);
    return (
      <>
        <button
          onClick={this.props.onClick}
          className={classes.button}
          style={{ backgroundColor: isColor && this.props.value }}
        >
          {!isColor && this.props.displValue}
        </button>
      </>
    );
  }
}

export default ProductAttributesItem;
