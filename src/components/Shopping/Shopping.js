import React, { Component } from "react";
import ProductList from "./ProductList";
import { getCategories } from "../../graphql/queries";


class Shopping extends Component {
  state = {
    loadedAllCategoriesProducts: [],
  };

  componentDidMount() {
    const loadAllCageriesProductHandler = async () => {
      const data = await getCategories();

      const loadedAllCategoriesProducts = [];

      for (const key in data[0].products) {
        loadedAllCategoriesProducts.push({
          id: data[0].products[key].id,
          name: data[0].products[key].name,
          brand: data[0].products[key].brand,
          image: data[0].products[key].gallery[0],
        });
      }

      console.log("response:", data);
      console.log("loadedAllCategoriesProducts", loadedAllCategoriesProducts)
      this.setState({
        loadedAllCategoriesProducts: loadedAllCategoriesProducts,
      });
    };
    loadAllCageriesProductHandler();
  }

  render() {
    console.log("this.state", this.state);
    return (
      <>
        <ProductList items={this.state.loadedAllCategoriesProducts} />
      </>
    );
  }
}

export default Shopping;
