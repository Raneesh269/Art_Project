import React from "react";
import { useNavigate } from "react-router-dom";

function OrdersPage({
  orders,
  setShowClearOrdersModal,
})
  {
  const navigate = useNavigate();

  return (
    <div className="orders-page">

      <button
        className="orders-close-btn"
        onClick={() => navigate("/")}
      >
        ✕ Close
      </button>

      <h1 className="orders-title">
        Orders
      </h1>

      <button
        className="delete-btn"
        onClick={() =>
          setShowClearOrdersModal(true)
        }
      >
        Clear All Orders
      </button>

      <div className="orders-table">

        <div className="orders-header">
          <span>#</span>
          <span>Artwork</span>
          <span>Price</span>
          <span>Qty.</span>
          <span>Total</span>
          <span>Buyer</span>
          <span>Status</span>
          <span>Payment</span>
        </div>

        {orders?.map((order, index) => (

          <div
            key={index}
            className="orders-row"
          >

            <span>{index + 1}</span>

            <span>{order.artwork}</span>

            <span>₹{order.price}</span>

            <span>{order.quantity}</span>

            <span>₹{order.total_amount}</span>

            <span>{order.buyer}</span>

            <span>
              <div
                className={
                  order.status === "paid"
                    ? "status-paid"
                    : "status-pending"
                }
              >
                {order.status}
              </div>
            </span>

            <span>
              {order.payment_method || "UPI"}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default OrdersPage;