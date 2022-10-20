import React, { Component } from "react";
import { connect } from "react-redux";
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

      for (const key in data) {
        loadedProductsByCat.push({
          id: data[key].id,
          brand: data[key].brand,
          name: data[key].name,
          image: data[key].gallery[0],
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
    console.log("did mount");
    this.getData(categoryName);
  }

  componentDidUpdate(prevProps) {
    const categoryName = this.props.match.params.categoryName;

    if (categoryName !== prevProps.match.params.categoryName) {
      console.log("did update");
      this.getData(categoryName);
    }
  }
  render() {
    console.log('category:', this.props.crntCurrency.symbol)
    return (
      <>
        <ProductList symbol={this.props.crntCurrency.symbol} items={this.state.productsByCategory} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    crntCurrency: state.currency.setCurrency,
  };
};

export default connect(mapStateToProps, null)(withRouter(Category));
