import ApproveButton from "../components/buttons/ApproveButton";
import PrimaryButton from "../components/buttons/PrimaryButton";

const BaseTable = (props) => {
  const {
    headerList,
    dataList,
    dataKeyList,
    creatable,
    handleCreateOnClick,
    updatable,
    handleUpdateOnClick,
  } = props;
  return (
    <>
      {creatable ? (
        <div className="my-2">
          <div className="flex flex-row justify-end">
            <ApproveButton
              title="Oluştur"
              onClick={() => {
                handleCreateOnClick();
              }}
            />
          </div>
        </div>
      ) : null}
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs uppercase bg-left-panel text-text-color">
          <tr>
            {headerList.map((header, key) => {
              return (
                <th key={key} scope="col" className="px-6 py-3">
                  {header.text}
                </th>
              );
            })}
            {updatable ? <th></th> : null}
          </tr>
        </thead>
        <tbody>
          {dataList.map((data, key) => (
            <tr key={key} className="bg-white border-b">
              {dataKeyList.map((dataKey, key) => {
                if (dataKey.key.includes(".")) {
                  return (
                    <td key={key} className="px-6 py-4">
                      {
                        data[dataKey.key.split(".")[0]][
                          dataKey.key.split(".")[1]
                        ]
                      }
                    </td>
                  );
                } else {
                  return (
                    <td key={key} className="px-6 py-4">
                      {data[dataKey.key]}
                    </td>
                  );
                }
              })}
              {updatable ? (
                <td>
                  <PrimaryButton
                    title={"Güncelle"}
                    onClick={() => {
                      handleUpdateOnClick(data);
                    }}
                  />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BaseTable;
