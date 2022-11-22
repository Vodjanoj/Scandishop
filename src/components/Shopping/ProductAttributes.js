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
        <div>
          {this.props.attributes.items.map((attItem, index) => (
            <ProductAttributesItem
              key={index + attItem.id}
              displValue={attItem.displayValue}
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

{
  /* {this.props.attributes.map((item, index) => (
            <ProductAttributesItem
              key={index + item.id}
              displValue={item.displayValue}
              value={item.value}
              onClicked={this.props.onClickk.bind(null, {
                id: item.id,
                attrName: this.props.name,
              })}
              isColor={this.props.name === "Color"}
              // isSelected={item.id === this.state.selectedOption}
              isSelected={item.id === this.props.selected.option && this.props.selected.name === this.props.name}
              onClick={this.selectItemHandler.bind(this, {
                id: item.id,
                productId: this.props.id,
                attrName: this.props.name,
              })}
            />
          ))} */
}
