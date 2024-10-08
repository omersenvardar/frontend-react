import { useContext, useEffect, useState } from "react";
import InputGroup from "../../components/inputs/InputGroup";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { getAllAddress, createAddress } from "../../requests/UserRequests";
import { toast } from "react-toastify";
import { UserContext, useAuth } from "../../context/UserContext";
import { useApp } from "../../context/AppContext";
import BaseTable from "../../tables/BaseTable";
import BaseModal from "../../modals/BaseModals";
import CreateOrUpdateAddress from "../../components/addressinput/CreateOrUpdateAddress";

const EditInformation = () => {
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [district, setDistrict] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addressList, setAddressList] = useState(null);
  const { setUserInformation, userInformation, isAuthenticated } = useAuth();
  const { setAppState } = useApp();

  useEffect(() => {
    retrieveAndSetUserAdressList();
  }, []);

  const handleSaveAddressOnClik = async () => {
    const userId = userInformation.id;
    const token = localStorage.getItem("accessToken");
    const { data, err } = await createAddress(
      {
        userId,
        address,
        country,
        city,
        postCode,
        district,
      },
      token
    );
    if (err) {
      toast(" 🚫 Kayıt olurken bir hata oluştu.");
      return;
    }
    retrieveAndSetUserAdressList();
  };
  const retrieveAndSetUserAdressList = async () => {
    const token = localStorage.getItem("accessToken");
    const { data, err } = await getAllAddress(token, userInformation.id);
    if (err) {
      toast("Adres listesi yüklenirken bir hata oluştu");
      return;
    }
    setAddressList(data);
  };
  const handleAfterCreateOrUpdate = () => {
    setShowModal(false);
    retrieveAndSetUserAdressList();
  };
  const renderAddresstable = () => {
    return (
      <div>
        <BaseTable
          headerList={[
            { text: "Ülke" },
            { text: "Şehir" },
            { text: "ilce" },
            { text: "posta kodu" },
            { text: "adres" },
          ]}
          dataList={addressList}
          dataKeyList={[
            { key: "country" },
            { key: "city" },
            { key: "district" },
            { key: "postCode" },
            { key: "address" },
          ]}
          creatable={true}
          handleCreateOnClick={() => {
            setShowModal(true);
            setAddress(null);
          }}
          updatable={true}
          handleUpdateOnClick={(address) => {
            setShowModal(true);
            setAddress(address);
          }}
        />
      </div>
    );
  };
  const RenderCreateOrUpdateAddressModal = () => {
    return (
      <BaseModal
        modalIsOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <CreateOrUpdateAddress
          userId={userInformation.id}
          initialAddress={address}
          handleAfterCreateOrUpdate={handleAfterCreateOrUpdate}
        />
      </BaseModal>
    );
  };

  return (
    <>
      {RenderCreateOrUpdateAddressModal()}
      <div className="">{addressList ? renderAddresstable() : null}</div>
    </>
  );
};
export default EditInformation;
