import React from "react";

function CartModal({
  showCart,
  setShowCart,
  cart,
  removeFromCart,
  totalPrice,
  setShowCheckout,
  setCart,
  loggedInRole,
})
  {

  if (!showCart) return null;

  return (

    <div className="modal">

      <div className="payment-box">

        {/* HEADER */}
        <div className="cart-header">

          <h2>Your Cart</h2>

          <button
            onClick={() => setShowCart(false)}
          >
            ❌
          </button>

        </div>

        {/* ITEMS */}
        <div className="cart-items">

          {cart.map((item, index) => (

            <div
              className="cart-item"
              key={index}
            >

              {/* IMAGE */}
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `http://127.0.0.1:8000${item.image}`
                }
                alt=""
              />

              {/* INFO */}
              <div className="cart-info">

                <p>{item.title}</p>

                <p>₹{item.price}</p>

                {/* QUANTITY */}
                <div className="qty-box">

                  {/* MINUS */}
                  <button
                    onClick={() => {

                      setCart((prev) =>
                        prev
                          .map((cartItem, i) => {

                            if (i === index) {

                              if (cartItem.quantity === 1) {
                                return null;
                              }

                              return {
                                ...cartItem,
                                quantity:
                                  cartItem.quantity - 1,
                              };
                            }

                            return cartItem;

                          })
                          .filter(Boolean)
                      );

                    }}
                  >
                    ➖
                  </button>

                  {/* QTY */}
                  <span>{item.quantity}</span>

                  {/* PLUS */}
                  <button
                    onClick={() => {

                      setCart((prev) =>
                        prev.map((cartItem, i) =>

                          i === index
                            ? {
                                ...cartItem,
                                quantity:
                                  cartItem.quantity + 1,
                              }
                            : cartItem

                        )
                      );

                    }}
                  >
                    ➕
                  </button>

                </div>

              </div>

              {/* REMOVE */}
              <button
                onClick={() =>
                  removeFromCart(index)
                }
              >
                ❌
              </button>

            </div>

          ))}

        </div>

        {/* FOOTER */}
        <div className="cart-footer">

          <h3>Total: ₹{totalPrice}</h3>

          <button
            className="checkout-btn"
            onClick={() => {

              if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
              }

              if (loggedInRole === "seller") {
                alert("Seller accounts cannot purchase artworks");
                return;
              }

              setShowCheckout(true);

            }}
          >
            Checkout 💳
          </button>

        </div>

      </div>

    </div>

  );
}

export default CartModal;