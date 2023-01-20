import React, { Component } from "react";
import ProductAttributes from "../Shopping/ProductAttributes";
import classes from "./CartItem.module.css";

class CartItem extends Component {
  render() {
    const { symbol } = this.props.currPrice[0].currency;
    const { amount } = this.props.currPrice[0];
    return (
      <>
        <li className={classes["cart-item"]}>
          <div className={classes['item-summary']}>
            <div className={classes["order-details"]}>
              <div className={classes.brand}>{this.props.brand}</div>
              <div className={classes.name}>{this.props.name}</div>
              <span className={classes.price}>
                {symbol}
                {amount} 
              </span>

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
            <div className={classes['order-actions']}>
              <div className={classes['add-item']} onClick={this.props.onAdd}></div>
              <div className={classes.amount}>{this.props.quantity}</div>
              <div className={classes['delete-item']} onClick={this.props.onRemove}></div>
            </div>

          </div>
          <div className={classes['item-image']}>
            <div className={classes.overlay}></div>
            <img className={classes.image} src={this.props.picture}></img>
          </div>
        </li>
      </>
    );
  }
}

export default CartItem;
