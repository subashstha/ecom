import { ChevronDownIcon } from "lucide-react";

const SelectDropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className="relative grid">
        <select
          value={value}
          onChange={onChange}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-9 pl-3 outline-1 -outline-offset-1 outline-black/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, idx) => (
            <option key={idx} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400"
        />
      </div>
    </div>
  );
};

export default SelectDropdown;
