import Draw from "./draw";

import Obj from "./object";

type Pos = [number, number];

interface ObjType {
    type: string;
    typecode: number;
}

class Cut extends Draw {
    static create(context: CanvasRenderingContext2D): Cut {
        return new Cut(context);
    }

    private allObj = [];

    public context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super();
        this.context = context;
        this.context.strokeStyle = "whitesmoke";
        this.context.fillStyle = "pink";
    }

    init() {}

    update() {}

    draw() {
        const startPos: Pos = [600, 350];
        this.rect(0, 0, 1280, 800, false);
        this.rect(600, 350, 100, 100);
        const type: ObjType = {
            type: "Parallelogram",
            typecode: 1
        };
        const obj = Obj(this.context, type, startPos, 200).draw();
        this.allObj.push(obj);
    }
    onclick(x, y) {
        // this.allObj.reverse().find(ele => {});
    }

    loop() {
        this.draw();
        requestAnimationFrame(this.loop);
    }
}

export default context => {
    Cut.create(context).draw();
};
