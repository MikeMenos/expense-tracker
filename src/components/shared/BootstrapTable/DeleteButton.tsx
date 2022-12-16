import type { FC } from "react";
import { AiFillDelete } from "react-icons/ai";
import type { ButtonInterface } from "../../../interfaces/interfaces";
import Button from "../Button";

const DeleteButton: FC<ButtonInterface> = ({
  onlyIcon,
  children = "Delete",
  onClick,
}) => {
  return (
    <Button type={"button"} icon={<AiFillDelete />} onClick={onClick}>
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default DeleteButton;
