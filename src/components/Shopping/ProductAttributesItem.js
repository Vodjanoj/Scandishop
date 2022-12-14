import React, { Component } from "react";
import classes from "./ProductAttributesItem.module.css";

class ProductAttributesItem extends Component {
  render() {
    const isColor = this.props.isColor;
    const isSelected = this.props.isSelected;

    return (
      <>
        <label
          className={`${classes[`attribute-item`]} ${!isColor &&
            classes[`not-colored`]}`}
          style={{
            backgroundColor: isColor && this.props.value,
          }}
        >
          <input
            type="radio"
            name={this.props.name}
            value={this.props.value}
            checked={isSelected}
            onChange={this.props.onClick}
          ></input>
          <span className={classes.checkmark}>
            {!isColor && this.props.value}
          </span>
        </label>
      </>
    );
  }
}

export default ProductAttributesItem;
