import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import AddEditProduct from "./AddEditProduct";
import { useSelector, useDispatch } from "react-redux";
import { addProductsToCategory, updateProductInCategory } from "../Redux/Slices/productSlice";
import { addToCart, decrement, increment } from "../Redux/Slices/cartSlice";
import { getRequest, postRequest, putRequest } from "../Services";
import { logout } from "../Redux/Slices/authSlice";
import AlertComponent from "../Components/AlertComponent";
import ProductLayout from "../Components/ProductLayout";

const AllProductLayout = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alert, setAlert] = useState({ message: "", variant: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart.items);

  // Get products from Redux store
  const products = useSelector(
    (state) =>
      state.product.productsByCategory[selectedCategory || "all"] || []
  );

  // Fetch categories
  const getCategories = async () => {
    try {
      const response = await getRequest("/products/categories");
      setCategories(response?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch products for selected category
  const getProducts = async () => {
    try {
      const url = selectedCategory
        ? `/products/category/${selectedCategory}`
        : "/products";
      const response = await getRequest(url);
      const fetchedProducts = response?.data || [];

      // Add to Redux store and prevent duplicates
      dispatch(
        addProductsToCategory({
          category: selectedCategory || "all",
          products: fetchedProducts,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  const handleAddProduct = () => {
    setEditProduct(null);
    setShowAddProduct(true);
  };

  const handleUpdate = (productId) => {
    const product = products.find((p) => p.id === productId);
    setEditProduct(product);
    setShowAddProduct(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editProduct) {
        const res = await putRequest(`/products/${editProduct.id}`, productData);
        if (res?.status === 200 || res?.status === 201) {
          dispatch(updateProductInCategory({
            category: productData.category || selectedCategory || "all",
            id: editProduct.id,
            data: { ...editProduct, ...productData },
          }));
          setAlert({ message: "Product updated successfully!", variant: "success" });
        }
      } else {
        const res = await postRequest("/products", productData);
        if (res?.status === 200 || res?.status === 201) {
          dispatch(addProductsToCategory({
            category: productData.category || selectedCategory || "all",
            products: [res.data],
          }));
          setAlert({ message: "Product added successfully!", variant: "success" });
        }
      }
      setShowAddProduct(false);
      setEditProduct(null);

      setTimeout(() => setAlert({ message: "", variant: "" }), 3000);

    } catch (err) {
      console.log(err);
      setAlert({ message: "Failed to save product", variant: "danger" });
      setTimeout(() => setAlert({ message: "", variant: "" }), 3000);
    }
  };

  const handleCancel = () => {
    setShowAddProduct(false);
    setEditProduct(null);
  };

  const handleAddToCart = (product) => {

    dispatch(addToCart(product));
    setAlert({ message: "Product added successfully!", variant: "success" });
    setTimeout(() => setAlert({ message: "", variant: "" }), 3000);
  };

  const handleView = (productId) => {
    navigate(`/home/products/${productId}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {alert.message && (
        <AlertComponent
          message={alert.message}
          variant={alert.variant}
          onClose={() => setAlert({ message: "", variant: "" })}
        />
      )}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-dark">All Products</h3>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-primary btn-sm px-3" onClick={handleAddProduct}>
              + Add Product
            </button>
            <button
              className="btn btn-outline-danger btn-sm px-3"
              onClick={handleLogout}
            >
              Logout
            </button>

            <div
              className="cart-icon"
              onClick={() => navigate("/home/cart")}
            >
              <FaShoppingBag size={22} />
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </div>
          </div>
        </div>

        <div className="category-wrapper mb-4">
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn btn-sm ${!selectedCategory ? "btn-dark" : "btn-outline-dark"
                }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm ${selectedCategory === cat
                  ? "btn-dark"
                  : "btn-outline-dark"
                  }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          className="row g-4"
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {products?.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);

            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={product.id}
              >
                <ProductLayout
                  product={product}
                  onView={handleView}
                  onUpdate={handleUpdate}
                  cartItem={cartItem}
                  onAddToCart={handleAddToCart}
                  onIncrement={(id) => dispatch(increment(id))}
                  onDecrement={(id) => dispatch(decrement(id))}
                />
              </div>
            );
          })}
        </div>
      </div>

      {showAddProduct && (
        <AddEditProduct
          product={editProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default AllProductLayout;

