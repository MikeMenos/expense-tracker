import { FC } from "react";
import { ButtonInterface } from "../../interfaces/interfaces";

const Button: FC<ButtonInterface> = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
