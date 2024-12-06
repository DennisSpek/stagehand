const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return `${number / 1000000}M`;
  } else if (number >= 1000) {
    return `${number / 1000}K`;
  }
  return number.toString();
};

export default formatNumber;
