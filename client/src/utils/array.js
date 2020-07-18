export const addOrUpdateObjById = (arr, id, newObj) => {
  const filtered = removeObjById(arr, id);
  return filtered.concat([newObj]);
};

export const getObjById = (arr, id) => {
  return arr.find((obj) => {
    return obj.id === id;
  });
};

export const removeObjById = (arr, id) => {
  return arr.filter((obj) => {
    return obj.id !== id;
  });
};
