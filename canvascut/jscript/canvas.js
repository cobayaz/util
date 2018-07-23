import Draw from "./draw";

import Obj from "./object";

class Cut extends Draw {
  static create(...arg) {
    return new Cut(...arg);
  }

  constructor(context, lineWidth) {
    super(context);
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = "whitesmoke";
    this.context.fillStyle = "pink";
    this.allObj = []; // {obj,obj.rotate,obj.dir,obj.start,obj.width,obj,height}
  }

  init() {}

  update() {}

  draw() {
    const startPos = [600, 350];
    this.rect(0, 0, 1280, 800, false);
    this.rect(600, 350, 100, 100);
    const type = {
      type: "Parallelogram",
      typecode: 1
    };
    const obj = Obj(this.context, type, startPos, 200).draw();
    this.allObj.push(obj);
  }
  onclick(x, y) {
    this.allObj.reverse().find(ele => {});
  }

  loop() {
    this.draw();
    requestAnimationFrame(this.loop);
  }
}

export default (context, lineWidth) => {
  Cut.create(context, lineWidth).draw();
};
