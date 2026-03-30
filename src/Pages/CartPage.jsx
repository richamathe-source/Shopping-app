import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, removeItem, clearCart } from "../Redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../Components/AlertComponent";
import { useState } from "react";

const CartPage = () => {

  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: "", variant: "info", });


  if (cart.length === 0) {
    return <h3 className="text-center mt-5">Cart is empty</h3>;
  }

  const showAlert = (message, variant = "info") => {
    setAlert({ message, variant });

    setTimeout(() => {
      setAlert({ message: "", variant: "info" });
    }, 2000);
  };
  const handleIncrement = (id) => {
    dispatch(increment(id));
    showAlert("Quantity incresed", "success");
  };
  const handleDecrement = (id) => {
    dispatch(decrement(id));
    showAlert("Quantity Decreased", "warning");
  }
  const handleRemove = (id) => {
    dispatch(removeItem(id));
    showAlert("Item removed from cart", "success");
  }
  // const handleClear = () => dispatch(clearCart());

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary btn-sm mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <h3 className="mb-4">Your Cart</h3>
      <AlertComponent
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ message: "", variant: "info" })}
      />
      <div className="row">
        {cart.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card p-3 h-100">
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                  <strong>Category:</strong> {item.category} <br />
                  <strong>Price:</strong> ${item.price} <br />
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <div className="d-flex justify-content-between">
                  <div>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h5>Total Amount: ${totalAmount.toFixed(2)}</h5>
        <button className="btn btn-warning">
          Proceed to pay
        </button>
      </div>
    </div>
  );
};

export default CartPage;

