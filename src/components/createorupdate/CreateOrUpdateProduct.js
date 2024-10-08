import { useEffect, useState } from "react";
import InputGroup from "../inputs/InputGroup";
import PrimaryButton from "../buttons/PrimaryButton";
import ApproveButton from "../buttons/ApproveButton";
import { toast } from "react-toastify";
import { createProduct } from "../../requests/UserRequests";

const CreateOrUpdateProduct = (props) => {
  const { initialProduct, productId, handleAfterCreateOrUpdate } = props;
  const [inputs, setInputs] = useState({
    price: "",
    productName: "",
    modelName: "",
    categoryType: "",
    energyType: "",
    productId: productId,
    whiteGoodType: "",
  });

  useEffect(() => {
    if (initialProduct) {
      setInputs({
        price: initialProduct.price,
        productName: initialProduct.productName,
        modelName: initialProduct.modelName,
        categoryType: initialProduct.categoryType,
        energyType: initialProduct.energyType,
        productId: productId,
        whiteGoodType: initialProduct.whiteGoodType,
      });
    }
  }, [initialProduct]);

  const handleOnChange = (key, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handleUpdateOnClick = async () => {
    handleAfterCreateOrUpdate();
  };

  const handleCreateOnClick = async () => {
    const token = localStorage.getItem("accessToken");
    const { data, err } = await createProduct(inputs, token);
    if (err) {
      toast(" 🚫 Ürün oluşturulurken bir hata oluştu");
      return;
    }
    handleAfterCreateOrUpdate(data);
  };

  return (
    <div className="w-full">
      <div className="my-2">
        <div className="font-bold">
          {inputs.price ? "Ürün güncelle" : "Ürün oluştur"}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-200"></div>
      <div className="my-1">
        <div className="flex flex-row flex-wrap">
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="text"
                name="Fiyat"
                value={inputs.price}
                onChange={(e) => handleOnChange("price", e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="text"
                name="Ürün Adı"
                value={inputs.productName}
                onChange={(e) => handleOnChange("productName", e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="text"
                name="Model Adı"
                value={inputs.modelName}
                onChange={(e) => handleOnChange("modelName", e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="text"
                name="Kategori"
                value={inputs.categoryType}
                onChange={(e) => handleOnChange("categoryType", e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="select"
                name="Enerji Türü"
                value={inputs.energyType}
                onChange={(e) => handleOnChange("energyType", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-1">
        <div className="flex flex-row justify-end">
          {inputs.kullanici_id ? (
            <PrimaryButton title={"Güncelle"} onClick={handleUpdateOnClick} />
          ) : (
            <ApproveButton title={"Oluştur"} onClick={handleCreateOnClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateProduct;
