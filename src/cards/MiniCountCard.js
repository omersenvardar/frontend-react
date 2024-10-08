import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const MiniCountCard = (props) => {
  const {
    title,
    price,
    energyType,
    whiteGoodsType,
    textList,
    icon,
    img,
    backgroundColor,
    borderColor,
    handleShoppingOnClick,
  } = props;

  return (
    <div
      className={`${backgroundColor} ${borderColor} min-h-[350px] min-w-[200px] border rounded-lg p-3 text-black`}
      style={{
        boxShadow:
          "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
      }}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-row justify-between border-b-2 border-black">
          <div className="flex-1 flex flex-col">
            <div className="">
              <p className="text-xl font-bold">{title}</p>
              <p className="text-l">{energyType}</p>
              <p className="text-l">{whiteGoodsType}</p>
            </div>
          </div>
          <div className="cursor-pointer" onClick={handleShoppingOnClick}>
            <ShoppingCartIcon className="h-5 w-5" />
          </div>
        </div>
        {price ? (
          <div className="flex flex-row justify-between">
            <div>
              <img src={img}></img>
              <p className="text-xl">{price}</p>
            </div>
            <div></div>
          </div>
        ) : null}
        {textList ? (
          <div className="flex flex-row justify-between flex-wrap">
            {textList.map((text) => (
              <div className="m-auto">
                <p className="text-base">{text}</p>
              </div>
            ))}
            <div>{icon}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MiniCountCard;
