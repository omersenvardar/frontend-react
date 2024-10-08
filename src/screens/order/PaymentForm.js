import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import InputGroup from "../../components/inputs/InputGroup";

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handlePaymentOnClick = () => {};
  const handleInputChange = (evt) => {
    const { value } = evt.target;

    setState((prev) => ({ ...prev, number: value }));
  };
  const handleInputNameChange = (evt) => {
    const { value } = evt.target;

    setState((prev) => ({ ...prev, name: value }));
  };
  const handleInputCvcChange = (evt) => {
    const { value } = evt.target;

    setState((prev) => ({ ...prev, cvc: value }));
  };
  const handleInputExpiryChange = (evt) => {
    const { value } = evt.target;

    setState((prev) => ({ ...prev, expiry: value }));
  };

  const handleInputFocus = (value) => {
    setState((prev) => ({ ...prev, focus: value }));
  };

  return (
    <>
      <div className="h-[40px]"></div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center items-center gap-x-10 my-5">
          <div className="flex flex-col space-y-5">
            <InputGroup
              className="border-b-2 p-2"
              type="text"
              name=""
              placeholder="Kart Numarası"
              value={state.number}
              onChange={handleInputChange}
              onFocus={() => {
                handleInputFocus("number");
              }}
              maxlength={19}
            />
            <InputGroup
              className="border-b-2 p-2"
              type="text"
              name=""
              placeholder="Ad Soyad"
              value={state.name}
              onChange={handleInputNameChange}
              onFocus={() => {
                handleInputFocus("name");
              }}
            />
            <InputGroup
              className="border-b-2 p-2"
              type="number"
              name=""
              placeholder=".../..."
              value={state.expiry}
              onChange={handleInputExpiryChange}
              onFocus={() => {
                handleInputFocus("expiry");
              }}
            />
            <InputGroup
              className="border-b-2 p-2"
              type="number"
              name=""
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputCvcChange}
              onFocus={() => {
                handleInputFocus("cvc");
              }}
            />
          </div>
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
            acceptedCards={["visa", "mastercard", "maestro"]}
            placeholders={{ name: "AD SOYAD" }}
          />
        </div>

        <div className="mt-5">
          <PrimaryButton title={"Öde"} onClick={handlePaymentOnClick} />
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
