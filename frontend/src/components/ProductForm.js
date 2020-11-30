import React, { useState } from "react";
import Button from "./Button";
import ImageFile from "./ImageFile";

const ProductForm = ({
  cancelText = "Cancel",
  handleClose,
  isEditing = false,
  editFormData,
  addOrEditMethod,
  categories,
}) => {
  const [formData, setFormData] = useState(() => {
    if (isEditing)
      return {
        id: editFormData._id,
        name: editFormData.name,
        shortDescription: editFormData.shortDescription,
        description: editFormData.description,
        category: editFormData.category._id,
        price: editFormData.price,
        offerPrice: editFormData.offerPrice,
        inventory: editFormData.inventory,
        images: editFormData.images,
      };
    return {
      name: "",
      shortDescription: "",
      description: "",
      category: "",
      price: "",
      offerPrice: "",
      inventory: "",
    };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    for (let name in formData) {
      if (name === "images") {
        try {
          data.append(name, JSON.stringify(formData[name]));
        } catch (_) {
        } finally {
          continue;
        }
      }
      data.append(name, formData[name]);
    }
    data.append("files", images[0]);

    addOrEditMethod(!isEditing, data, isEditing ? editFormData._id : null)
      .then((_) => {
        handleClose();
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e.message);
      });
  };

  return (
    <form
      className="modal-card"
      style={{ maxWidth: "540px" }}
      onSubmit={handleSubmit}
    >
      <header className="modal-card-head">
        <p className="modal-card-title">
          {isEditing ? "Update" : "Add new"} Product
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
              name="name"
              placeholder="Feluda Ekadosh"
              onChange={handleChange}
              value={formData.name}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Short Description</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="shortDescription"
              placeholder="tagline for the product"
              onChange={handleChange}
              value={formData.shortDescription}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              placeholder="Long description for the product"
              onChange={handleChange}
              value={formData.description}
              required={true}
            />
          </div>
        </div>
        <ImageFile label="Image" files={images} setFiles={setImages} />
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="price"
              placeholder="Eg. 100 (no decimal place)"
              onChange={handleChange}
              value={formData.price}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Offer Price</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="offerPrice"
              placeholder="Eg. 95 (no decimal place)"
              onChange={handleChange}
              value={formData.offerPrice}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select
                name="category"
                onChange={handleChange}
                value={formData.category}
                required={true}
              >
                <option value="">Select the product category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Inventory</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="inventory"
              placeholder="Eg. 10 (no decimal place)"
              onChange={handleChange}
              value={formData.inventory}
              required={true}
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

export default ProductForm;
