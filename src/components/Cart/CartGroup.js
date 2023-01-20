import React, { Component } from "react";
import cartIcon from "../../assets/cart-icon.png";
import CartOverlay from "./CartOverlay";
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

  closeCartOverlayHandler = () => {
    this.setState({ cartIsShown: false });
  };

  render() {
    console.log("this.state.cartIsShown", this.state.cartIsShown);
    return (
      <div className={classes.icon} onClick={this.toggleCartHandler}>
        <img className={classes["cart-icon"]} src={cartIcon}></img>
        {this.props.totalQuantity > 0 && (
          <span className={classes["products-count"]}>
            {this.props.totalQuantity}
          </span>
        )}
        {this.state.cartIsShown && (
          <CartOverlay
            totalPrice={this.props.totalPrice}
            totalQuantity={this.props.totalQuantity}
            setCurrSymbol={this.props.setCurrSymbol}
            closeCartOverlay={this.closeCartOverlayHandler}
          />
        )}
      </div>
    );
  }
}

export default CartGroup;
