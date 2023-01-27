import React, { Component } from "react";
import cartIcon from "../../assets/cart-icon.png";
import Cart from "./Cart";
import classes from "./CartGroup.module.css";

class CartGroup extends Component {
  state = {
    cartOverlayIsShown: false,
  };

  toggleCartHandler = () => {
    this.setState((prevState) => {
      return { cartOverlayIsShown: !prevState.cartOverlayIsShown };
    });
  };

  closeCartOverlayHandler = () => {
    this.setState({ cartOverlayIsShown: false });
  };

  render() {
    console.log("this.state.cartIsShown", this.state.cartOverlayIsShown);
    return (
      <div className={classes.icon} onClick={this.toggleCartHandler}>
        <img className={classes["cart-icon"]} src={cartIcon}></img>
        {this.props.totalQuantity > 0 && (
          <span className={classes["products-count"]}>
            {this.props.totalQuantity}
          </span>
        )}
        {this.state.cartOverlayIsShown && (
          <Cart
            cartOverlay
            closeCartOverlay={this.closeCartOverlayHandler}
          />
        )}
      </div>
    );
  }
}

export default CartGroup;
