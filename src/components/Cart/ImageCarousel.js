import React, { Component } from "react";
import classes from "./ImageCarousel.module.css";

class ImageCarousel extends Component {
  state = {
    mainImage: this.props.images[0],
  };

  slideBackHandler = () => {
    const currentImageIndex = this.props.images.findIndex(
      (image) => image === this.state.mainImage
    );

    let updatedIndex;
    if (currentImageIndex === 0) {
      updatedIndex = this.props.images.length - 1;
    } else {
      updatedIndex = currentImageIndex - 1;
    }

    this.setState({
      mainImage: this.props.images[updatedIndex],
    });
  };

  slideForwardHandler = () => {
    const currentImageIndex = this.props.images.findIndex(
      (image) => image === this.state.mainImage
    );

    let updatedIndex;
    if (currentImageIndex === this.props.images.length - 1) {
      updatedIndex = 0;
    } else {
      updatedIndex = currentImageIndex + 1;
    }

    this.setState({
      mainImage: this.props.images[updatedIndex],
    });
  };

  render() {
    return (
      <div className={classes.carousel}>
        <div className={classes["overlay-gray"]}></div>
        <img
          src={this.state.mainImage}
          alt={this.props.brand + ", " + this.props.name}
        ></img>
        {this.props.images.length > 1 && (
          <div onClick={this.slideBackHandler} className={classes.back}></div>
        )}
        {this.props.images.length > 1 && (
          <div
            onClick={this.slideForwardHandler}
            className={classes.forward}
          ></div>
        )}
      </div>
    );
  }
}

export default ImageCarousel;
