import { SyntheticEvent } from "react";
interface TextInputProps {
  labelName: string;
  labelClassName?: string;
  name: string;
  value: string;
  handleChange: (e: SyntheticEvent) => void;
  inputClassName?: string;
  required?: boolean;
  children?: React.ReactNode;
}

const TextInput = ({
  labelName,
  labelClassName = "",
  name,
  value,
  handleChange,
  inputClassName,
  required = false,
  children,
}: TextInputProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className={
          "mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white " +
          labelClassName
        }
      >
        {labelName}
      </label>
      <div className="relative">
        <input
          type="text"
          id={name}
          className={
            "block w-full p-4 pr-14 text-sm text-gray-900 focus:outline-none rounded-lg bg-white shadow-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" +
            inputClassName
          }
          placeholder={labelName}
          name={name}
          required={required}
          value={value}
          onChange={handleChange}
        />
        {children ? children : <></>}
      </div>
    </>
  );
};

export default TextInput;
