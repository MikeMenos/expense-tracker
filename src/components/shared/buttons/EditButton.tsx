import type { FC } from "react";
import { AiFillEdit } from "react-icons/ai";
import type { ButtonInterface } from "../../../interfaces/interfaces";
import Button from "./Button";

const EditButton: FC<ButtonInterface> = ({
  onlyIcon = false,
  children = "Edit",
  onClick,
  className,
  size = "1.5rem",
}) => {
  return (
    <Button
      onlyIcon={onlyIcon}
      type={"button"}
      icon={<AiFillEdit size={size} />}
      onClick={onClick}
      className={`${className} transition-scale duration-200 hover:scale-125`}
    >
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default EditButton;
