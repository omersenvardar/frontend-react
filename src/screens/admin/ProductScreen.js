import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "../../requests/UserRequests";
import BaseTable from "../../tables/BaseTable";
import MainHeader from "../../components/headers/MainHeader";
import BaseModal from "../../modals/BaseModals";
import CreateOrUpdateProduct from "../../components/createorupdate/CreateOrUpdateProduct";
import { UserContext } from "../../context/UserContext";

export default function ProductScreen() {
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const userContext = useContext(UserContext);
  const { userInformation } = userContext;

  const convertType = (type) => {
    if (type === "OVEN") return "FIRIN";
    if (type === "FREEZER") return "BUZDOLABI";
    if (type === "DISHWASHER") return "BULAŞIK MAKİNESİ";
    if (type === "WASHING_MACHINE") return "ÇAMAŞIR MAKİNESİ";
    return type;
  };
  useEffect(() => {
    retrieveAndSetProductList();
  }, []);

  const retrieveAndSetProductList = async () => {
    const token = localStorage.getItem("accessToken");
    const { data, err } = await getAllProducts(token);
    if (err) {
      toast("Ürün listesi yüklenirken bir hata oluştu");
      return;
    }
    for (let i = 0; i < data.length; i++) {
      data[i].whiteGoodType = convertType(data[i].whiteGoodType);
    }
    setProductList(data);
  };

  const handleAfterCreateOrUpdate = () => {
    setShowModal(false);
    retrieveAndSetProductList();
  };

  const RenderTableData = () => {
    return (
      <div>
        <BaseTable
          headerList={[
            { text: "marka adi" },
            { text: "model adi" },
            { text: "tipi" },
            { text: "enerji tipi" },
            { text: "fiyat" },
          ]}
          dataList={productList}
          dataKeyList={[
            { key: "brand.name" },
            { key: "modelName" },
            { key: "whiteGoodType" },
            { key: "energyType" },
            { key: "price" },
          ]}
          creatable={true}
          handleCreateOnClick={() => {
            setShowModal(true);
            setSelectedProduct(null);
          }}
          uptable={true}
          handleUpdateOnClick={(product) => {
            setShowModal(true);
            setSelectedProduct(product);
          }}
        />
      </div>
    );
  };
  const RenderCreateOrUpdateProductModal = () => {
    return (
      <BaseModal
        modalIsOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <CreateOrUpdateProduct
          initialProduct={selectedProduct}
          ProductId={userInformation.ProductId}
          handleAfterCreateOrUpdate={handleAfterCreateOrUpdate}
        />
      </BaseModal>
    );
  };

  return (
    <>
      {RenderCreateOrUpdateProductModal()}
      <div className="w-full">
        <MainHeader name="Ürünler" />
        <div>
          <RenderTableData />
        </div>
      </div>
    </>
  );
}
