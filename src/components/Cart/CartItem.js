import React, { Component } from "react";
import ProductAttributes from "../Shopping/ProductAttributes";
import classes from "./CartItem.module.css";

class CartItem extends Component {
  render() {
    console.log("CartItem this.props", this.props);
    return (
      <>
        <li className={classes["cart-item"]}>
          <div className={classes.summary}>
            <div>{this.props.brand}</div>
            <div>{this.props.name}</div>
            <div>{this.props.currPrice[0].amount}</div>
            <div>{this.props.currPrice[0].currency.symbol}</div>
            <div>
              {this.props.attributes.map((attribute, index) => (
                <ProductAttributes
                  id={this.props.id}
                  key={index + attribute.id}
                  name={attribute.name}
                  attributes={attribute}
                  selectedAttributes={this.props.selectedAttributes}
                  onSelectAttr={this.onSelectAttrHandler}
                  type={"miniCart"}
                />
              ))}
            </div>
          </div>
          <div className={classes.image}>
            <img src="https://via.placeholder.com/120x190"></img>
          </div>
        </li>
      </>
    );
  }
}

export default CartItem;
