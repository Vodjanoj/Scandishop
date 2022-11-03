import React, { Component } from "react";
import ProductAttributesItem from "./ProductAttributesItem";

class ProductAttributes extends Component {
  render() {
    return (
      <>
        <div>{this.props.name}</div>
        <div>
          {this.props.attributes.map((item, index) => (
            <ProductAttributesItem
              key={index + item.id}
              displValue={item.displayValue}
              attType={item.id}
              value={item.value}
              isColor={this.props.name === "Color"}
              onClick={this.props.checkItem}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ProductAttributes;
