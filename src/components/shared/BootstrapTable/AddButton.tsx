import type { FC } from "react";
import { GrAdd } from "react-icons/gr";
import type { ButtonInterface } from "../../../interfaces/interfaces";
import Button from "../Button";

const AddButton: FC<ButtonInterface> = ({
  onlyIcon,
  children = "Add",
  onClick,
}) => {
  return (
    <Button type={"button"} icon={<GrAdd />} onClick={onClick}>
      {onlyIcon ? "" : children}
    </Button>
  );
};

export default AddButton;
