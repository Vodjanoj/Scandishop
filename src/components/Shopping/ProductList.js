import React, { Component } from "react";
import { connect } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

class ProductList extends Component {
  filterPrices(prices, currSymbol) {
    const filteredPrice = prices.filter(
      (price) => price.currency.symbol === currSymbol
    );

    return filteredPrice;
  }

  render() {

    return (
      <>
        <div className={classes.products}>
          {this.props.items.map((item, index) => (
            <ProductItem
              id={item.id}
              key={index}
              brand={item.brand}
              name={item.name}
              prices={item.prices}
              currPrice={this.filterPrices(item.prices, this.props.setCurrSymbol)}
              image={item.image}
            />
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setCurrSymbol: state.currency.setCurrSymbol,
  };
};

export default connect(mapStateToProps, null)(ProductList);
