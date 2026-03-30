const ProductLayout = ({
    product,
    isDetail = false,
    onView,
    onUpdate,
    cartItem,
    onAddToCart,
    onIncrement,
    onDecrement,
}) => {

    if (!product) return null;
    
    return (
        <div
            className={`card product-card ${isDetail ? "mb-2" : "h-100 d-flex flex-column"
                }`}
            style={isDetail ? { width: "18rem" } : {}}
        >

            {!isDetail && (
                <button
                    className="btn btn-light btn-sm update-btn"
                    onClick={() => onUpdate(product.id)}
                >
                    ✏️
                </button>
            )}

            <img
                src={product.image}
                className="card-img-top product-img"
                alt={product.title}
            />

            <div className="card-body d-flex flex-column">
                <h6 className="card-title fw-semibold">{product.title}</h6>

                <p className="small text-muted mb-2">{product.category}</p>

                <p className="mb-1">
                    <strong>${product.price}</strong>
                </p>

                <p className="text-muted small mb-3">
                    ⭐ {product.rating?.rate || "N/A"}
                </p>

                {isDetail && (
                    <p>
                        <strong>Count:</strong> {product.rating?.count}
                    </p>
                )}

                <div className="mt-auto d-flex justify-content-between align-items-center">

                    {!isDetail && (
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => onView(product.id)}
                        >
                            View
                        </button>
                    )}
                    {cartItem ? (
                        <div className="d-flex align-items-center gap-2">
                            <span
                                onClick={() => onDecrement(product.id)}
                                style={{ cursor: "pointer", fontWeight: "bold" }}
                            >
                                -
                            </span>

                            <span>{cartItem.quantity}</span>

                            <span
                                onClick={() => onIncrement(product.id)}
                                style={{ cursor: "pointer", fontWeight: "bold" }}
                            >
                                +
                            </span>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => onAddToCart(product)}
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ProductLayout;