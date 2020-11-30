import React, { useState } from "react";
import CardModal from "../../components/CardModal";
import useCategory from "../../hooks/useCategory";
import ProductCategoryForm from "../../components/ProductCategoryForm";

const AdminProductCategory = () => {
  const { isLoading, categories, createOrUpdate, deleteById } = useCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

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
      `Are you sure to delete '${name}' category!\nThis action cannot be undone.`
    );
    if (promt) {
      deleteById(_id);
    }
  };

  return (
    <>
      <h1 className="title">Product Categories</h1>
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
                        <option>Category Id</option>
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
                  onClick={handleCreate}
                  className="button is-link is-small"
                >
                  Create
                </button>
              </div>
            </div>
          </nav>

          {categories.length < 1 ? (
            <p className="subtitle has-text-centered">No data found</p>
          ) : (
            <div className="table-container">
              <table className="table is-bordered is-fullwidth">
                <thead>
                  <tr>
                    <th>Category Id</th>
                    <th>Category Name</th>
                    <th>Category Slug</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {categories.map((category) => {
                  return (
                    <tbody key={category._id}>
                      <tr>
                        <td>{category._id}</td>
                        <td>{category.name}</td>
                        <td>{category.slug}</td>
                        <td>
                          <div className="buttons">
                            <button
                              onClick={() => handleEdit(category)}
                              className="button is-small is-info"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(category)}
                              className="button is-small is-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          )}
        </>
      )}
      {isModalOpen && (
        <CardModal handleClose={() => setIsModalOpen(false)}>
          <ProductCategoryForm
            handleClose={() => setIsModalOpen(false)}
            addOrEditMethod={createOrUpdate}
            isEditing={isEditing}
            editFormData={editData}
          />
        </CardModal>
      )}
    </>
  );
};

export default AdminProductCategory;
