import React, { Component } from "react";
import ProductList from "./ProductList";
import { withRouter } from "react-router-dom";
import classes from './Category.module.css'
import { getProductsByCategory } from "../../graphql/queries";

class Category extends Component {
  state = {
    productsByCategory: [],
    categoryName: this.props.match.params.categoryName,
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

    if (categoryName !== prevProps.match.params.categoryName) {
      this.getData(categoryName);
      this.setState((prevState) => {
        return {
          ...prevState,
          categoryName: categoryName,
        };
      });
    }
  }
  render() {
    return (
      <>
        <h2 className={classes.name}>{this.state.categoryName}</h2>
        <ProductList items={this.state.productsByCategory} />
      </>
    );
  }
}

export default withRouter(Category);
