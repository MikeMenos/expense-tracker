import { type FC } from "react";
import ReactSelect from "react-select";
import { type SelectorPropsInterface } from "../../../interfaces/interfaces";
import buildSelectorOptions from "../../../utils/buildSelectorOptions";
import { trpc } from "../../../utils/trpc";

const CategoriesSelector: FC<SelectorPropsInterface> = ({
  value,
  name,
  onChange,
}) => {
  const { data, isFetching } = trpc.category.list.useQuery();

  const categories = data?.categories.flatMap((name) => name) ?? [];

  const options = categories.map(buildSelectorOptions);

  return (
    <ReactSelect
      options={options}
      isLoading={isFetching}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
};

export default CategoriesSelector;
