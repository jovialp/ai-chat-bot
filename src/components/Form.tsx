"use client";

import { SyntheticEvent } from "react";
interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: SyntheticEvent) => void;
}
const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      {children}
    </form>
  );
};

export default Form;
