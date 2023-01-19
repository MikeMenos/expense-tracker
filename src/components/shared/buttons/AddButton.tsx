import type { FC } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import type { ButtonInterface } from "../../../interfaces/interfaces";
import Button from "./Button";

const AddButton: FC<ButtonInterface> = ({
  onlyIcon = false,
  type = "button",
  onlyText = false,
  children = "Add",
  onClick,
  className,
}) => {
  return (
    <Button
      onlyIcon={onlyIcon}
      type={type}
      icon={!onlyText ? <IoMdAddCircleOutline size="1.5rem" /> : undefined}
      onClick={onClick}
      className={`${className} rounded-xl bg-green ${
        onlyIcon ? "px-2" : "px-4"
      } py-1 font-bold transition-colors duration-300 hover:bg-greenHover`}
    >
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default AddButton;
