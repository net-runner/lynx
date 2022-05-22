export const showSelectedObjectKeys = (
  originalObject: object,
  keysToShow: string[]
): object => {
  const filteredObject = {};
  Object.keys(originalObject).forEach((key) => {
    if (keysToShow.includes(key)) filteredObject[key] = originalObject[key];
  });
  return filteredObject;
};

export const hideObjectKeysWithoutValues = (
  originalObject: object
): object => {
  const filteredObject = {};
  Object.keys(originalObject).forEach((key) => {
    if (originalObject[key] !== undefined) filteredObject[key] = originalObject[key];
  });
  return filteredObject;
};

export const hideSelectedObjectKeys = (
  originalObject: object,
  keysToHide: string[]
): object => {
  const filteredObject = {};
  Object.keys(originalObject).forEach((key) => {
    if (!keysToHide.includes(key)) filteredObject[key] = originalObject[key];
  });
  return filteredObject;
};
