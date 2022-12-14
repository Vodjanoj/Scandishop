import React, { Component } from "react";
import Cart from "./Cart";

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
    return (
      <div>
        {/* position realative should be set */}
        <div
          style={{
            position: "relative",
          }}
        >
          <div onClick={this.toggleCartHandler}>Logo</div>
          {this.state.cartIsShown && <Cart />}
        </div>
      </div>
    );
  }
}

export default CartGroup;
