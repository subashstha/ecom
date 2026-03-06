import * as Slider from "@radix-ui/react-slider";

const PriceSlider = ({ values, setValues, min, max, step }) => (
  <div className="mb-8 border-b border-b-light pb-5">
    <h2 className="mb-5 text-2xl font-semibold">Price</h2>
    <Slider.Root
      value={values}
      onValueChange={setValues}
      min={min}
      max={max}
      step={step}
      className="relative flex items-center w-full h-6"
    >
      <Slider.Track className="bg-light-gray relative flex-1 rounded h-2.5 ml-1">
        <Slider.Range className="bg-primary absolute h-full rounded" />
      </Slider.Track>
      <Slider.Thumb
        className="w-5 h-5 focus:outline-none bg-white rounded-full block"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}
      />
      <Slider.Thumb
        className="w-5 h-5 focus:outline-none bg-white rounded-full block"
        style={{ boxShadow: "0 0 20px rgba(0,0,0,0.2)" }}
      />
    </Slider.Root>
    <div className="mt-5 text-sm font-medium text-gray-700">
      Price: ${values[0]} - ${values[1]}
    </div>
  </div>
);

export default PriceSlider;
