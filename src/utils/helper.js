const calculateExpTime = (expTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(expTime * 1000).getTime();

  return adjExpTime - currentTime;
};

const reverseDateString = (date) => {
  const tmp = date.slice(0, 10).split("-");

  return [tmp[0], tmp[2], tmp[1]].join("-");
};

export { calculateExpTime, reverseDateString };
