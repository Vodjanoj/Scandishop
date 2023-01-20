import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./CartOverlay.module.css";
import Backdrop from "./Backdrop";
import CartItem from "./CartItem";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

class CartOverlay extends Component {
  addItemHandler = (orderItem) => {
    this.props.onAddToCart(orderItem);
  };

  removeItemHandler = (id) => {
    this.props.onAddRemoveFromCart(id);
  };

  render() {
    console.log("products", this.props.products);
    return (
      <>
        <div className={classes.cart} onClick={(e) => e.stopPropagation()}>
          <div className={classes.inner}>
            <h2 className={classes.title}>
              <span className={classes.bag}>My Bag</span>
              {this.props.totalQuantity > 0
                ? `, ${this.props.totalQuantity} items`
                : " is empty"}
            </h2>
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
              <span className={classes.price}>
                {this.props.setCurrSymbol}
                {this.props.totalPrice.toFixed(2)}
              </span>
            </div>
            <div className={classes["order-controls"]}>
              <Link to={"/cart"}>
                <Button viewBag clicked={this.props.closeCartOverlay}>
                  View Bag
                </Button>
              </Link>
              <Link to={"/checkout"}>
                <Button checkOut clicked={this.props.closeCartOverlay}>
                  Check Out
                </Button>
              </Link>
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

export default connect(matStateToProps, mapDispatchToProps)(CartOverlay);
