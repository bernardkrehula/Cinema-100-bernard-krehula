import "./index.css";
import type { ReactNode } from 'react';

type BtnType = {
  variation?: string;
  size?: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: string | ReactNode;
  disabled?: boolean;
};

const Btn = ({
  variation,
  size,
  type = "button",
  onClick = () => {},
  children,
  disabled
}: BtnType) => {
  return (
    <button onClick={onClick} className={`btn ${variation} ${size}`} type={type} disabled={disabled} >
      {children}
    </button>
  );
};
export default Btn;