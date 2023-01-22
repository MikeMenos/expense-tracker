import type { FC } from "react";
import type { InputInterface } from "../../interfaces/interfaces";

const Input: FC<InputInterface> = ({
  type,
  name,
  placeholder,
  value,
  className,
  style,
  onChange,
  icon,
  required,
  closeIcon,
}) => {
  return (
    <div className="relative flex items-center">
      <i className="absolute pl-1">{icon}</i>
      {value && <i className="absolute right-0 pr-2">{closeIcon}</i>}
      <input
        type={type}
        name={name}
        placeholder={`${placeholder} ${required ? "*" : ""}`}
        value={value}
        onChange={onChange}
        className={className}
        style={style}
        required={required}
        min={0}
      />
    </div>
  );
};

export default Input;
