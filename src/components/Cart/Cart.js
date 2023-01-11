import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Cart.module.css";
import Backdrop from "./Backdrop";
import CartItem from "./CartItem";
import { filterPrices } from "../Utils/filterPrices";

class Cart extends Component {
  render() {
    console.log("products", this.props.products);
    return (
      <>
        <div className={classes.cart} onClick={(e) => e.stopPropagation()}>
          <div className={classes.inner}>
            <h2 className={classes.title}>My Bag, 3 items</h2>
            <ul className={classes["cart-items"]}>
              {this.props.products.map((orderItem, index) => (
                <CartItem
                  id={orderItem.id + index}
                  key={orderItem + orderItem.id}
                  attributes={orderItem.attributes}
                  name={orderItem.name}
                  brand={orderItem.brand}
                  picture={orderItem.gallery[0]}
                  currPrice={filterPrices(
                    orderItem.prices,
                    this.props.setCurrSymbol
                  )}
                  selectedAttributes={orderItem.selectedAttributes}
                />
              ))}
            </ul>
            <div className={classes["order-summry"]}>
              <span className={classes.total}>Total</span>
              <span className={classes.price}>{this.props.setCurrSymbol}100</span>
            </div>
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
