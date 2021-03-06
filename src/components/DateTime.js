const convertDecToBin = number => {
  return number.toString(2);
};
//period
const mapToDateTime = {
  1: { date: "13 Jan 2020", time: "9.00 - 10.30" },
  2: { date: "13 Jan 2020", time: "10.30 - 12.00" },
  4: { date: "14 Jan 2020", time: "9.00 - 10.30" },
  8: { date: "14 Jan 2020", time: "10.30 - 12.00" },
  16: { date: "14 Jan 2020", time: "13.00 - 14.30" },
  32: { date: "14 Jan 2020", time: "14.30 - 16.00" },
  64: { date: "15 Jan 2020", time: "9.00 - 10.30" },
  128: { date: "15 Jan 2020", time: "10.30 - 12.00" },
  256: { date: "15 Jan 2020", time: "13.00 - 14.30" },
  512: { date: "15 Jan 2020", time: "14.30 - 16.00" },

  5: {
    date: "split subjectTimeMap and use it instead.",
    time: "split subjectTimeMap and use it instead."
  }
};

export { convertDecToBin, mapToDateTime };
