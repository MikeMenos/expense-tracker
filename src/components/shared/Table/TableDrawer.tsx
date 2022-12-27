import { type FC } from "react";
import Drawer from "react-modern-drawer";
import type { ArionDrawerInterface } from "../../../interfaces/interfaces";
import Button from "../buttons/Button";
import { AiOutlineClose } from "react-icons/ai";

const TableDrawer: FC<ArionDrawerInterface> = (props) => {
  const { children, show, onClose, className, style } = props;

  return (
    <Drawer
      direction="right"
      onClose={onClose}
      open={show}
      className={className}
      style={{ ...style, width: "20%" }}
    >
      <Button
        icon={
          <AiOutlineClose
            color="white"
            size="1.6rem"
            className="font-bold"
            onClick={onClose}
          />
        }
        className="absolute top-3 left-3"
      />
      {children}
    </Drawer>
  );
};

export default TableDrawer;
