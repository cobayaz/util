import Draw from "./draw";

import Obj from "./object";

import { createObj } from "./object";

import util from "./util";

type Pos = [number, number];

interface ObjType {
    type: string;
    typecode: number;
}

class Cut extends Draw {
    static create(context: CanvasRenderingContext2D): Cut {
        return new Cut(context);
    }

    private allObj: Array<Obj> = [];

    public context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super(context);
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
        const obj = createObj(this.context, type, startPos, 200).draw();
        this.allObj.push(obj);
    }
    onclick(x: number, y: number) {
        console.log("cdcdccddcfvffbd", x, y);
        this.allObj.reverse().find(
            (obj: Obj): boolean => {
                const rotatePos: [number, number, number] = obj.rotatePos;
                const directPos: [number, number, number] = obj.directPos;
                return (
                    util.isInsideObj(x, y, rotatePos) ||
                    util.isInsideObj(x, y, directPos)
                );
            }
        );
    }

    loop() {
        this.draw();
        requestAnimationFrame(this.loop);
    }
}

export default (context: CanvasRenderingContext2D) => {
    Cut.create(context).draw();
};
