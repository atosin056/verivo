const retrievalQueryBuilder = (trade, category) => {
  const retrievalQuery = `
  ${trade}
  ${category}
  technical knowledge, troubleshooting scenarios,
  diagnostic procedures, repair tasks,
  component functions and performance criteria
`;
  return retrievalQuery;
};

export default retrievalQueryBuilder;
