import { SyntheticEvent } from "react";

interface ToggleButtonProps {
  isChecked: boolean;
  handleChange: (e: SyntheticEvent) => void;
  firstLabel: string;
  secondLabel: string;
  disabled?: boolean;
}

const ToggleButton = ({
  isChecked,
  handleChange,
  firstLabel,
  secondLabel,
  disabled = false,
}: ToggleButtonProps) => {
  return (
    <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only"
        disabled={disabled}
      />
      <span className="label flex items-center text-sm font-medium text-black">
        {firstLabel}
      </span>
      <span
        className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
          isChecked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
        }`}
      >
        <span
          className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
            isChecked ? "translate-x-[28px]" : ""
          }`}
        ></span>
      </span>
      <span className="label flex items-center text-sm font-medium text-black">
        {secondLabel}
      </span>
    </label>
  );
};

export default ToggleButton;
