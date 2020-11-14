export const SortString = (obj1, obj2) => {
  const str1LowerCase = obj1.status.toLocaleLowerCase();
  const str2LowerCase = obj2.status.toLocaleLowerCase();
  return str2LowerCase.localeCompare(str1LowerCase);
};
