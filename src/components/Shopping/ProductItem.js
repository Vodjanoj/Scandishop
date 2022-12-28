import React, { Component } from "react";
import classes from "./ProductItem.module.css";
import circleCartIcon from "../../assets/circle-icon.png";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class ProductItem extends Component {

  
  render() {
    const categoryName = this.props.match.params.categoryName;
    const { symbol } = this.props.currPrice[0].currency;
    const { amount } = this.props.currPrice[0];

    return (
      <>
        <div className={classes.product}>
          <Link to={`/categories/${categoryName}/${this.props.id}`}>
            <div className={classes.inner}>
              {!this.props.inStock && (
                <div className={classes[`out-of-stock`]}>
                  <div className={classes["out-of-stock-caption"]}>
                    Out of Stock
                  </div>
                </div>
              )}
              <div className={classes.image}>
                <div className={classes.overlay}></div>
                <img src={this.props.image}></img>
              </div>
              <div className={classes.name}>
                {this.props.brand} {this.props.name}
              </div>
              {this.props.inStock && (
                <div className={classes[`circle-cart-icon`]} onClick={this.props.addToCart}>
                  <img src={circleCartIcon} alt="A quick add to cart!"></img>
                </div>
              )}
              <div className={classes.price}>
                {symbol}
                {amount}
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

export default withRouter(ProductItem);
