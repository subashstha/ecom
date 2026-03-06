import { useState } from "react";

const Input = ({
  label,
  id = "input",
  type = "text",
  placeholder = "Enter text",
  value: propValue,
  onChange: propOnChange,
}) => {
  const [value, setValue] = useState(propValue || "");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (propOnChange) {
      propOnChange(e);
    }
  };

  return (
    <div className="form-item w-full">
      {label && (
        <label
          htmlFor={id}
          className="block font-medium text-gray-900 cursor-pointer mb-2"
        >
          {label}
        </label>
      )}

      <div className="w-full">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={propValue !== undefined ? propValue : value}
          onChange={handleChange}
          className="block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150"
        />
      </div>
    </div>
  );
};

export default Input;
