import { FiPlus, FiMinus } from "react-icons/fi";

const ProductCounter = ({ quantity = 1, min = 1, max = 99, onChange }) => {
  const handleIncrement = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < min) value = min;
    if (value > max) value = max;
    onChange(value);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleDecrement}
        className="w-10 h-10 inline-flex items-center justify-center bg-gray-200 rounded text-lg font-bold disabled:opacity-50 transition-all hover:bg-primary hover:text-white cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:text-gray-500"
        disabled={quantity <= min}
      >
        <FiMinus size={20} />
      </button>

      <input
        type="number"
        className="w-14 text-center rounded border border-light h-10 px-1 outline-none"
        value={quantity}
        onChange={handleInputChange}
      />

      <button
        onClick={handleIncrement}
        className="w-10 h-10 inline-flex items-center justify-center bg-gray-200 rounded text-lg font-bold disabled:opacity-50 transition-all hover:bg-primary hover:text-white cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:text-gray-500"
        disabled={quantity >= max}
      >
        <FiPlus size={20} />
      </button>
    </div>
  );
};

export default ProductCounter;
