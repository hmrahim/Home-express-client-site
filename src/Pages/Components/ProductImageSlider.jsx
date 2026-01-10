import { useState } from "react";
import "./ProductImageSlider.css";

const ProductImageSlider = ({ variants = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // আগের image
  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? variants.length - 1 : prev - 1));
  };

  // পরের image
  const nextImage = () => {
    setActiveIndex((prev) => (prev === variants.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider-wrapper">
      {/* বড় image */}
      <div className="main-image">
        <button className="arrow left rounded-md" onClick={prevImage}>
          ❮
        </button>

        <img src={variants[activeIndex]?.images} alt="product" />

        <button className="arrow right rounded-md" onClick={nextImage}>
          ❯
        </button>
      </div>

      {/* ছোট image গুলো */}
      <div className="thumbnails ">
        {variants.map((img, index) => (
          <img
            key={index}
            src={img.images}
            alt="thumb"
            className={`${index === activeIndex ? "active" : ""} `}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;
