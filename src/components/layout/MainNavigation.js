import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./MainNavigation.module.css";
import { getCategories } from "../../graphql/queries";
import mainLogo from "../../assets/a-logo.png";
import Dropdown from "./Dropdown";
import CartGroup from "../Cart/CartGroup";
import { filterPrices } from "../Utils/filterPrices";
import { withRouter } from "react-router-dom";

class MainNavigation extends Component {
  state = {
    allCategories: [],
  };

  calcTotalPrice = (currSymb, products) => {
    return products.reduce((sum, { prices, quantity }) => {
      const price = filterPrices(prices, currSymb);
      if (price.length > 0) {
        return sum + price[0].amount * quantity;
      }
    }, 0);
  };



  componentDidMount() {
    const activeIndex = sessionStorage.getItem("scandi-activeNavIndex");
    if (activeIndex) {
        this.setState({ activeIndex: parseInt(activeIndex, 10) });
    }
    const loadAllCategoriesHandler = async () => {
      const data = await getCategories();

      this.setState({
        allCategories: data,
      });
    };
    loadAllCategoriesHandler();
  }

  render() {
    const { pathname } = this.props.location;

    // Split the pathname into segments
    const splitPathname = pathname.split("/");

    // Get the last segment of the pathname
    const lastPathElement = splitPathname[splitPathname.length - 1];

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
    totalQuantity: state.cart.totalQuantity,
  };
};

export default connect(mapStateToProps, null)(withRouter(MainNavigation));
