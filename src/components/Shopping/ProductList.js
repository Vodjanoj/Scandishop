import React, { Component } from "react";
import { connect } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";
import { filterPrices } from '../Utils/filterPrices'

class ProductList extends Component {
   
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
              currPrice={filterPrices(
                item.prices,
                this.props.setCurrSymbol
              )}
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
