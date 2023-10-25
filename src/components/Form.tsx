"use client";
interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
}
const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
