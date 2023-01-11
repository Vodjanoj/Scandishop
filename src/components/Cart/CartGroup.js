import React, { Component } from "react";
import cartIcon from "../../assets/cart-icon.png";
import Cart from "./Cart";
import classes from "./CartGroup.module.css";

class CartGroup extends Component {
  state = {
    cartIsShown: false,
  };

  toggleCartHandler = () => {
    this.setState((prevState) => {
      return { cartIsShown: !prevState.cartIsShown };
    });
  };

  render() {
    console.log('this.state.cartIsShown', this.state.cartIsShown)
    return (
      <div className={classes.icon} onClick={this.toggleCartHandler}>
        <img className={classes["cart-icon"]} src={cartIcon}></img>
        <span className={classes["products-count"]}>0</span>
        {this.state.cartIsShown && (
          <Cart setCurrSymbol={this.props.setCurrSymbol} />
        )}
      </div>
    );
  }
}

export default CartGroup;
