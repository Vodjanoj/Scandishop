import React, { Component } from "react";
import ProductList from "./ProductList";
import { withRouter } from "react-router-dom";

import { getProductsByCategory } from "../../graphql/queries";

class Category extends Component {
  state = {
    productsByCategory: [],
  };

  getData = (categoryName) => {
    const loadProductsByCatHandler = async () => {
      const data = await getProductsByCategory(categoryName);

      const loadedProductsByCat = [];

      for (const key of data) {
        loadedProductsByCat.push({
          id: key.id,
          brand: key.brand,
          name: key.name,
          inStock: key.inStock,
          image: key.gallery[0],
          prices: key.prices,
          gallery: key.gallery,
        });
      }

      this.setState((prevState) => {
        return {
          ...prevState,
          productsByCategory: loadedProductsByCat,
        };
      });
    };
    loadProductsByCatHandler();
  };

  componentDidMount() {
    const categoryName = this.props.match.params.categoryName;

    this.getData(categoryName);
  }

  componentDidUpdate(prevProps) {
    const categoryName = this.props.match.params.categoryName;
    console.log("categoryName", this.props.match.params.categoryName);
    console.log("prevProps.match.params.productId", prevProps);

    if (categoryName !== prevProps.match.params.categoryName) {
      console.log("did update");
      this.getData(categoryName);
    }
  }
  render() {
    // console.log('categoryAllProps:', this.props)
    // console.log('categoryCerrencyfromStore:', this.props.setCurrSymbol)
    return (
      <>
        <ProductList items={this.state.productsByCategory} />
      </>
    );
  }
}

export default withRouter(Category);
