export const filterObjectKeys = (
  originalObject: object,
  keysToShow: string[]
): object => {
  const filteredObject = {};
  Object.keys(originalObject).forEach((key) => {
    if (keysToShow.includes(key)) filteredObject[key] = originalObject[key];
  });
  return filteredObject;
};
