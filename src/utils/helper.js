export const getLocalStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data;
};

export const getUserInitials = (name) => {
  return name
    ?.split(" ")
    .filter((_, i) => i < 2)
    .map((item) => item[0].toUpperCase())
    .join("");
};
