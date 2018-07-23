export default class Draw {
  constructor(context) {
    this.context = context;
  }

  rect(x, y, w, h = w, stroke = true) {
    this.context.beginPath();
    this.context.rect(x, y, w, h);
    stroke ? this.context.stroke() : this.context.fill();
    this.context.closePath();
  }
  circle(x, y, r, stroke = true) {
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI, true);
    stroke ? this.context.stroke() : this.context.fill();
    this.context.closePath();
  }
  polygon(pos) {
    this.context.beginPath();
    pos.forEach(([posx, posy], index) => {
      if (index == 0) {
        return this.context.moveTo(posx, posy);
      }
      this.context.lineTo(posx, posy);
    });
    this.context.closePath();
    this.context.stroke();
  }
  polygonFill(...pos) {
    this.context.beginPath();
    pos.forEach(
      ([posx, posy], index) =>
        index == 0
          ? this.context.moveTo(posx, posy)
          : this.context.lineTo(posx, posy)
    );
    this.context.closePath();
    this.context.fill();
  }
  rotate() {
    // this.context.save();
    // this.context.trans;
    this.context.restore();
  }
  drawImg(Image, dX, dY, dWidth, dHeight = dWidth) {
    this.context.drawImage(Image, dX, dY, dWidth, dHeight);
  }
}
