import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import Category from "./components/Shopping/Category";
import ProductDetails from "./components/Shopping/ProductDetails";
import { getCategories } from "./graphql/queries";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    allCategory: [],
  };

  componentDidMount() {
    const loadAllCageriesHandler = async () => {
      const data = await getCategories();

      this.setState({
        allCategory: data[0].name,
      });
    };
    loadAllCageriesHandler();
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.allCategory === this.state.allCategory) {
  //     console.log('goood')

  //     this.setState({
  //       allCategory: 'all',
  //     });
  //   }

  // }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact>
              {this.state.allCategory.length > 0 && (
                <Redirect to={`/categories/${this.state.allCategory}`} />
              )}
            </Route>
            <Route path="/categories/:categoryName/" exact>
              <Category />
            </Route>
            <Route path="/categories/:categoryName/:productId">
               <ProductDetails />
            </Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;