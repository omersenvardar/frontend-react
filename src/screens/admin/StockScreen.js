import { useEffect, useState } from "react";
import MainHeader from "../../components/headers/MainHeader";
import InputGroup from "../../components/inputs/InputGroup";
export default function StockScreen() {
  const [stockList, setStockList] = useState([]);

  return (
    <div className="w-full">
      <MainHeader name="Stok" />
      <div>
        <InputGroup
          type={"text"}
          value={stockList}
          placeholder={"stok gir"}
          onChange={(e) => {
            setStockList("username", e.target.value);
          }}
        />
      </div>
    </div>
  );
}
