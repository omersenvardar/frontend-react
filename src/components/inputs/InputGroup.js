const InputGroup = (props) => {
  const {
    type,
    name,
    value,
    placeholder,
    onChange,
    optionList,
    onFocus,
    number,
  } = props;

  const constructOptionList = () => {
    return optionList.map((option) => (
      <option value={option.value}>{option.name}</option>
    ));
  };

  if (type === "text" || type === "number") {
    return (
      <div className="w-full my-2">
        <div>
          <p>{name}</p>
        </div>
        <input
          className="w-full px-4 py-2 rounded-lg border"
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onFocus={onFocus}
          name={name}
        />
      </div>
    );
  } else if (type === "password") {
    return (
      <div className="w-full my-2">
        <div>
          <p>{name}</p>
        </div>
        <input
          className="w-full px-4 py-2 rounded-lg border"
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="w-full my-2">
        <div>
          <p>{name}</p>
        </div>
        <select
          className="w-full px-4 py-2 rounded-lg border"
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        >
          {constructOptionList()}
        </select>
      </div>
    );
  }
};

export default InputGroup;
