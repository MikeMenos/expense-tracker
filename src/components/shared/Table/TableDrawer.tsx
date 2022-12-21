import { type FC } from "react";
import Drawer from "rc-drawer";
import type { ArionDrawerInterface } from "../../../interfaces/interfaces";
import { type IDrawerProps } from "rc-drawer/es/IDrawerPropTypes";

const TableDrawer: FC<ArionDrawerInterface & IDrawerProps> = (props) => {
  const {
    children,
    show,
    setShow,
    onClose,
    width = "600px",
    afterVisibleChange,
    className,
  } = props;

  const handleMaskClick = () => {
    setShow(false);
  };

  return (
    <div className="h-screen bg-red-500">
      <Drawer
        ease={"cubic-bezier(0.78, 0.14, 0.15, 0.86)"}
        afterVisibleChange={afterVisibleChange}
        duration={".3s"}
        level={null}
        placement="right"
        handler={false}
        onClose={onClose ?? handleMaskClick}
        showMask={false}
        width={width}
        open={show}
        className={className}
      >
        {children}
      </Drawer>
    </div>
  );
};

export default TableDrawer;
