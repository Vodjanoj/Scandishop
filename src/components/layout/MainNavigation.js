import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { getCategories } from "../../graphql/queries";
import mainLogo from "../../assets/a-logo.png";
import Dropdown from "./Dropdown";
import CartGroup from "../Cart/CartGroup";

class MainNavigation extends Component {
  state = {
    allCategories: [],
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
            <CartGroup />
          </div>
        </div>
      </header>
    );
  }
}

export default MainNavigation;

// className={(navData) =>
//   navData.isActive ? classes.active : ""
// }
