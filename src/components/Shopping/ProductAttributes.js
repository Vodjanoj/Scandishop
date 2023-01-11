import React, { Component } from "react";
import ProductAttributesItem from "./ProductAttributesItem";
import classes from "./ProductAttributes.module.css";

class ProductAttributes extends Component {
  findSelected = (attrId, attrName) => {
    const filteredAttrId = this.props.selectedAttributes.filter(
      (selectedAtr) =>
        selectedAtr.selectedAttrItemId === attrId &&
        selectedAtr.name === attrName
    );
    return filteredAttrId;
  };

  render() {
    console.log('this.props.type', this.props.type)
    return (
      <>
        <div
          className={`${classes.name} ${this.props.type === "miniCart" ?
            classes[`cart-overlay`] : ''}`}
        >
          {this.props.name}:
        </div>
        <div className={`${classes['attribute-items']} ${this.props.type === "miniCart" ?
            classes[`cart-overlay`] : ''}`}>
          {this.props.attributes.items.map((attItem, index) => (
            <ProductAttributesItem
              id={this.props.id}
              key={index + attItem.id}
              index={index}
              displValue={attItem.displayValue}
              name={this.props.name}
              selected={this.findSelected(attItem.id, this.props.name)}
              isColor={this.props.name === "Color"}
              value={attItem.value}
              changeAtr={() =>
                this.props.onSelectAttr(this.props.name, attItem.id)
              }
              type={this.props.type}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ProductAttributes;
