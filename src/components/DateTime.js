const convertDecToBin = number => {
  return number.toString(2);
};

const mapToDateTime = {
  1: { date: "22 Dec 2018", time: "9.00 - 12.00" },
  2: { date: "22 Dec 2018", time: "13.00 - 16.00" },
  4: { date: "23 Dec 2018", time: "9.00 - 12.00" },
  8: { date: "23 Dec 2018", time: "13.00 - 16.00" },
  16: { date: "24 Dec 2018", time: "9.00 - 12.00" },
  32: { date: "24 Dec 2018", time: "13.00 - 16.00" }
};

export { convertDecToBin, mapToDateTime };
