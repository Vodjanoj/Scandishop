import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./MainNavigation.module.css";
import { getCategories } from "../../graphql/queries";
import mainLogo from "../../assets/a-logo.png";
import Dropdown from "./Dropdown";
import CartGroup from "../Cart/CartGroup";
import { filterPrices } from "../Utils/filterPrices";

class MainNavigation extends Component {
  state = {
    allCategories: [],
  };

  // calcTotalPrice = (currSymb, products) => {
  //   const prodPricesByCurrency = [];

  //   for (const productItem of products) {

  //     console.log('products', products)

  //     const [{ amount }] = filterPrices(productItem.prices, currSymb);
  //     prodPricesByCurrency.push({
  //       priceByCurr: amount,
  //       quantity: productItem.quantity,
  //     });
  //   }

  //   const sumTotalPrice = prodPricesByCurrency.reduce(
  //     (sum, current) => sum + current.priceByCurr * current.quantity,
  //     0
  //   );

  //   return sumTotalPrice;
  // };

  calcTotalPrice = (currSymb, products) => {
    return products.reduce((sum, { prices, quantity }) => {
      const price = filterPrices(prices, currSymb)[0].amount;
      return sum + price * quantity;
    }, 0);
  };

  componentDidMount() {
    const loadAllCategoriesHandler = async () => {
      const data = await getCategories();

      this.setState({
        allCategories: data,
      });
    };
    loadAllCategoriesHandler();
  }

  render() {
    console.log("state.cart.items", this.props.products);
    return (
      <header className={classes.header}>
        <div className={classes.inner}>
          <nav className={classes.nav}>
            {this.state.allCategories.map((cat, index) => (
              <NavLink
                key={index + cat.name}
                activeClassName={classes.active}
                to={"/categories/" + cat.name}
                title={cat.name}
              >
                {cat.name}
              </NavLink>
            ))}
          </nav>
          <div className={classes.logo}>
            <img src={mainLogo} alt="Shopping!"></img>
          </div>
          <div className={classes.toolbar}>
            <Dropdown />
            <CartGroup
              totalPrice={this.calcTotalPrice(
                this.props.setCurrSymbol,
                this.props.products
              )}
              setCurrSymbol={this.props.setCurrSymbol}
              totalQuantity={this.props.totalQuantity}
            />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setCurrSymbol: state.currency.setCurrSymbol,
    products: state.cart.items,
    totalQuantity: state.cart.totalQuantity
  };
};

export default connect(mapStateToProps, null)(MainNavigation);
