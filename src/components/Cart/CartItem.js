import React, { Component } from "react";
import ProductAttributes from "../Shopping/ProductAttributes";
import classes from "./CartItem.module.css";

class CartItem extends Component {
  render() {
    const { mainCart, cartOverlay } = this.props;
    console.log("cartOverlay", cartOverlay);

    const { symbol } = this.props.currPrice[0].currency;
    const { amount } = this.props.currPrice[0];
    return (
      <>
        <li className={`${classes["cart-item"]} ${cartOverlay ? classes.overlay : ""}`}>
          <div className={classes.summary}>
            <div className={classes.details}>
              <div className={classes.brand}>{this.props.brand}</div>
              <div  className={classes.name}>{this.props.name}</div>
              <span className={classes.price}>{this.props.price}
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
                    cartOverlay={cartOverlay}
                    mainCart = {mainCart}
                  />
                ))}
              </div>
            </div>
            <div className={classes.actions}>
              <div
                className={classes["add-item"]}
                onClick={this.props.onAdd}
              ></div>
              <div className={classes.amount}>{this.props.quantity}</div>
              <div
                className={classes['delete-item']}
                onClick={this.props.onRemove}
              ></div>
            </div>
          </div>
          <div className={classes.image}>
            <div className={classes['overlay-gray']}></div>
            <img src={this.props.picture}></img>
          </div>
        </li>
      </>
    );
  }
}

export default CartItem;
