const HorizontalDividerLine = (props) => {
  const { color } = props;

  return <div className="h-[1px] w-full" style={{ background: color }}></div>;
};

export default HorizontalDividerLine;
