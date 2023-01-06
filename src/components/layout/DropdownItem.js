import React, { Component } from "react";
import classes from "./DropdownItem.module.css";

class DropdownItem extends Component {
  render() {
    return (
      <li>
        <div className={classes.item} onClick={this.props.onClick}>
          {this.props.symbol} {this.props.label}
        </div>
      </li>
    );
  }
}

export default DropdownItem;
