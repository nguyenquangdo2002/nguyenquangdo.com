import { useEffect, useState } from "react";
import CheckAuth from "./components/common/check-auth";
import AdminLayout from "./components/admin-view/layout";
import AuthLayout from "./components/auth/layout";
import ShoppingLayout from "./components/shopping-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import UnauthPage from "./pages/unauth-page";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import LanguageSwitcher from "./components/common/LanguageSwitcher";
import Popup from "./pages/popup/popup";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());

  }, [dispatch])
  if (isLoading) return <Skeleton className="w-[500px] h-[500px] bg-black" />
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <h1> Header Components</h1> */}
      <div className="absolute top-6 right-30 z-50">
        {/* <LanguageSwitcher /> */}
      </div>
      <div>
        <Popup />
      </div>
      <Routes>

        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>

          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />


        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
