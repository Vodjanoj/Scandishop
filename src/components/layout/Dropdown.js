import React, { Component } from "react";
import classes from "./Dropdown.module.css";

class Dropdown extends Component {
  state = {
    toggleDropdown: false,
  };

  toggleDropdownHandler = () => {
    this.setState((prevState) => {
      return { toggleDropdown: !prevState.toggleDropdown };
    });
  };

  offDropdownHandler = () => {
    this.setState(() => {
      return { toggleDropdown: false };
    });
  };

  render() {
    console.log("this.ToggleDropDown", this.state.toggleDropdown);
    return (
      <div
        onClick={() => this.toggleDropdownHandler()}
        className={classes.dropdown}
      >
        Dropdown
        {this.state.toggleDropdown && (
          <ul onMouseLeave={() => this.offDropdownHandler()}>
            <li>Option1</li>
            <li>Option2</li>
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;
