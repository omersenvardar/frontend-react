import { useContext, useEffect, useState } from "react";
import HorizontalDividerLine from "../../components/dividers/HorizontalDividersLine";
import InputGroup from "../../components/inputs/InputGroup";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { getAllAddress } from "../../requests/UserRequests";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";
import { AppContext } from "../../context/AppContext";
import BaseTable from "../../tables/BaseTable";

const OrderScreen = () => {
  const navigate = useNavigate();
  const [addressList, setAddressList] = useState([]);
  const { userInformation } = useAuth();
  const [selectedAddress, setSeletctedAddress] = useState(null);
  const appContext = useContext(AppContext);
  const { cart, productList } = appContext;

  useEffect(() => {
    retrieveAndSetUserAdressList();
  }, []);

  useEffect(() => {
    if (addressList.length > 0) {
      setSeletctedAddress(addressList[0].id);
    }
  }, [addressList]);

  const retrieveAndSetUserAdressList = async () => {
    const token = localStorage.getItem("accessToken");
    const { data, err } = await getAllAddress(token, userInformation.id);
    if (err) {
      toast("Adres listesi yüklenirken bir hata oluştu");
      return;
    }
    setAddressList(data);
  };

  const handleSelectChange = (event) => {
    setSeletctedAddress(event.target.value);
  };

  const handlePaymentOnClik = () => {
    navigate("/paymentscreen");
  };

  const convertToFullCart = () => {
    const fullcart = [];
    for (const item of cart) {
      const foundproduct = productList.find(
        (product) => product.id === item.id
      );
      fullcart.push({
        ...foundproduct,
        count: item.count,
      });
    }
    return fullcart;
  };

  const RenderProductListTable = () => {
    return (
      <div>
        <BaseTable
          headerList={[
            { text: "Ürün" },
            { text: "Model Adı" },
            { text: "Tipi" },
            { text: "Adet" },
            { text: "Fiyat" },
          ]}
          dataList={convertToFullCart()}
          dataKeyList={[
            { key: "brand.name" },
            { key: "modelName" },
            { key: "whiteGoodType" },
            { key: "count" },
            { key: "price" },
          ]}
        />
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="w-[400px] h-[600px] bg-left-panel rounded-3xl">
        <div className="flex flex-col items-center p-4">
          <div className="w-[200px] mt-10 mb-5"></div>
          <div className="w-full">
            <HorizontalDividerLine color={"#ffffff"} />
          </div>
          <div>
            <InputGroup
              name="Adreslerim"
              type="select"
              onChange={handleSelectChange}
              value={selectedAddress}
              optionList={addressList.map((address) => {
                return { name: address.address, value: address.id };
              })}
            />
          </div>
          <RenderProductListTable />
          <PrimaryButton title={"Satın Al"} onClick={handlePaymentOnClik} />
        </div>
      </div>
    </div>
  );
};
export default OrderScreen;
