import { FC } from "react";
import { InputInterface } from "../../interfaces/interfaces";

const Input: FC<InputInterface> = ({
  type,
  name,
  placeholder,
  label,
  value,
  className,
  style,
  onChange,
  autoComplete,
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
        autoComplete={autoComplete}
      />
    </>
  );
};

export default Input;
