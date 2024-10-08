import { useState } from "react";
import { ClockLoader } from "react-spinners";

const ButtonLikeLink = (props) => {
  const { title, onClick } = props;
  const [loading, setLoading] = useState(false);

  const internalOnClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  return (
    <button
      className={`text-blue-500 hover:text-black-200 ${
        loading ? "" : ""
      } transition duration -300`}
      onClick={internalOnClick}
    >
      {loading ? (
        <div className="flex justify-center align-center -py-2 px-4">
          <ClockLoader color="#ffffff" size={25} />
        </div>
      ) : (
        <p className="py-2 px-4 mb-1">{title}</p>
      )}
    </button>
  );
};

export default ButtonLikeLink;
