const BaseCard = (props) => {
  const { title } = props;
  return (
    <div
      className="bg-color-blue border p-5 rounded-xl"
      style={{
        boxShadow:
          "rgba(67, 255, 100, 0.85) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
      }}
    >
      <div className="border-b-2 my-2 min-h-[50px] h-full">
        <div className="">
          <div>{title}</div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default BaseCard;
