import React, { Component } from "react";
import classes from "./Cart.module.css";
import Backdrop from "./Backdrop";

class Cart extends Component {
  render() {
    return (
      <>
         
        <div className={classes.cart}>
          <div>Put some items</div>
        </div>
        <Backdrop />
      </>
    );
  }
}

export default Cart;
