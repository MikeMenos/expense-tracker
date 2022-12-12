import { FC } from "react";
import { ChildrenType } from "../../interfaces/interfaces";

interface PropsInterface extends ChildrenType {
  className?: string;
  onSubmit: VoidFunction;
}

const Form: FC<PropsInterface> = ({ children, className, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
