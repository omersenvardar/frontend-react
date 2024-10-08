import { useState } from "react";
import HorizontalDividerLine from "../../components/dividers/HorizontalDividersLine";
import InputGroup from "../../components/inputs/InputGroup";
import logo from "../../assets/UserIcon.png";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import {
  authenticateByUsernameAndPassword,
  createUser,
} from "../../requests/UserRequests";
import { toast } from "react-toastify";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setAppState } = useApp();
  const { setUserInformation } = useAuth();
  const navigate = useNavigate();

  const handleRegisterOnClick = async () => {
    const { data, err } = await createUser({
      email,
      name,
      lastName,
      phoneNumber,
      password,
    });
    if (err) {
      toast(" 🚫 Kayıt olurken bir hata oluştu.");
    } else {
      handleAfterSuccesfullRegister();
    }
  };
  const handleBackToLoginScreenOnClik = () => {
    navigate("/");
  };
  const handleAfterSuccesfullRegister = async () => {
    const { data, err } = await authenticateByUsernameAndPassword({
      email,
      password,
    });
    if (err) {
      toast(" 🚫 Hatalı kullanıcı adı veya şifre");
      return;
    }
    const { accessToken, refreshToken, user } = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUserInformation(user);
    setAppState("DASHBOARD");
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="w-[400px] h-[600px] bg-left-panel rounded-3xl">
        <div className="flex flex-col items-center p-4">
          <div className="w-[200px] mt-10 mb-5">
            <img className="w-full" src={logo} />
          </div>
          <div className="w-full">
            <HorizontalDividerLine color={"#ffffff"} />
          </div>
          <InputGroup
            type={"text"}
            value={name}
            placeholder={"Isim"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputGroup
            type={"text"}
            value={lastName}
            placeholder={"Soyisim"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputGroup
            type={"text"}
            value={email}
            placeholder={"Email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputGroup
            type={"password"}
            value={password}
            placeholder={"Şifre"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputGroup
            type={"text"}
            value={phoneNumber}
            placeholder={"Telefon numarası"}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <PrimaryButton title={"Kayıt ol"} onClick={handleRegisterOnClick} />
          <PrimaryButton
            title={"Geri Don"}
            onClick={handleBackToLoginScreenOnClik}
          />
        </div>
      </div>
    </div>
  );
};
export default RegisterScreen;
