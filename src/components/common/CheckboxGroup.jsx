import Checkbox from "./Checkbox";

const CheckboxGroup = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
  renderLabel,
}) => {
  const handleChange = (e) => {
    const { value, checked } = e.target;
    setSelectedValues(
      checked
        ? [...selectedValues, value]
        : selectedValues.filter((v) => v !== value),
    );
  };

  return (
    <div className="mb-8 border-b border-b-light pb-5 last:mb-0 last:border-0 last:pb-0">
      <h2 className="mb-5 text-2xl font-semibold">{label}</h2>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const stringValue = option?.toString() || "";
          return (
            <Checkbox
              key={stringValue}
              value={stringValue}
              isChecked={selectedValues.includes(stringValue)}
              onChange={handleChange}
            >
              {renderLabel ? (
                renderLabel(option)
              ) : (
                <span className="text-gray-700 font-medium capitalize">
                  {option}
                </span>
              )}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxGroup;
