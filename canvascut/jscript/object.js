import Draw from "./draw";

import { getImg } from "./imgbase64";

import Pos from "./elementpos";

class ControObj extends Draw {
  constructor(context, startP, width, height = width) {
    super(context);
    this.x = startP[0];
    this.y = startP[1];
    this.width = width;
    this.height = height;
    // 修正参数
    this.prefix = 30;

    this.iconWidth = 50;

    this.directPos = [];

    this.rotatePos = [];
  }
  // 移动的标签
  drawMoveObj() {
    const x = this.x - this.prefix;
    const y = this.y - this.prefix;
    const directImg = getImg("direct");
    this.drawImg(
      directImg,
      x - this.iconWidth / 2,
      y - this.iconWidth / 2,
      this.iconWidth
    );
    return [x, y, this.iconWidth / 2];
  }
  // 旋转的标签
  drawRotateObj() {
    const rotateImg = getImg("rotate");
    const x = this.x + this.width + 30;
    console.log(this.width, this.x);
    const y = this.y - 30;
    this.drawImg(
      rotateImg,
      x + this.iconWidth / 2,
      y - this.iconWidth / 2,
      this.iconWidth
    );
    return [x, y, this.iconWidth / 2];
  }
  // 生成，并且返回点阵的信息
  drawIcon() {
    this.rotatePos = this.drawRotateObj();
    this.directPos = this.drawMoveObj();
  }
}

class Obj extends ControObj {
  constructor(context, { type, typecode }, startP, width, height = width) {
    super(context, startP, width, height);
    this.type = type;
    this.typecode = typecode;
  }
  draw() {
    // 生成icon
    this.drawIcon();
    switch (this.type) {
      case "Parallelogram":
        this.context.fillStyle = "white";
        this.polygonFill(
          ...Pos.Parallelogram(this.x, this.y, this.typecode, this.width)
        );
    }
    this.context.closePath();
    this.context.stroke();
    return this;
  }
}

export default function(...arg) {
  return new Obj(...arg);
}
