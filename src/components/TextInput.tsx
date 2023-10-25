interface TextInputProps {
  labelName: string;
  labelClassName?: string;
  name: string;
  inputClassName?: string;
  required?: boolean;
  children?: React.ReactNode;
}

const TextInput = ({
  labelName,
  labelClassName = "",
  name,
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
        />
        {children ? children : <></>}
        {/* <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon"
            style={{
              width: "1em",
              height: "1em",
              verticalAlign: "middle",
              fill: "currentColor",
              overflow: "hidden",
            }}
            viewBox="0 0 1024 1024"
            version="1.1"
          >
            <path d="M0 950.857143l1024-438.857143L0 73.142857v341.333333l731.428571 97.52381-731.428571 97.52381z" />
          </svg>
        </button> */}
      </div>
    </>
  );
};

export default TextInput;
