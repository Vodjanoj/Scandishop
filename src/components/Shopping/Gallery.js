import React, { Component } from "react";
import classes from "./Gallery.module.css";

class Gallery extends Component {
  render() {
    
    return (
      <>
        <div className={classes.gallery}>
          {this.props.images &&
            this.props.images.map((image, index) => (
              <div key={index + image} className={classes.item}>
                <img
                  onClick={this.props.onSelectImage.bind(this, image)}
                  src={image}
                ></img>
              </div>
            ))}
        </div>
        <div className={classes["main-image"]}>
          {this.props.images && <img src={this.props.selectedImage}></img>}
        </div>
      </>
    );
  }
}

export default Gallery;
