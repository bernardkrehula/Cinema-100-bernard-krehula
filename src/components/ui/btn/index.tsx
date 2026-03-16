import "./index.css";
import type { ReactNode } from 'react';

type BtnType = {
  variation?: string;
  size?: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: string | ReactNode;
};

const Btn = ({
  variation,
  size,
  type = "button",
  onClick = () => {},
  children
}: BtnType) => {
  return (
    <button className={`btn ${variation} ${size}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
export default Btn;