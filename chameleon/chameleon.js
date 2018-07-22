export default (instance, targetArea) => {
  let xStart, yStart, width, height, sx, sy;
  // inside in x direction
  if (instance.params.transX >= targetArea.params.transX) {
    xStart = 0;
    sx = instance.params.transX - targetArea.params.transX;

    const rightSide = instance.params.width + instance.params.transX;
    const targetRightSide = targetArea.params.width + targetArea.params.transX;

    if (targetRightSide >= rightSide) {
      width = instance.params.width;
    } else {
      width = instance.params.width - (rightSide - targetRightSide);
    }
  }
  // outside x direction
  if (instance.params.transX < targetArea.params.transX) {
    xStart = targetArea.params.transX - instance.params.transX;
    sx = 0;

    const rightSide = instance.params.width + instance.params.transX;
    const targetRightSide = targetArea.params.width + targetArea.params.transX;

    if (targetRightSide >= rightSide) {
      width = rightSide - targetArea.params.transX;
    } else {
      width = targetArea.params.width;
    }
  }

  // inside y direction
  if (instance.params.transY >= targetArea.params.transY) {
    yStart = 0;
    sy = instance.params.transY - targetArea.params.transY;

    const bottomSide = instance.params.height + instance.params.transY;
    const targetBottomSide =
      targetArea.params.height + targetArea.params.transY;

    if (targetBottomSide >= bottomSide) {
      height = instance.params.height;
    } else {
      height = instance.params.height - (bottomSide - targetBottomSide);
    }
  }
  // outside y direction
  if (instance.params.transY < targetArea.params.transY) {
    yStart = targetArea.params.transY - instance.params.transY;
    sy = 0;

    const bottomSide = instance.params.height + instance.params.transY;
    const targetBottomSide =
      targetArea.params.height + targetArea.params.transY;

    if (targetBottomSide >= bottomSide) {
      height = bottomSide - targetArea.params.transY;
    } else {
      height = targetArea.params.height;
    }
  }

  const xprefix = 0;
  const yprefix = 2;

  const img = targetArea.$refs.ddmrrDom.querySelector("img");
  instance.$refs.ddmrrDom
    .querySelector("canvas")
    .getContext("2d")
    .drawImage(
      img,
      sx + xprefix,
      sy - yprefix,
      width,
      height,
      xStart,
      yStart,
      width,
      height
    );
};
