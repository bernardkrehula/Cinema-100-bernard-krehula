import "./index.css";

type InputType = {
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};
//Dodati variation umjesto className
const Input = ({
  type = "text",
  value = "",
  placeholder = "Enter task",
  onChange = () => {},
  className = "",
}: InputType) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
export default Input;