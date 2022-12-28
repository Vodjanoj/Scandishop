import React, { Component } from "react";
import ProductAttributes from "../Shopping/ProductAttributes";

class CartItem extends Component {
  render() {
    console.log("CartItem this.props", this.props);
    return (
      <>
        <div>{this.props.name}</div>

        <div>
          {this.props.attributes.map((attribute, index) => (
            <ProductAttributes
              id={this.props.id}
              key={index + attribute.id}
              name={attribute.name}
              attributes={attribute}
              selectedAttributes={this.props.selectedAttributes}
              onSelectAttr={this.onSelectAttrHandler}
              type={'miniCart'}
            />
          ))}
        </div>
      </>
    );
  }
}

export default CartItem;
