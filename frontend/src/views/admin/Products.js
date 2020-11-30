import React, { useState } from "react";
import CardModal from "../../components/CardModal";
import ProductForm from "../../components/ProductForm";
import useProduct from "../../hooks/useProduct";
import useCategory from "../../hooks/useCategory";

const AdminProducts = () => {
  const { isLoading, products, createOrUpdate, deleteById } = useProduct();
  const { categories } = useCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const findCategoryName = (categoryId) => {
    const c = categories.filter((cat) => cat._id === categoryId);
    if (c.length > 0) {
      return c[0].name;
    }
    return "";
  };

  const handleCreate = () => {
    setIsEditing(false);
    setEditData({});
    setIsModalOpen(true);
  };

  const handleEdit = (data) => {
    setIsEditing(true);
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleDelete = ({ _id, name }) => {
    const promt = window.confirm(
      `Are you sure to delete '${name}' product!\nThis action cannot be undone.`
    );
    if (promt) {
      deleteById(_id);
    }
  };

  return (
    <>
      <h1 className="title">Products</h1>
      <hr />
      {isLoading ? (
        <p className="subtitle has-text-centered">Loading...</p>
      ) : (
        <>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                {/* <div className="field is-grouped">
                  <div className="control">
                    <div className="select is-small">
                      <select>
                        <option>Product Id</option>
                        <option>Name</option>
                      </select>
                    </div>
                  </div>
                  <div className="control">
                    <input type="text" className="input is-small"></input>
                  </div>
                  <div className="control">
                    <button className="button is-small">Search</button>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button
                  className="button is-link is-small"
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
            </div>
          </nav>

          {products.length < 1 ? (
            <p className="subtitle has-text-centered">No data found</p>
          ) : (
            <div className="table-container">
              <table className="table is-bordered is-fullwidth">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Offer Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {products.map((product, i) => (
                  <tbody key={i}>
                    <tr>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>
                        {product.images.length > 0 && (
                          <figure className="image is-64x64">
                            <img
                              src={product.images[0].url}
                              alt={product.images[0].fileName}
                            />
                          </figure>
                        )}
                      </td>
                      <td>{product.price}</td>
                      <td>{product.offerPrice}</td>
                      <td>{product.category.name}</td>
                      <td>{product.inventory}</td>
                      <td>
                        <div className="buttons">
                          <button
                            className="button is-small is-info"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="button is-small is-danger"
                            onClick={() => handleDelete(product)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </>
      )}
      {isModalOpen && (
        <CardModal handleClose={() => setIsModalOpen(false)}>
          >
          <ProductForm
            handleClose={() => setIsModalOpen(false)}
            categories={categories}
            addOrEditMethod={createOrUpdate}
            isEditing={isEditing}
            editFormData={editData}
          />
        </CardModal>
      )}
    </>
  );
};

export default AdminProducts;
