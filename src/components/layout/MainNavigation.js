import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { getCategories } from "../../graphql/queries";
import Dropdown from "./Dropdown";

class MainNavigation extends Component {
  state = {
    allCategories: [],
  };

  componentDidMount() {
    console.log('componentDidMount1')
    const loadAllCageriesHandler = async () => {
      const data = await getCategories();

      this.setState({
        allCategories: data,
      });
    };
    loadAllCageriesHandler();
     
  }

  

  render() {
    console.log("render");
    return (
      <header className={classes.header}>
        <div className={classes.inner}>
          <nav className={classes.nav}>
            <ul>
              {this.state.allCategories.map((cat, index) => (
                <li key={index + cat.name}>
                  <NavLink
                    activeClassName={classes.active}
                    to={"/categories/" + cat.name}
                  >
                    {cat.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={classes.logo}>Logo</div>
          <div className={classes.toolbar}>
            <Dropdown />
            <div>Cart</div>
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
