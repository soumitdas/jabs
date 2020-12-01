import React from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../hooks/useProduct";

const Home = () => {
  const { isLoading, products } = useProduct();

  return (
    <section className="section">
      <div className="container">
        {isLoading ? (
          <div className="has-text-centered mb-6">
            <h3 className="is-size-3 has-text-weight-semibold">Loading...</h3>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* <div className="has-text-centered mb-6">
              <h3 className="is-size-3 has-text-weight-semibold">Products</h3>
            </div> */}
            <div className="columns is-multiline">
              {products.map((product, index) => {
                return (
                  <div className="column is-one-quarter" key={index}>
                    <ProductCard
                      data={product}
                      categories={[product.category.name]}
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="has-text-centered mb-6">
            <h3 className="is-size-4 has-text-weight-semibold">
              No product found
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
