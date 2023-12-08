export const getStartAndEndIdx = (page, pageSize) => {
  const startIdx = (page - 1) * pageSize;
  const endIdx = page * pageSize;

  return [startIdx, endIdx]
}