import React, { Component } from "react";

import classes from "./Backdrop.module.css";

class Backdrop extends Component {
  render() {
    return (

    <div className={classes.backdrop} onClick={this.props.clicked}></div> 
    )
  }
}

export default Backdrop;
