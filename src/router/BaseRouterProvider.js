import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useApp } from "../context/AppContext";
import LoginScreen from "../screens/login/LoginScreen";
import { ClimbingBoxLoader } from "react-spinners";
import { useAuth } from "../context/UserContext";
import logo from "../assets/bilgeAdamLogo.png";
import DashboardScreen from "../screens/user/DashboardScreen";
import LeftPanelNavigation from "../panels/LeftPanelNavigation";
import StockScreen from "../screens/admin/StockScreen";
import ProductScreen from "../screens/admin/ProductScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import { NavbarDark } from "../components/navbars/Navbar";
import OrderScreen from "../screens/order/OrderScreen";
import PaymentForm from "../screens/order/PaymentForm";
import { FooterWithSocialLinks } from "../components/footer/Footer";
import EditInformation from "../screens/user/EditInformation";

const BaseRouterProvider = () => {
  const { appState } = useApp();
  const { userInformation } = useAuth();

  if (appState === "INITIALIZED") {
    return (
      <div className="h-screen">
        <div className="h-full flex flex-row justify-center items-center">
          <div className="rotate-180">
            <ClimbingBoxLoader color="#fd8500" size={20} />
          </div>
          <div className="w-[300px]">
            <img className="w-full" src={logo} />
          </div>
          <ClimbingBoxLoader color="#fd8500" size={20} />
        </div>
      </div>
    );
  } else if (appState === "LOGIN_REQUIRED") {
    return (
      <BrowserRouter>
        <div className="flex flex-row h-full px-4 py-12">
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/signup" element={<RegisterScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  } else if (appState === "DASHBOARD") {
    if (!userInformation) return;
    switch (userInformation.role) {
      case "USER":
        return (
          <BrowserRouter>
            <NavbarDark />
            <div className="h-full mx-auto container bg-left-panel-selected">
              <div className="w-full m-auto flex flex-row h-full">
                <LeftPanelNavigation />
                <div className="p-5 bg-gray-200 w-full rounded-r-3xl overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<DashboardScreen />} />
                    <Route path="/:type" element={<DashboardScreen />} />
                    <Route path="/orders" element={<OrderScreen />} />
                    <Route path="/paymentscreen" element={<PaymentForm />} />
                    <Route
                      path="/edit-informations"
                      element={<EditInformation />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
            <FooterWithSocialLinks />
          </BrowserRouter>
        );
      case "ADMIN":
        return (
          <BrowserRouter>
            <NavbarDark />
            <div className="h-full mx-auto container bg-left-panel-selected">
              <div className="w-full m-auto flex flex-row h-full">
                <LeftPanelNavigation />
                <div className="p-5 bg-gray-200 w-full rounded-r-3xl overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<DashboardScreen />} />
                    <Route path="/stocks" element={<StockScreen />} />
                    <Route path="/products" element={<ProductScreen />} />
                  </Routes>
                </div>
              </div>
            </div>
            <FooterWithSocialLinks />
          </BrowserRouter>
        );
    }
  }
};

export default BaseRouterProvider;
