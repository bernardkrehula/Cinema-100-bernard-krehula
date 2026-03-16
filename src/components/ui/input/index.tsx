import "./index.css";

type InputType = {
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variaton?: string;
};
//Dodati variation umjesto className
const Input = ({
  type = "text",
  value = "",
  placeholder = "",
  onChange = () => {},
  variaton = "",
}: InputType) => {
  return (
    <input
      className={variaton}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
export default Input;