import type { FC } from "react";
import { AiFillDelete } from "react-icons/ai";
import type { ButtonInterface } from "../../../interfaces/interfaces";
import Button from "../Button";

const DeleteButton: FC<ButtonInterface> = ({
  onlyIcon,
  children = "Delete",
  onClick,
  className,
}) => {
  return (
    <Button
      type={"button"}
      icon={<AiFillDelete size="1.5rem" />}
      onClick={onClick}
      className={`${className} transition-scale duration-200 hover:scale-125`}
    >
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default DeleteButton;
