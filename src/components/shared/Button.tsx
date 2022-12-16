import type { FC } from "react";
import type { ButtonInterface } from "../../interfaces/interfaces";

const Button: FC<ButtonInterface> = ({
  children,
  className,
  type,
  icon,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      <div className="flex">
        {icon}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
