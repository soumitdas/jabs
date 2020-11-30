import React, { useState } from "react";

const ProductImageViewer = ({ images }) => {
  const [image, setImage] = useState(images[0]);
  const handleImageClick = (index) => {
    //e.target.style.border = "2px solid #3273dc";
    setImage(images[index]);
  };
  return (
    <div className="columns is-variable is-1 is-mobile">
      <div className="column is-narrow">
        {images.map((img, i) => (
          <figure
            key={i}
            className="image is-64x64 mb-1"
            style={
              img.url === image.url ? { border: "2px solid #3273dc" } : null
            }
          >
            <img
              onClick={() => handleImageClick(i)}
              src={img.url}
              alt={img.name}
            ></img>
          </figure>
        ))}
      </div>
      <div className="column">
        <figure className="image is-square">
          <img src={image.url} alt={image.name}></img>
        </figure>
      </div>
    </div>
  );
};

export default ProductImageViewer;
