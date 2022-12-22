import { type FC } from "react";
import Drawer from "react-modern-drawer";
import type { ArionDrawerInterface } from "../../../interfaces/interfaces";
import Button from "../Button";
import { GrClose } from "react-icons/gr";

const TableDrawer: FC<ArionDrawerInterface> = (props) => {
  const { children, show, onClose, className, style } = props;

  return (
    <Drawer
      direction="right"
      onClose={onClose}
      open={show}
      className={className}
      style={style}
    >
      <Button
        icon={<GrClose size="1.5rem" className="font-bold" onClick={onClose} />}
        className="absolute top-3 left-3"
      />
      {children}
    </Drawer>
  );
};

export default TableDrawer;
