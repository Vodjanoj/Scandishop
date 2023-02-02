import React, { Component } from "react";
import classes from "./Gallery.module.css";

class Gallery extends Component {
  render() {
    return (
      <>
        <div className={classes.gallery}>
          {this.props.images &&
            this.props.images.map((image, index) => (
              <div
                key={index + image}
                className={classes.item}
                onClick={this.props.onSelectImage.bind(this, image)}
              >
                <img src={image} alt={this.props.brand + ', ' +this.props.name + ' thumbnail'}></img>
                <div className={classes["overlay-gray"]}></div>
              </div>
            ))}
        </div>
        <div className={classes["main-image"]}>
          {this.props.images && <img src={this.props.selectedImage} alt={this.props.brand + ', ' +this.props.name}></img>}
        </div>
      </>
    );
  }
}

export default Gallery;
