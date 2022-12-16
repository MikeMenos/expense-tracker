import type { FC } from "react";
import { AiFillEdit } from "react-icons/ai";
import type { ButtonInterface } from "../../../interfaces/interfaces";
import Button from "../Button";

const EditButton: FC<ButtonInterface> = ({
  onlyIcon,
  children = "Edit",
  onClick,
}) => {
  return (
    <Button type={"button"} icon={<AiFillEdit />} onClick={onClick}>
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default EditButton;
