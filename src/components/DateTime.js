const convertDecToBin = number => {
  return number.toString(2);
};

const mapToDateTime = {
  1: { date: "15 Jan 2019", time: "9.00 - 10.30" },
  2: { date: "15 Jan 2019", time: "10.30 - 12.00" },
  4: { date: "15 Jan 2019", time: "13.00 - 14.30" },
  8: { date: "15 Jan 2019", time: "14.30 - 16.00" },
  16: { date: "16 Jan 2019", time: "9.00 - 10.30" },
  32: { date: "16 Jan 2019", time: "10.30 - 12.00" },
  64: { date: "16 Jan 2019", time: "13.00 - 14.30" },
  128: { date: "16 Jan 2019", time: "14.30 - 16.00" },
  256: { date: "17 Jan 2019", time: "9.00 - 10.30" },
  512: { date: "17 Jan 2019", time: "10.30 - 12.00" },
  1024: { date: "17 Jan 2019", time: "13.00 - 14.30" },
  2048: { date: "17 Jan 2019", time: "14.30 - 16.00" },

  5: {
    date: "split subjectTimeMap and use it instead.",
    time: "split subjectTimeMap and use it instead."
  }
};

export { convertDecToBin, mapToDateTime };
