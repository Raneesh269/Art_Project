import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import React, { useState, useEffect } from "react";


import Home from "./pages/Home";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrdersPage from "./pages/OrdersPage";
import ClearOrdersModal from "./components/ClearOrdersModal";
import LoginFailedModal from "./components/LoginFailedModal";
import EditArtworkModal from "./components/EditArtworkModal";
import NotFound from "./pages/NotFound";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/gallery.css";
import "./styles/modal.css";
import "./styles/cart.css";
import "./styles/auth.css";
import "./styles/payment.css";
import "./styles/upload.css";
import "./styles/dashboard.css";
import "./styles/profile.css";
import "./styles/admin.css";
import "./styles/success.css";
import "./styles/notfound.css";

import UploadModal from "./components/UploadModal";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import CartModal from "./components/CartModal";
import CheckoutModal from "./components/CheckoutModal";
import ImageModal from "./components/ImageModal";

import InvalidUpiModal from "./components/InvalidUpiModal";

import DeleteModal from "./components/DeleteModal";
import SuccessPopup from "./components/SuccessPopup";

import LoginRequiredModal from "./components/LoginRequiredModal";

function App() {

const [allUsers, setAllUsers] = useState([]);
const [orders, setOrders] = useState([]);
const [allOrders, setAllOrders] = useState([]);
const [showClearOrdersModal, setShowClearOrdersModal] =
  useState(false);
const [showLoginFailedModal, setShowLoginFailedModal] =
  useState(false);  

const [showInvalidUpiModal, setShowInvalidUpiModal] =
  useState(false);

const [expectedUpi, setExpectedUpi] =
  useState("");

const [cardNumber, setCardNumber] = useState("");
const [expiry, setExpiry] = useState("");
const [cvv, setCvv] = useState("");  
  
  // GLOBAL STATES
  const [artworks, setArtworks] = useState([]);
  const [cart, setCart] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role") || "user"
  );

  const [loggedInUser, setLoggedInUser] = useState("");

  const [loggedInRole, setLoggedInRole] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  // MODALS
const [showUpload, setShowUpload] = useState(false);

const [showLogin, setShowLogin] = useState(false);

const [showRegister, setShowRegister] = useState(false);

const [showCart, setShowCart] = useState(false);

const [showCheckout, setShowCheckout] = useState(false);

const [showProfile, setShowProfile] =
  useState(false);

const [selectedImage, setSelectedImage] = useState(null);

const [showSuccessPopup, setShowSuccessPopup] =
  useState(false);

const [successMessage, setSuccessMessage] =
  useState("");

const [successSubText, setSuccessSubText] =
  useState("");

const [showDeleteModal, setShowDeleteModal] =
  useState(false);  

const [showLoginRequired, setShowLoginRequired] =
  useState(false);

const [deleteArtId, setDeleteArtId] =
  useState(null);

// EDIT
const [editingArt, setEditingArt] =
  useState(null);

const [editTitle, setEditTitle] =
  useState("");

const [editArtist, setEditArtist] =
  useState("");

const [editDescription, setEditDescription] =
  useState("");

const [editPrice, setEditPrice] =
  useState("");

// UPLOAD
const [title, setTitle] = useState("");

const [artist, setArtist] = useState("");

const [description, setDescription] =
  useState("");

const [price, setPrice] = useState("");

const [image, setImage] = useState(null);

// LOGIN
const [username, setUsername] = useState("");

const [password, setPassword] = useState("");

// REGISTER
const [phoneNumber, setPhoneNumber] =
  useState("");

const [shopName, setShopName] =
  useState("");

// PAYMENT
const [paymentMethod, setPaymentMethod] =
  useState("upi");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/artworks/")
      .then((res) => res.json())
      .then((data) =>
        setArtworks(Array.isArray(data) ? data : data.results)
      );
  }, []);

useEffect(() => {
  fetch(
    "http://127.0.0.1:8000/api/all-orders/"
  )
    .then((res) => res.json())
    .then((data) => setAllOrders(data));
}, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/api/seller-orders/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setOrders(data);
    });
}, [token]);

const addToCart = (art) => {

  if (!token) {
    setShowLogin(true);
    return;
  }

  if (loggedInRole === "seller") {
    alert("Seller accounts cannot purchase artworks");
    return;
  }

  setCart((prev) => {

    const existing = prev.find(
      (item) => item.id === art.id
    );

    if (existing) {

      return prev.map((item) =>
        item.id === art.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    }

    return [
      ...prev,
      {
        ...art,
        quantity: 1,
      },
    ];
  });
};

const removeFromCart = (index) => {

  const newCart = [...cart];

  newCart.splice(index, 1);

  setCart(newCart);
};

const totalPrice = cart.reduce(
  (sum, item) =>
    sum + item.price * item.quantity,
  0
);  

const handleSubmit = (e) => {

  e.preventDefault();

  if (!token) {

    alert("Login required!");

    setShowLogin(true);

    return;
  }

  const formData = new FormData();

  formData.append("title", title);

  formData.append("artist_name", artist);

  formData.append("price", price);

  formData.append("image", image);

  formData.append(
    "description",
    description
  );

  fetch(
    "http://127.0.0.1:8000/api/artworks/",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  )

    .then(async (res) => {

      const data = await res.json();

      if (!res.ok) {

        alert(JSON.stringify(data));

        return;
      }

      const fixedArtwork = {
        ...data,

        image:
          data.image?.startsWith("http")
            ? data.image
            : `http://127.0.0.1:8000${data.image}`,
      };

      setArtworks((prev) => [
        ...prev,
        fixedArtwork,
      ]);

      setShowUpload(false);

      setTitle("");
      setArtist("");
      setDescription("");
      setPrice("");
      setImage(null);

      setSuccessMessage(
        "Artwork Uploaded"
      );

      setSuccessSubText(
        "Your artwork was uploaded successfully."
      );

      setShowSuccessPopup(true);

    });
};

const handleLogin = (e) => {

  e.preventDefault();

  fetch(
    "http://127.0.0.1:8000/api/token/",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    }
  )

    .then((res) => res.json())

    .then((data) => {

      if (data.access) {

        localStorage.setItem(
          "token",
          data.access
        );

        setToken(data.access);

        fetch(
          "http://127.0.0.1:8000/api/user/",
          {
            headers: {
              Authorization:
                `Bearer ${data.access}`,
            },
          }
        )

          .then((res) => res.json())

          .then((userData) => {

            setRole(userData.role);

            localStorage.setItem(
              "role",
              userData.role
            );

            setLoggedInUser(
              userData.username
            );

            setLoggedInRole(
              userData.role
            );

            localStorage.setItem(
              "username",
              userData.username
            );

            if (
              userData.is_superuser
            ) {

              setIsAdmin(true);

              localStorage.setItem(
                "isAdmin",
                "true"
              );

            } else {

              setIsAdmin(false);

              localStorage.setItem(
                "isAdmin",
                "false"
              );
            }

            setShowLogin(false);

          });

} else {

setShowLoginFailedModal(true);

}

})
.catch(() => {

  setSuccessMessage(
    "Login Failed"
  );

  setSuccessSubText(
    "Something went wrong"
  );

  setShowSuccessPopup(true);

});
};

// 👇 PLACE RIGHT UNDER handleLogin

const handleRegister = (e) => {

  e.preventDefault();

  if (!username || !password || !role) {
    alert("All fields required");
    return;
  }

  fetch("http://127.0.0.1:8000/api/users/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      role,
      phone_number: phoneNumber,
      shop_name: role === "seller" ? shopName : "",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setSuccessMessage("Registration Successful");
      setSuccessSubText("Account created");
      setShowSuccessPopup(true);
      setShowRegister(false);
      setShowLogin(true);

      setUsername("");
      setPassword("");
      setPhoneNumber("");
      setShopName("");
      setRole("user");
    })
    .catch((err) => {
      alert("Register failed");
    });
};

const handleEditSave = () => {

  fetch(
    `http://127.0.0.1:8000/api/artworks/${editingArt.id}/`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title: editTitle,
        artist_name: editArtist,
        description: editDescription,
        price: editPrice,
      }),
    }
  )

    .then((res) => res.json())

    .then((updatedArt) => {

      setArtworks((prev) =>
        prev.map((art) =>
          art.id === updatedArt.id
            ? updatedArt
            : art
        )
      );

      setEditingArt(null);

      setSuccessMessage(
        "Artwork Updated"
      );

      setSuccessSubText(
        "Changes saved successfully"
      );

      setShowSuccessPopup(true);

    });

};

const handleDelete = () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this artwork?"
  );

  if (!confirmDelete) return;

  fetch(
    `http://127.0.0.1:8000/api/artworks/${deleteArtId}/`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

    .then(() => {

      setArtworks((prev) =>
        prev.filter(
          (art) => art.id !== deleteArtId
        )
      );

      setShowDeleteModal(false);

      setSuccessMessage(
        "Artwork Deleted"
      );

      setSuccessSubText(
        "Artwork removed successfully"
      );

      setShowSuccessPopup(true);

    });

};

const clearOrders = () => {

  fetch(
    "http://127.0.0.1:8000/api/clear-orders/",
    {
      method: "DELETE",
    }
  )
    .then(() => {
      setOrders([]);
      setAllOrders([]);
    });

};

const handleLogout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("isAdmin");

  setToken("");
  setRole("");

  setLoggedInUser("");
  setLoggedInRole("");

  setIsAdmin(false);

  setCart([]);

};
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Home

              showUpload={showUpload}
              setShowUpload={setShowUpload}

              showLogin={showLogin}
              setShowLogin={setShowLogin}

              showRegister={showRegister}
              setShowRegister={setShowRegister}

              showCart={showCart}
              setShowCart={setShowCart}

              showProfile={showProfile}

              setShowProfile={setShowProfile}

              showCheckout={showCheckout}
              setShowCheckout={setShowCheckout}

              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}

              addToCart={addToCart}

              
              artworks={artworks}
              setArtworks={setArtworks}
              cart={cart}
              setCart={setCart}
              token={token}
              setToken={setToken}
              role={role}
              handleLogout={handleLogout}
              setRole={setRole}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              loggedInRole={loggedInRole}
              setLoggedInRole={setLoggedInRole}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}

              showLoginRequired={showLoginRequired}
              setShowLoginRequired={setShowLoginRequired}
            />
          }
        />

        <Route
          path="/seller-dashboard"
          element={
            <SellerDashboard
              artworks={artworks}
              loggedInUser={loggedInUser}
              orders={[]}
              setShowUpload={setShowUpload}
              setEditingArt={setEditingArt}
              setEditTitle={setEditTitle}
              setEditArtist={setEditArtist}
              setEditDescription={setEditDescription}
              setEditPrice={setEditPrice}
              setDeleteArtId={setDeleteArtId}
              setShowDeleteModal={setShowDeleteModal}
            />
          }
        />

        <Route
          path="/admin-dashboard"
          element={
           <AdminDashboard
              allUsers={allUsers}
              allArtworks={artworks}
              allOrders={allOrders}  
              setShowDeleteModal={setShowDeleteModal}
              setDeleteArtId={setDeleteArtId}
            />
          }
        />

        <Route
          path="/orders"
          element={
            <OrdersPage
              orders={orders}
              setShowClearOrdersModal={
                setShowClearOrdersModal
              }
            />
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <UploadModal
      showUpload={showUpload}
      setShowUpload={setShowUpload}

      title={title}
      setTitle={setTitle}

      artist={artist}
      setArtist={setArtist}

      description={description}
      setDescription={setDescription}

      price={price}
      setPrice={setPrice}

      setImage={setImage}

      handleSubmit={handleSubmit}
    />

    <LoginModal
      showLogin={showLogin}
      setShowLogin={setShowLogin}

      setShowRegister={setShowRegister}

      username={username}
      setUsername={setUsername}

      password={password}
      setPassword={setPassword}

      handleLogin={handleLogin}
    />

    <RegisterModal
      showRegister={showRegister}
      setShowRegister={setShowRegister}
      setShowLogin={setShowLogin}

      username={username}
      setUsername={setUsername}

      password={password}
      setPassword={setPassword}

      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}

      shopName={shopName}
      setShopName={setShopName}

      role={role}
      setRole={setRole}

      handleRegister={handleRegister}
    />

   <CartModal
      showCart={showCart}
      setShowCart={setShowCart}

      cart={cart}

      removeFromCart={removeFromCart}

      totalPrice={totalPrice}

      setShowCheckout={setShowCheckout}

      setCart={setCart}

      loggedInRole={loggedInRole}
    />

    <CheckoutModal
      showCheckout={showCheckout}
      setShowCheckout={setShowCheckout}

      loggedInUser={loggedInUser}

      totalPrice={totalPrice}

      paymentMethod={paymentMethod}
      setPaymentMethod={setPaymentMethod}

      setCart={setCart}

      setShowSuccessPopup={
        setShowSuccessPopup
      }

      setSuccessMessage={
        setSuccessMessage
      }

      setSuccessSubText={
        setSuccessSubText
      }

      cart={cart}
      token={token}
      setShowCart={setShowCart}

      showInvalidUpiModal={showInvalidUpiModal}
      setShowInvalidUpiModal={setShowInvalidUpiModal}

      expectedUpi={expectedUpi}
      setExpectedUpi={setExpectedUpi}

      cardNumber={cardNumber}
      setCardNumber={setCardNumber}

      expiry={expiry}
      setExpiry={setExpiry}

      cvv={cvv}
      setCvv={setCvv}
    />

    <ImageModal
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
    />

   <DeleteModal
      showDeleteModal={showDeleteModal}
      setShowDeleteModal={setShowDeleteModal}
      deleteArtId={deleteArtId}
      setDeleteArtId={setDeleteArtId}
      handleDelete={handleDelete}
    />

   <LoginRequiredModal
      showLoginRequired={showLoginRequired}
      setShowLoginRequired={setShowLoginRequired}
      setShowLogin={setShowLogin}
    /> 

    <EditArtworkModal
      editingArt={editingArt}
      setEditingArt={setEditingArt}

      editTitle={editTitle}
      setEditTitle={setEditTitle}

      editArtist={editArtist}
      setEditArtist={setEditArtist}

      editDescription={editDescription}
      setEditDescription={setEditDescription}

      editPrice={editPrice}
      setEditPrice={setEditPrice}

      handleEditSave={handleEditSave}
    />

    <ClearOrdersModal
      showClearOrdersModal={
        showClearOrdersModal
      }
      setShowClearOrdersModal={
        setShowClearOrdersModal
      }
      clearOrders={clearOrders}
    />

    <LoginFailedModal
      showLoginFailedModal={
        showLoginFailedModal
      }
      setShowLoginFailedModal={
        setShowLoginFailedModal
      }
    />

    <InvalidUpiModal
      showInvalidUpiModal={showInvalidUpiModal}
      setShowInvalidUpiModal={setShowInvalidUpiModal}
      expectedUpi={expectedUpi}
    />

    <SuccessPopup
      showSuccessPopup={showSuccessPopup}
      setShowSuccessPopup={setShowSuccessPopup}

      successMessage={successMessage}

      successSubText={successSubText}
    />

    </BrowserRouter>
  );
}

export default App;