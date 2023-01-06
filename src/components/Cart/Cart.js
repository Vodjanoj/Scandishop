import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Cart.module.css";
import Backdrop from "./Backdrop";
import CartItem from "./CartItem";
import { filterPrices } from "../Utils/filterPrices";

class Cart extends Component {
  render() {
    console.log("this.props.products Cart", this.props.products);

    return (
      <>
        <div className={classes.cart} onClick={(e) => e.stopPropagation()}>
          <div className={classes.inner}>
            <h2>My Bag, 3 items</h2>
            <ul className={classes["cart-items"]}>
              {this.props.products.map((orderItem, index) => (
                <CartItem
                  id={orderItem.id + index}
                  key={orderItem + orderItem.id}
                  attributes={orderItem.attributes}
                  name={orderItem.name}
                  brand={orderItem.brand}
                  currPrice={filterPrices(
                    orderItem.prices,
                    this.props.setCurrSymbol
                  )}
                  selectedAttributes={orderItem.selectedAttributes}
                />
              ))}
            </ul>
          </div>
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
