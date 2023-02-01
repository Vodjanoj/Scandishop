import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Cart.module.css";
import Backdrop from "./Backdrop";
import CartItem from "./CartItem";
import { filterPrices } from "../Utils/filterPrices";
import { cartActions } from "../../store/cart-slice";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

class Cart extends Component {
  componentDidMount() {
    if (!this.props.cartOverlay) {
      window.scrollTo(0, 0);
    }
  }

  calcTotalPrice = (currSymb, products) => {
    return products.reduce((sum, { prices, quantity }) => {
      const price = filterPrices(prices, currSymb);

      if (price.length > 0) {
        return sum + price[0].amount * quantity;
      }
      return sum;
    }, 0);
  };

  addItemHandler = (orderItem) => {
    this.props.onAddToCart(orderItem);
  };

  removeItemHandler = (id) => {
    this.props.onAddRemoveFromCart(id);
  };

  render() {
    const { cartOverlay } = this.props;

    const totalPrice = this.calcTotalPrice(
      this.props.setCurrSymbol,
      this.props.products
    );
    let tax = (totalPrice * 0.21).toFixed(2);

    console.log("setCurrSymbol", this.props.setCurrSymbol);
    return (
      <>
        <div
          className={`${classes.cart} ${cartOverlay ? classes.overlay : ""}`}
          onClick={cartOverlay && ((e) => e.stopPropagation())}
        >
          <div className={classes.inner}>
            {!cartOverlay && <h2 className={classes.title}>Cart</h2>}
            {!cartOverlay && this.props.totalQuantity < 1 && (
              <div className={classes["empty-info"]}>
                <span className={classes.bag}>Cart is empty</span>
                <p>Looks like you have not made a choice yet.</p>
              </div>
            )}

            {cartOverlay && (
              <h2 className={classes.title}>
                <span className={classes.bag}>My Bag</span>
                {this.props.totalQuantity > 0
                  ? `, ${this.props.totalQuantity} items`
                  : " is empty"}
              </h2>
            )}
            {this.props.products.length > 0 && (
              <ul className={classes.items}>
                {this.props.products.map((orderItem, index) => (
                  <CartItem
                    id={orderItem.id + index}
                    key={orderItem + orderItem.id}
                    attributes={orderItem.attributes}
                    name={orderItem.name}
                    brand={orderItem.brand}
                    quantity={orderItem.quantity}
                    images={orderItem.gallery}
                    mainPicture={orderItem.gallery[0]}
                    mainCart={!cartOverlay}
                    cartOverlay={cartOverlay}
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
            )}
            {!cartOverlay && (
              <div className={classes["order-summary"]}>
                <div className={classes["order-tax"]}>
                  <div className={classes["summary-title"]}>Tax 21%:</div>
                  <div className={classes["summary-count"]}>
                    {this.props.setCurrSymbol}
                    {tax}
                  </div>
                </div>
                <div className={classes["order-quantity"]}>
                  <div className={classes["summary-title"]}>Quantity:</div>
                  <div className={classes["summary-count"]}>
                    {this.props.totalQuantity}
                  </div>
                </div>

                <div className={classes["order-price"]}>
                  <div className={classes.total}>Total</div>
                  <div className={classes.price}>
                    {this.props.setCurrSymbol}
                    {totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
            {cartOverlay && (
              <div className={classes["order-summary-overlay"]}>
                <div className={classes.total}>Total:</div>
                <div className={classes.price}>
                  {this.props.setCurrSymbol}
                  {totalPrice.toFixed(2)}
                </div>
              </div>
            )}

            <div className={classes["order-controls"]}>
              {cartOverlay && (
                <Link to={"/cart"}>
                  <Button viewBag clicked={this.props.closeCartOverlay}>
                    View Bag
                  </Button>
                </Link>
              )}
              {cartOverlay && (
                <Link to={"/checkout"}>
                  <Button checkOut clicked={this.props.closeCartOverlay}>
                    Check Out
                  </Button>
                </Link>
              )}
              {!cartOverlay && (
                <Link to={"/order"}>
                  <Button order clicked={this.props.closeCartOverlay}>
                    Order
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {cartOverlay && <Backdrop />}
      </>
    );
  }
}

const matStateToProps = (state) => {
  return {
    products: state.cart.items,
    totalQuantity: state.cart.totalQuantity,
    setCurrSymbol: state.currency.setCurrSymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (item) => dispatch(cartActions.addToCart(item)),
    onAddRemoveFromCart: (id) => dispatch(cartActions.removeFromCart(id)),
  };
};

export default connect(matStateToProps, mapDispatchToProps)(Cart);
