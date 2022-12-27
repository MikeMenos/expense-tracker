const buildSelectorOptions = (d: { name: string }) => {
  return {
    label: d.name,
    value: d.name,
  };
};

export default buildSelectorOptions;
