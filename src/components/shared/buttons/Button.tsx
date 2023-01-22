import type { FC } from "react";
import type { ButtonInterface } from "../../../interfaces/interfaces";

const Button: FC<ButtonInterface> = ({
  children,
  className,
  type,
  icon,
  onClick,
  disabled,
  onlyIcon,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      <div className={`flex items-center ${onlyIcon ? "gap-0" : "gap-2"}`}>
        {icon}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
