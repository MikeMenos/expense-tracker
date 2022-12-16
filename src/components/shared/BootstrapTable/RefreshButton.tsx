import type { FC } from "react";
import { GrRefresh } from "react-icons/gr";
import Button from "../Button";
import type { ButtonInterface } from "../../../interfaces/interfaces";

const RefreshIcon: FC<ButtonInterface> = ({
  className,
  onClick,
  show = true,
  children,
}) => {
  if (!show) {
    return null;
  }

  return (
    <Button type={"button"} icon={<GrRefresh />} onClick={onClick}>
      {children}
    </Button>
  );
};

export default RefreshIcon;
