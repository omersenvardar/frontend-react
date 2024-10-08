import { useContext, useEffect, useState } from "react";
import MiniCountCard from "../../cards/MiniCountCard";
import MainHeader from "../../components/headers/MainHeader";
import { toast } from "react-toastify";
import { getAllProducts } from "../../requests/UserRequests";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const DashboardScreen = () => {
  const appContext = useContext(AppContext);
  const { cart, setCart, productList } = appContext;
  let { type } = useParams();

  const addToCart = (product) => {
    const foundCart = cart.find((item) => item.id === product.id);
    if (foundCart) {
      foundCart.count = foundCart.count + 1;
    } else {
      cart.push({
        id: product.id,
        count: 1,
      });
    }
    setCart(cart);
  };

  const filterProductList = () => {
    if (type) {
      return productList.filter(
        (product) => product.whiteGoodType.toLowerCase() === type.toLowerCase()
      );
    }
    return productList;
  };

  const convertType = (type) => {
    if (type === "OVEN") return "FIRIN";
    else if (type === "FREEZER") return "BUZDOLABI";
    else if (type === "DISHWASHER") return "BULAŞIK MAKİNESİ";
    else if (type === "WASHING_MACHINE") return "ÇAMAŞIR MAKİNESİ";
    return type;
  };
  const convertMainHeader = (header) => {
    if (header === "/") return "Ana sayfa";
    else if (header === "/OVEN") return "Fırınlar";
    else if (header === "/FREEZER") return "Buzdolapları";
    else if (header === "/WASHING_MACHINE") return "Bulaşık Makinesi";
    else if (header === "/DISHWASHER") return "Çamaşır Makinesi";
    else if (header === "/editin-formations") return "Kullanıcı Bilgileri";
    return header;
  };
  return (
    <div className="w-full">
      <MainHeader name={convertMainHeader(window.location.pathname)} />
      <div className="flex flex-row flex-wrap gap-y-4">
        {filterProductList().map((product) => (
          <div className="w-1/3 flex flex-col">
            <div className="mx-4 flex flex-col">
              <MiniCountCard
                title={product.brand.name + " - " + product.modelName}
                energyType={"Enerji Tipi: " + product.energyType}
                whiteGoodsType={convertType(product.whiteGoodType)}
                price={`${product.price.toFixed(3)} TL`}
                img={product.image}
                backgroundColor={"bg-gray-200"}
                borderColor={"border-gray-800"}
                handleShoppingOnClick={() => {
                  addToCart(product);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardScreen;
