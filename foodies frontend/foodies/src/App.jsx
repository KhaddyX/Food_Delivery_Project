import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useContext } from "react";

import ForgotPassword from "./pages/ForgotPassword/forgotpassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import LandingPage from "./pages/LandingPage/LandingPage";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import ExploreFood from "./pages/ExploreFood/ExploreFood";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Register from "./components/Register/Register";
import { StoreContext } from "./context/StoreContext";
import Menubar from "./components/Menubar/Menubar";
import MyOrders from "./pages/MyOrders/MyOrders";
import Contact from "./pages/Contact/Contact";
import Login from "./components/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";


const App = () => {
  const { token } = useContext(StoreContext);
  return (
    <div>
      <Menubar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={token ? <PlaceOrder /> : <Login />} />
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/register" element={token ? <Home /> : <Register />} />
        <Route path="/myorders" element={token ? <MyOrders /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /></Routes>
    </div>
  );
};

// export default App;
//    </div>
//   );
// };

export default App;

