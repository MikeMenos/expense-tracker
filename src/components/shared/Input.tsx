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
}) => {
  return (
    <>
      <i className="absolute pl-1">{icon}</i>
      <input
        type={type}
        name={name}
        placeholder={`${placeholder} ${required ? "*" : ""}`}
        value={value}
        onChange={onChange}
        className={className}
        style={style}
        required={required}
      />
    </>
  );
};

export default Input;
