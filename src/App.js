import { useEffect } from "react";
import { useAuth } from "./context/UserContext";
import { useApp } from "./context/AppContext";
import { authenticateByParams, getAllProducts } from "./requests/UserRequests";
import { toast } from "react-toastify";

const App = (props) => {
  const { userInformation, setUserInformation } = useAuth();
  const { appState, setAppState, setProductList, cart, setCart } = useApp();

  // useEffect(() => {
  //   const localCart = localStorage.getItem("cart");
  //   console.log(localCart);
  //   setCart(localCart);
  // }, [appState]);

  useEffect(() => {
    if (appState === "DASHBOARD") {
      retrieveAndSetProductList();
    }
  }, [appState]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) {
      setAppState("LOGIN_REQUIRED");
    } else {
      authenticateAndSetUserByParams(accessToken, refreshToken);
    }
  }, []);

  useEffect(() => {
    if (userInformation) return;
    if (appState === "DASHBOARD") {
      setAppState("LOGIN_REQUIRED");
    }
  }, [appState, userInformation]);

  const retrieveAndSetProductList = async () => {
    const token = localStorage.getItem("accessToken");
    const { data, err } = await getAllProducts(token);
    if (err) {
      toast("Ürün listesi yüklenirken bir hata oluştu");
      return;
    }
    setProductList(data);
  };

  const authenticateAndSetUserByParams = async (
    oldAccessToken,
    oldRefreshToken
  ) => {
    const { data, err } = await authenticateByParams({
      accessToken: oldAccessToken,
      refreshToken: oldRefreshToken,
    });
    if (err) {
      toast(" 🚫 Tekrar giriş yapmanız gerekmektedir");
      setAppState("LOGIN_REQUIRED");
      return;
    }
    const { accessToken, refreshToken, user } = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUserInformation(user);
    setAppState("DASHBOARD");
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default App;
