import { useState } from "react";
import { ClockLoader } from "react-spinners";

const ApproveButton = (props) => {
  const { title, onClick } = props;
  const [loading, setLoading] = useState(false);

  const internalOnClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <button
      className={`border-[4px] border border-blue-500 bg-approve-button rounded-xl text-blue-500 hover:border-approve-button ${
        loading ? "" : ""
      } transition duration-300`}
      onClick={internalOnClick}
    >
      {loading ? (
        <div className="flex justify-center align-center py-2 px-4">
          <ClockLoader color="#ffffff" size={25} />
        </div>
      ) : (
        <p className="py-2 px-4">{title}</p>
      )}
    </button>
  );
};

export default ApproveButton;
