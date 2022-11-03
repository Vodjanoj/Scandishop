import React, { Component } from "react";
import classes from "./ProductItem.module.css";
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
              <div className={classes.image}>
                <img src={this.props.image}></img>
              </div>
              <div className={classes.name}>
                {this.props.brand} {this.props.name}
              </div>
              <div className={classes.price}>
                {symbol}{amount}
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

export default withRouter(ProductItem);
