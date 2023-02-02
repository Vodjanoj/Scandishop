import React, { Component } from "react";
import ProductAttributesItem from "./ProductAttributesItem";
import classes from "./ProductAttributes.module.css";

class ProductAttributes extends Component {
  findSelected = (attrItemId, attrId) => {
    const filteredAttrId = this.props.selectedAttributes.filter(
      (selectedAtr) =>
        selectedAtr.selectedAttrItemId === attrItemId &&
        selectedAtr.id === attrId
    );
    console.log('filteredAttrId', filteredAttrId)
    return filteredAttrId;
  };

  render() {
    const { cartOverlay } = this.props;
    console.log('this.props.type', this.props)
    return (
      <>
        <div
          className={`${classes.name} ${cartOverlay ?
            classes.overlay : ''}`}
        >
          {this.props.attrName}:
        </div>
        <div className={`${classes['attribute-items']} ${this.props.cartOverlay ?
            classes[`cart-overlay`] : ''}`}>
          {this.props.attributes.items.map((attrItem, index) => (
            <ProductAttributesItem
              orderItemId={this.props.orderItemId}
              key={index + attrItem.id}
              index={index}
              displValue={attrItem.displayValue}
              attrName={this.props.attrName}
              selected={this.findSelected(attrItem.id, this.props.attrId)}
              isColor={this.props.attrName === "Color"}
              value={attrItem.value}
              changeAtr={() =>
                this.props.onSelectAttr(this.props.attrId, attrItem.id)
              }
              type={this.props.type}
              cartOverlay={this.props.cartOverlay}
              mainCart={this.props.mainCart}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ProductAttributes;
