import React, { useEffect, useState } from "react";
import ProductImageViewer from "../components/ProductImageViewer";
import { useParams, useHistory } from "react-router-dom";
import productApi from "../api/product";
import { useCart } from "../hooks/useCart";
import Button from "../components/Button";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const checkout = useCart();

  useEffect(() => {
    productApi
      .getById(id)
      .then((resp) => {
        setProduct(resp.data);
      })
      .catch((e) => {
        alert(`Error: ${e.message}`);
      });
  }, []);

  const history = useHistory();
  const handleAddToCart = async () => {
    await checkout.addToCart(product);
    history.push("/cart");
  };

  return (
    <section className="section">
      <div className="container">
        {product ? (
          <>
            <div className="columns">
              <div className="column is-5">
                <ProductImageViewer images={product.images} />
              </div>
              <div className="column">
                <nav className="breadcrumb is-small" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <a href="#">JABS</a>
                    </li>
                    <li>
                      <a href="#">{product.category.name}</a>
                    </li>
                    <li className="is-active">
                      <a href="#" aria-current="page">
                        {product.name}
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="block">
                  <h1 className="title">{product.name}</h1>
                  {/* <h2 className="subtitle">
                <span className="tag is-success has-text-weight-semibold">
                  4.5☆
                </span>
                <span className="is-size-6 has-text-grey has-text-weight-bold ml-3">
                  1,359 Ratings & 235 Reviews
                </span>
              </h2> */}
                </div>
                {product.price === product.offerPrice ? (
                  <div className="block">
                    <span className="is-size-3 has-text-weight-bold">
                      ₹ {product.price}
                    </span>
                  </div>
                ) : (
                    <div className="block">
                      <p className="has-text-success-dark has-text-weight-semibold is-size-6">
                        Special price
                    </p>
                      <span className="is-size-3 has-text-weight-bold">
                        ₹ {product.offerPrice}
                      </span>
                      <span className="is-size-5 has-text-grey ml-3">
                        <s>₹ {product.price}</s>
                      </span>
                      <span className="has-text-success-dark has-text-weight-semibold is-size-5 ml-3">
                        {Math.floor(
                          ((Number(product.price) - Number(product.offerPrice)) /
                            Number(product.price)) *
                          100
                        )}
                        % off
                    </span>
                    </div>
                  )}
                {product.shortDescription && (
                  <div className="block">
                    <p className="subtitle">{product.shortDescription}</p>
                  </div>
                )}
                <div className="content">
                  <ul>
                    <li>100% Original Product</li>
                    <li>Easy Returns Available</li>
                    <li>Cash on Delivery available</li>
                  </ul>
                </div>
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <Button
                      type="link"
                      size="medium"
                      fullWidth={true}
                      onClick={handleAddToCart}
                      loading={checkout.isLoading}
                      disabled={checkout.isLoading}
                    >
                      Add to Cart
                    </Button>
                    {/* <button
                      className="button is-link is-medium is-fullwidth"
                      onClick={() => checkout.addToCart(product._id)}
                      
                    >
                      Add to Cart
                    </button> */}
                  </p>
                  {/* <p className="control is-expanded">
                    <button className="button is-medium is-fullwidth">
                      Add to Wistlist
                    </button>
                  </p> */}
                </div>
              </div>
            </div>
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {product.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
            <div className="has-text-centered mb-6">
              <h3 className="is-size-3 has-text-weight-semibold">Loading...</h3>
            </div>
          )}
      </div>
    </section>
  );
};

export default Product;
