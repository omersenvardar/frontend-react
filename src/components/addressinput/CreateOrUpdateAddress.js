import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputGroup from "../inputs/InputGroup";
import { Input } from "@material-tailwind/react";
import PrimaryButton from "../buttons/PrimaryButton";
import ApproveButton from "../buttons/ApproveButton";
import { createAddress, updateAddress } from "../../requests/UserRequests";

const CreateOrUpdateAddress = (props) => {
  const { userId, initialAddress, handleAfterCreateOrUpdate } = props;
  const [inputs, setInputs] = useState({
    address: "",
    country: "",
    city: "",
    postCode: "",
    district: "",
  });
  useEffect(() => {
    if (initialAddress) {
      setInputs({
        id: initialAddress.id,
        address: initialAddress.address,
        country: initialAddress.country,
        city: initialAddress.city,
        postCode: initialAddress.postCode,
        district: initialAddress.district,
      });
    }
  }, [initialAddress]);

  const handleOnChange = (key, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handleUpdateOnClick = async () => {
    const token = localStorage.getItem("accessToken");
    const { data, err } = await updateAddress({ ...inputs, userId }, token);
    if (err) {
      toast("🚫 Adres oluşturulurken bir hata oluştu");
      return;
    }
    handleAfterCreateOrUpdate(data);
  };

  const handleCreateOnClik = async () => {
    const token = localStorage.getItem("accessToken");
    const { data, err } = await createAddress({ ...inputs, userId }, token);
    if (err) {
      toast("🚫 Adres oluşturulurken bir hata oluştu");
      return;
    }
    handleAfterCreateOrUpdate(data);
  };
  return (
    <div className="w-full">
      <div className="my-2">
        <div className="font-bold">
          {inputs.id ? "Adres guncelle" : "Adres olustur"}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-200"></div>
      <div className="my-1">
        <div className="flex flex-row flex-wrap">
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="text"
                name="Ulke"
                value={inputs.country}
                onChange={(e) => handleOnChange("country", e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="text"
                name="Sehir"
                value={inputs.city}
                onChange={(e) => handleOnChange("city", e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="text" 
                name="Ilce"
                value={inputs.district}
                onChange={(e) => handleOnChange("district", e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="number"
                name="postCode"
                value={inputs.postCode}
                onChange={(e) => handleOnChange("postCode", e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mx-2">
              <InputGroup
                type="text"
                name="address"
                value={inputs.address}
                onChange={(e) => handleOnChange("address", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-1">
        <div className="flex flex-row justify-end">
          {inputs.id ? (
            <PrimaryButton title={"Guncelle"} onClick={handleUpdateOnClick} />
          ) : (
            <ApproveButton title={"Olustur"} onClick={handleCreateOnClik} />
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateOrUpdateAddress;
