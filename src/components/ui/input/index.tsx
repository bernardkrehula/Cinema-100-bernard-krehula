import type { InputType } from "#/types/ui.types.ts/InputType";
import "./index.css";

const Input = ({
  type = "text",
  value = "",
  placeholder = "",
  onChange = () => {},
  variaton = "",
  name,
}: InputType) => {
  return (
    <input
      name={name}
      className={variaton}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
export default Input;
