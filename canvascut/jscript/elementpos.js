const Parallelogram = (x, y, typecode, width, height = width) => {
  switch (typecode) {
    case 1:
      return [
        [x + width / 3, y],
        [x + (4 * width) / 3, y],
        [x + width, y + height],
        [x, y + height]
      ];

    default:
      break;
  }
};

export default {
  Parallelogram
};
