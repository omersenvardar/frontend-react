const MainHeader = (props) => {
  const { name } = props;
  return (
    <div
      className="w-full h-[60px] border-2 my-4 rounded-xl"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      }}
    >
      <div className="h-full flex flex-col justify-center">
        <div className="px-4 py-2">
          <p className="text-2xl font-bold">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
