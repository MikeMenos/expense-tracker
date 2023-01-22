import { type FC } from "react";
import ReactSelect from "react-select";
import { type SelectorPropsInterface } from "../../../interfaces/interfaces";
import buildSelectorOptions from "../../../utils/buildSelectorOptions";
import { trpc } from "../../../utils/trpc";
import selectorStyles from "../../../utils/selectorStyles";

const CategoriesSelector: FC<SelectorPropsInterface> = ({
  value,
  name,
  onChange,
  required,
  placeholder,
  className,
}) => {
  const { data, isFetching } = trpc.category.list.useQuery();

  const categories = data?.categories.flatMap((name) => name) ?? [];

  const options = categories.map(buildSelectorOptions);

  return (
    <ReactSelect
      className={className}
      options={options}
      isLoading={isFetching}
      value={value}
      name={name}
      onChange={onChange}
      styles={{
        ...selectorStyles(),
      }}
      required={required}
      placeholder={`${placeholder} ${required ? "*" : ""}`}
    />
  );
};

export default CategoriesSelector;
