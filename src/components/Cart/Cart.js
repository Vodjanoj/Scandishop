import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Cart.module.css";
import Backdrop from "./Backdrop";
import CartItem from "./CartItem";

class Cart extends Component {
  render() {
    console.log("this.props.products", this.props.products);

    return (
      <>
        <div className={classes.cart}>
          {this.props.products.map((attItem, index) => (
            <CartItem
              id={attItem.id}
              key={index + attItem.id}
              attributes={attItem.attributes}
              name={attItem.name}
              brand={attItem.brand}
              selectedAttributes={attItem.selectedAttributes}
            />
          ))}
        </div>
        <Backdrop />
      </>
    );
  }
}

const matStateToProps = (state) => {
  return {
    products: state.cart.items,
  };
};

export default connect(matStateToProps, null)(Cart);
