const buildSelectorOptions = (d: any) => {
  return {
    label: d.name,
    value: d.name,
  };
};

export default buildSelectorOptions;
