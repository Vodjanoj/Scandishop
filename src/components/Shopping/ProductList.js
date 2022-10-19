import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

class ProductList extends Component {
  render() {
    console.log('ProductList', this.props.items);
    return (
      <>
        <div className={classes.products}>
          {this.props.items.map((item, index) => (
            <ProductItem
              id={item.id}
              key={index}
              brand={item.brand}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ProductList;
