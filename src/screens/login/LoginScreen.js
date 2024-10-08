import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";
import InputGroup from "../../components/inputs/InputGroup";
import HorizontalDividerLine from "../../components/dividers/HorizontalDividersLine";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import logo from "../../assets/bilgeAdamLogo.png";
import { authenticateByUsernameAndPassword } from "../../requests/UserRequests";
import ApproveButton from "../../components/buttons/ApproveButton";
import { useNavigate } from "react-router-dom";
import ButtonLikeLink from "../../components/buttons/ButtonLikeLink";

const LoginScreen = () => {
  const { setAppState } = useApp();
  const { setUserInformation } = useAuth();
  const [username, setUsername] = useState("kaan@genixo.ai");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();

  const handleOnChange = (key, value) => {
    if (key === "username") {
      setUsername(value);
    } else if (key === "password") {
      setPassword(value);
    }
  };

  const handleLoginOnClick = async () => {
    const { data, err } = await authenticateByUsernameAndPassword({
      email: username,
      password,
    });
    if (err) {
      toast(" 🚫 Hatalı kullanıcı adı veya şifre");
      return;
    }
    toast(" 👌 Giriş başarılı");
    const { accessToken, refreshToken, user } = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUserInformation(user);
    setAppState("DASHBOARD");
  };
  const handleKeyPress = (e) => {
    e.preventDefault();
    console.log("Giriş yapıldı:", username);
  };

  const handleRegisterOnClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="w-[400px] h-[600px] bg-left-panel rounded-3xl">
        <div className="flex flex-col items-center p-4">
          <div className="w-[200px] mt-10 mb-5">
            <img className="w-full" src={logo} />
          </div>
          <div className="w-full mb-5">
            <HorizontalDividerLine color={"#ffffff"} />
          </div>
          <InputGroup
            type={"text"}
            value={username}
            placeholder={"Kullanıcı adı"}
            onChange={(e) => {
              handleOnChange("username", e.target.value);
            }}
          />
          <InputGroup
            type={"password"}
            value={password}
            placeholder={"Şifre"}
            onChange={(e) => {
              handleOnChange("password", e.target.value);
            }}
          />
          <div className="w-full mt-2">
            <ButtonLikeLink
              title={"Kayıt Ol"}
              onClick={handleRegisterOnClick}
            />
          </div>
          <div className="mt-5">
            <PrimaryButton title={"Giriş Yap"} onClick={handleLoginOnClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
