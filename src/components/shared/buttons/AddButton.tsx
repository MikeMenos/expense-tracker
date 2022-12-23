import type { FC } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import type { ButtonInterface } from "../../../interfaces/interfaces";
import Button from "../Button";

const AddButton: FC<ButtonInterface> = ({
  onlyIcon,
  children = "Add",
  onClick,
  className,
}) => {
  return (
    <Button
      type={"button"}
      icon={<IoMdAddCircleOutline size="1.5rem" />}
      onClick={onClick}
      className={className}
    >
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default AddButton;
