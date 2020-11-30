import React, { useState } from "react";
import Button from "./Button";

const ProductCategoryForm = ({
  cancelText = "Cancel",
  handleClose,
  isEditing = false,
  editFormData,
  addOrEditMethod,
}) => {
  const [formData, setFormData] = useState(() => {
    if (isEditing)
      return {
        id: editFormData._id,
        category: editFormData.name,
        slug: editFormData.slug,
      };
    return {
      category: "",
      slug: "",
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addOrEditMethod(!isEditing, formData)
      .then((_) => {
        handleClose();
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  return (
    <form className="modal-card" onSubmit={handleSubmit}>
      <header className="modal-card-head">
        <p className="modal-card-title">
          {isEditing ? "Update" : "Add new"} Category
        </p>
        {isEditing && <p>ID: {formData.id}</p>}
        <button
          onClick={handleClose}
          className="delete"
          aria-label="close"
        ></button>
      </header>
      <section className="modal-card-body">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="category"
              placeholder="Eg. Novel, Fiction etc"
              onChange={handleChange}
              value={formData.category}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Slug</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="slug"
              placeholder="Eg. novel, non-fiction etc"
              onChange={handleChange}
              value={formData.slug}
            />
          </div>
        </div>
      </section>
      <footer className="modal-card-foot">
        <Button type="info" loading={isLoading} disabled={isLoading}>
          {isEditing ? "Update" : "Save"}
        </Button>
        <button onClick={handleClose} className="button">
          {cancelText}
        </button>
      </footer>
    </form>
  );
};

export default ProductCategoryForm;
