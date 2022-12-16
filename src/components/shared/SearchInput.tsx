import { type FC, useMemo, type ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import _ from "lodash";
import Input from "./Input";
import type { InputInterface } from "../../interfaces/interfaces";

interface PropsInterface extends InputInterface {
  delay?: number;
  onSearch: (arg0: number | string) => void;
}

const SearchInput: FC<PropsInterface> = ({
  onSearch,
  label,
  delay = 500,
  placeholder = " ",
}) => {
  const debouncedFunc = useMemo(() => _.debounce(onSearch, delay), [delay]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedFunc(value);
  };

  return (
    <div className="flex">
      <BiSearch />
      <Input placeholder={placeholder} label={label} onChange={onChange} />
    </div>
  );
};

export default SearchInput;
