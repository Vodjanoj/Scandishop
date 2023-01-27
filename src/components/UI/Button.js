import React, { Component } from "react";
import classes from "./Button.module.css";

class Button extends Component {
  render() {
    return (
      <button
        className={`${classes[`btn`]} ${this.props.viewBag &&
          classes[`view-bag`]} ${this.props.checkOut &&
          classes[`check-out`]} ${this.props.order && classes[`order`]}`}
        disabled={this.props.disabled}
        onClick={this.props.clicked}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
