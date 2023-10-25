interface FormProps {
  children: React.ReactNode;
}
const Form = ({ children }: FormProps) => {
  return <form>{children}</form>;
};

export default Form;
