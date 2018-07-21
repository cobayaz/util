const cageStartPosition = 200;

const divi = 320;

const renderLikeWolf = (instance, targetArea) => {
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

  const prefix = 2;

  const img = targetArea.$refs.ddmrrDom.querySelector("img");
  instance.$refs.ddmrrDom
    .querySelector("canvas")
    .getContext("2d")
    .drawImage(
      img,
      sx,
      sy - prefix,
      width,
      height,
      xStart,
      yStart,
      width,
      height
    );
};

const base64img =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACOCAYAAAC2aQNrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBMjM3MjI0MThGODhFODExOEUxN0U3NjM1NTMzMUJDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRjA2OTQxQzg5OTExMUU4OTBEMEIwODFEMjk3MzhCMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRjA2OTQxQjg5OTExMUU4OTBEMEIwODFEMjk3MzhCMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY4QTI1NTUwRDM4OEU4MTE4RTE3RTc2MzU1MzMxQkM0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyMzcyMjQxOEY4OEU4MTE4RTE3RTc2MzU1MzMxQkM0Ii8+IDwvcmRmOkRlc2NyaXB0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";

const image = new Image();
image.src = base64img;

export const PWCCallback = {
  afterDrag(instance, targetArea) {
    if (instance.params.id && instance.params.id.startsWith("pigeon")) {
      PWCCallback.whenMount(instance, () => {
        instance.inCage = true;
        instance.__targetArea = targetArea;
        renderLikeWolf(instance, targetArea);
      });
    }
  },
  afterDragFail(instance, targeArea) {
    if (instance.params.id && instance.params.id.startsWith("pigeon")) {
      instance.inCage ? (instance.inCage = false) : void 0;
      PWCCallback.whenMount(instance);
    }
  },
  whenMount(instance, cb) {
    // const img = new Image();
    // img.src = instance.params.src;
    // img.src = base64img;
    if (instance.$refs.ddmrrDom.querySelector("canvas")) {
      PWCCallback.updateCanvas(instance, cb);
    }
    setTimeout(() => PWCCallback.updateCanvas(instance, cb), 0);
  },
  updateCanvas(instance, cb) {
    const context = instance.$refs.ddmrrDom
      .querySelector("canvas")
      .getContext("2d");
    context.clearRect(0, 0, image.width, image.height);
    context.drawImage(image, 0, 0, image.width, image.height);
    cb ? cb() : void 0;
  },
  whenMoving(instance) {
    // 不以 pigeon 开头 不在笼子里面
    const objectParams = instance.params;
    if (
      objectParams.id &&
      objectParams.id.startsWith("pigeon") &&
      instance.inCage
    ) {
      PWCCallback.whenMount(instance, () => {
        renderLikeWolf(instance, instance.__targetArea);
      });
    }
  }
};
