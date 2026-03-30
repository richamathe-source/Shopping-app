import { useEffect, useState } from "react";
import Form from "../Components/FormComponent";

const AddEditProduct = ({ product = null, onSave, onCancel }) => {
  const [fields, setFields] = useState([]);
  const [imagePreview, setImagePreview] = useState(product?.image || "");

  useEffect(() => {
    setFields([
      {
        id: "title",
        type: "input",
        label: "Title",
        placeholder: "Enter product title",
        value: product?.title || "",
      },
      {
        id: "price",
        type: "input",
        label: "Price",
        placeholder: "Enter product price",
        value: product?.price || "",
        inputType: "number",
      },
      {
        id: "description",
        type: "input",
        label: "Description",
        placeholder: "Enter product description",
        value: product?.description || "",
      },
      {
        id: "category",
        type: "dropdown",
        label: "Category",
        placeholder: "Select a category",
        value: product?.category || "",
        options: [
          { value: "electronics", label: "Electronics" },
          { value: "jewellery", label: "Jewellery" },
          { value: "men's clothing", label: "Men's Clothing" },
          { value: "women's clothing", label: "Women's Clothing" },
        ],
      },
      {
        id: "image",
        type: "image",
        label: "Upload Image",
        value: product?.image || "",
      },
    ]);
  }, [product]);

  const handleSubmit = (formData) => {
    const imageFile = formData.image;

    if (imageFile && imageFile instanceof File) {
    
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(imageFile);
    } else {
      
      onSave({ ...formData, image: imagePreview });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="btn btn-primary text-white modal-header">
            <h5 className="modal-title">{product ? "Edit Product" : "Add Product"}</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>

          <div className="modal-body">
    
            {imagePreview && (
              <div className="mb-3 text-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxHeight: "150px", objectFit: "contain" }}
                  className="img-fluid border rounded"
                />
              </div>
            )}

            <Form
              fields={fields}
              onSubmit={handleSubmit}
              formId="productForm"
              onFileChange={handleFileChange} 
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              form="productForm"
              className="btn btn-primary text-white"
            >
              {product ? "Update" : "Save"}
            </button>
          </div>

        </div>
      </div>

      <div className="modal" onClick={onCancel}></div>
    </div>
  );
};

export default AddEditProduct;


