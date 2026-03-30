import { useEffect, useState } from "react";
import { getRequest } from "../Services";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, increment, decrement } from "../Redux/Slices/cartSlice";
import ProductLayout from "../Components/ProductLayout";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Fetch single product
  const getSingleProduct = async () => {
    try {
      const response = await getRequest(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  // if (!product) {
  //   return <h3 className="text-center mt-5">Loading...</h3>;
  // }

  // Check if product exists in cart
  const cartItem = cart.find((item) => item.id === product.id);

  return (
    
    <>
    <button
        className="btn btn-secondary btn-sm mb-3 m-5 p-2"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    <div className="container d-flex justify-content-center align-items-center mt-4">
        <ProductLayout
          product={product}
          isDetail={true}
          cartItem={cartItem}
          onAddToCart={(p) => dispatch(addToCart(p))}
          onIncrement={(id) => dispatch(increment(id))}
          onDecrement={(id) => dispatch(decrement(id))}
        />
      </div>
    </>
  );
};

export default SingleProduct;