import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductPage from "./pages/ProductPage";
import SingleProduct from "./pages/SingleProduct";
import MyAccount from "./pages/MyAccount";
import Trades from "./pages/Trades";
import Fundings from "./pages/Fundings";
import Crypto from "./pages/Crypto";
import CryptoPage from "./pages/CryptoPage";
// import SingleCrypto from "./pages/SingleCrypto";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Settings from "./pages/Settings";
import { SingleCryptoPage } from "./pages/SingleCrypto";
import AdminProducts from "./pages/AdminProducts";

//
// {!auth.token ? (
//   <Route path="*" element={<Login />} />
//   ) : (
//     <>
//       <Route path="/" element={<Home />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/products/:productId" element={<SingleProduct />} />
//       <Route path="/cart" element={<Cart />} />
//     </>
//   )}

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Lösa tilgång här login läge */}

        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/myaccount" element={<MyAccount />}></Route>
        <Route path="/trades" element={<Trades />}></Route>
        <Route path="/fundings" element={<Fundings />}></Route>

        <Route path="/products" element={<ProductPage />}></Route>
        <Route path="/products/:id" element={<SingleProduct />}></Route>

        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route path="/adminproducts" element={<AdminProducts />}></Route>

        <Route path="/settings" element={<Settings />}></Route>

        <Route path="/crypto" element={<Crypto />}></Route>

        {/* This should be replaced with /crypto when done */}
        <Route path="/cryptopage" element={<CryptoPage />}></Route>
        {/* <Route path="/cryptopage/:id" element={<SingleCrypto />}></Route> */}
        {/* <Route path="/crypto/:id" element={<SingleCryptoPage />}></Route> */}
        <Route path="/crypto/:id" element={<SingleCryptoPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
