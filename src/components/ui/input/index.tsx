import type { InputType } from "#/types/ui.types.ts/InputType";
import "./index.css";

const Input = ({
  type = "text",
  placeholder = "",
  variaton = "",
  name,
}: InputType) => {
  return (
    <input
      name={name}
      className={variaton}
      type={type}
      placeholder={placeholder}
    />
  );
};
export default Input;
