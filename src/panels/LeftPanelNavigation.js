import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import logo from "../assets/bilgeAdamLogo.png";
// import { IoChevronDownOutline } from "react-icons/io5";

const LeftPanelNavigation = (props) => {
  const navigate = useNavigate();
  const { handleLogout, userInformation } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const RenderHeaderItem = (name, index, navigateTo) => {
    return (
      <div
        className={`${
          index === selectedIndex
            ? "bg-gray-800 bg-left-panel-selected text-white font-bold"
            : ""
        } px-4 py-2 transition-all duration-500 cursor-pointer rounded-xl my-2`}
        onClick={() => {
          setSelectedIndex(index);
          navigate(navigateTo);
        }}
      >
        <p>{name}</p>
      </div>
    );
  };

  const RenderLeftPanelOptionList = () => {
    if (!userInformation) return;
    switch (userInformation.role) {
      case "USER":
        return (
          <div className="flex flex-col">
            {RenderHeaderItem("Ana sayfa", 0, "/")}
            {RenderHeaderItem("Buzdolapları", 1, "/FREEZER")}
            {RenderHeaderItem("Çamaşır makineleri", 2, "/WASHING_MACHINE")}
            {RenderHeaderItem("Bulaşık makineleri", 3, "/DISHWASHER")}
            {RenderHeaderItem("Fırınlar", 4, "/OVEN")}
          </div>
        );
      case "ADMIN":
        return (
          <div>
            {RenderHeaderItem("Ana sayfa", 0, "/")}
            {RenderHeaderItem("Ürünler", 1, "/products")}
            {RenderHeaderItem("Stoklar", 2, "/stocks")}
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white-400 bg-left-panel text-black min-w-[250px] rounded-l-3xl">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[200px] mt-2">
            <img
              className="w-full cursor-pointer"
              src={logo}
              alt="Online Alışveriş"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex flex-col justify-center items-center">
            <div>
              {userInformation.name} {userInformation.lastName}
            </div>
            <div>Hoş geldin!</div>
          </div>
        </div>
      </div>
      <div className="h-[1px] my-2 w-full flex flex-col justify-center items-center border-b border-b-black"></div>
      <div className="px-4 py-1 my-1 overflow-y-auto">
        <div className="flex-1 flex flex-col ">
          <div className="">
            <div className="flex-1 flex flex-col justify-between">
              {RenderLeftPanelOptionList()}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] my-2 w-full flex flex-col justify-center items-center border-b border-b-black"></div>
      <div className="px-4 py-1 my-1">
        <div className="h-full" onClick={handleLogout}>
          {RenderHeaderItem("Çıkış yap", -1, "/")}
        </div>
      </div>
    </div>
  );
};

export default LeftPanelNavigation;
