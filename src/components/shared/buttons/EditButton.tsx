import type { FC } from "react";
import { AiFillEdit } from "react-icons/ai";
import type { ButtonInterface } from "../../../interfaces/interfaces";
import Button from "../Button";

const EditButton: FC<ButtonInterface> = ({
  onlyIcon,
  children = "Edit",
  onClick,
  className,
}) => {
  return (
    <Button
      type={"button"}
      icon={<AiFillEdit />}
      onClick={onClick}
      className={className}
    >
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default EditButton;
