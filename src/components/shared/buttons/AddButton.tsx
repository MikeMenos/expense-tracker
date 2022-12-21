import type { FC } from "react";
import { GrAdd } from "react-icons/gr";
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
      icon={<GrAdd />}
      onClick={onClick}
      className={className}
    >
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default AddButton;
