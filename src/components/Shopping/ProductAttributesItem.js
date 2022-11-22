import React, { Component } from "react";
import classes from "./ProductAttributesItem.module.css";

class ProductAttributesItem extends Component {
  render() {
    const isColor = this.props.isColor;
    const isSelected = this.props.isSelected;

    return (
      <>
        <button
          onClick={this.props.onClick}
          className={`${classes.button} ${isSelected && classes.clicked}`}
          style={{
            backgroundColor: isColor && this.props.value,
          }}
        >
          {!isColor && this.props.displValue}
        </button>
      </>
    );
  }
}

export default ProductAttributesItem;
