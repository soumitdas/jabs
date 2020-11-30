import React from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <div className="container">
      <div className="has-text-centered mb-6">
        <h3 className="is-size-3 has-text-weight-semibold">Products</h3>
      </div>
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <ProductCard
            name="Product A"
            imgUrl="https://bulma.io/images/placeholders/96x96.png"
            price="399"
            offerPrice="299"
            categories={["fiction", "story"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
