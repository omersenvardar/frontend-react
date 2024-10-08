import { useState } from "react";
import { ClockLoader } from "react-spinners";

const PrimaryButton = (props) => {
  const { title, onClick } = props;
  const [loading, setLoading] = useState(false);

  const internalOnClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <button
      className={`border-[4px] border border-white bg-green-500 rounded-xl text-white hover:border-green-500 ${
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

export default PrimaryButton;
