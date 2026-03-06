import { FaCheck } from "react-icons/fa6";

const Checkbox = ({ value, isChecked, onChange, children }) => (
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only"
      value={value}
      checked={isChecked}
      onChange={onChange}
    />
    <div
      className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors
        ${isChecked ? "bg-primary border-primary" : "border-gray-300 bg-white"}`}
    >
      {isChecked && <FaCheck className="text-white w-3 h-3" />}
    </div>
    <div className="ml-2">{children}</div>
  </label>
);

export default Checkbox;
