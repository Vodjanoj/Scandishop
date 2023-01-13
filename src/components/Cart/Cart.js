import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Cart.module.css";
import Backdrop from "./Backdrop";
import CartItem from "./CartItem";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";

class Cart extends Component {

  addItemHandler = (orderItem) => {
      this.props.onAddToCart(orderItem);
  }

  removeItemHandler = (id) => {
    this.props.onAddRemoveFromCart(id);
  }

  render() {
    console.log("products", this.props.products);
    return (
      <>
        <div className={classes.cart} onClick={(e) => e.stopPropagation()}>
          <div className={classes.inner}>
            <h2 className={classes.title}>My Bag, {this.props.totalQuantity} items</h2>
            <ul className={classes["cart-items"]}>
              {this.props.products.map((orderItem, index) => (
                <CartItem
                  id={orderItem.id + index}
                  key={orderItem + orderItem.id}
                  attributes={orderItem.attributes}
                  name={orderItem.name}
                  brand={orderItem.brand}
                  quantity={orderItem.quantity}
                  picture={orderItem.gallery[0]}
                  currPrice={filterPrices(
                    orderItem.prices,
                    this.props.setCurrSymbol
                  )}
                  selectedAttributes={orderItem.selectedAttributes}
                  onAdd={this.addItemHandler.bind(null, orderItem)}
                  onRemove={this.removeItemHandler.bind(null, orderItem.id)}
                />
              ))}
            </ul>
            <div className={classes["order-summry"]}>
              <span className={classes.total}>Total</span>
              <span className={classes.price}>{this.props.setCurrSymbol}{(this.props.totalPrice).toFixed(2)}</span>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (item) => dispatch(cartActions.addToCart(item)),
    onAddRemoveFromCart: (id) => dispatch(cartActions.removeFromCart(id)),
  };
};

export default connect(matStateToProps, mapDispatchToProps)(Cart);
