import Draw from "./draw";

import { getImg } from "./imgbase64";

import { Objs } from "./elementpos";

type Pos = [number, number];

class ControObj extends Draw {
    public context: CanvasRenderingContext2D;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public directPos: [number, number, number];
    public rotatePos: [number, number, number];

    // 修正参数
    private prefix = 30;
    private iconWidth = 50;

    constructor(
        context: CanvasRenderingContext2D,
        startP: Pos,
        width,
        height: number = width
    ) {
        super();
        this.context = context;
        this.x = startP[0];
        this.y = startP[1];
        this.width = width;
        this.height = height;
    }
    // 移动的标签
    drawMoveObj(): [number, number, number] {
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
    drawRotateObj(): [number, number, number] {
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

interface ObjType {
    type: string;
    typecode: number;
}

class Obj extends ControObj {
    private objType: ObjType;
    constructor(context, objType, startP, width, height = width) {
        super(context, startP, width, height);
        this.objType = objType;
    }
    draw() {
        // 生成icon
        this.drawIcon();
        switch (this.objType.type) {
            case "Parallelogram":
                this.context.fillStyle = "white";
                this.polygonFill(
                    Objs.Parallelogram(
                        this.x,
                        this.y,
                        this.objType.typecode,
                        this.width
                    )
                );
        }
        this.context.closePath();
        this.context.stroke();
        return this;
    }
}

export default function(
    context: CanvasRenderingContext2D,
    objType: ObjType,
    startP: Pos,
    width,
    height: number = width
) {
    return new Obj(context, objType, startP, width, (height = width));
}
