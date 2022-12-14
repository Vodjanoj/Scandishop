import React, { Component } from "react";
import ProductAttributesItem from "./ProductAttributesItem";

class ProductAttributes extends Component {
  state = {
    selectedOption: [],
  };
  selectItemHandler = (atrrib) => {
    let isName = this.props.attributes.find((item) => item.id === atrrib.id);
    console.log("isName", isName.id);
    if (this.props.name === atrrib.attrName && isName.id === atrrib.id) {
      this.setState((prevState) => {
        return {
          ...prevState,
          selectedOption: atrrib.id,
        };
      });
    }

    this.props.setOption(atrrib);
    console.log("isSeleceted", atrrib.id, atrrib.productId);
  };

  render() {
    console.log("ProductAttributes props", this.props.selected);
    console.log("props.attributes.items", this.props.attributes.items);
    return (
      <>
        <div>{this.props.name} </div>
        <div
          style={{
            display: "flex",
            height: "100px",
            alignItems: "center",
          }}
        >
          {this.props.attributes.items.map((attItem, index) => (
            <ProductAttributesItem
              key={index + attItem.id}
              displValue={attItem.displayValue}
              name={this.props.name}
              isColor={this.props.name === "Color"}
              isSelected={this.props.selected === attItem.id}
              value={attItem.value}
              onClick={() =>
                this.props.onSelectAttr(this.props.name, attItem.id)
              }
            />
          ))}
        </div>
      </>
    );
  }
}

export default ProductAttributes;
