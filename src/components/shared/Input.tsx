import type { FC } from "react";
import type { InputInterface } from "../../interfaces/interfaces";

const Input: FC<InputInterface> = ({
  type,
  name,
  placeholder,
  label,
  value,
  className,
  style,
  onChange,
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        style={style}
      />
    </>
  );
};

export default Input;
