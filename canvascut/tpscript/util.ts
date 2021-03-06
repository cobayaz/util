import { getIntersection } from "./getIntersection";

type Pos = [number, number];

export default {
    // 是否在元素的里面
    isInsideObj: (
        x: number,
        y: number,
        pos: [number, number, number]
    ): boolean =>
        Math.pow(pos[0] - x, 2) + Math.pow(pos[1] - y, 2) <= Math.pow(pos[2], 2)
            ? true
            : false,

    // 获取角度
    getAngle(
        centerX: number,
        centerY: number,
        evX: number,
        evY: number
    ): number {
        // 获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        const x = Math.abs(centerX - evX);
        const y = Math.abs(centerY - evY);
        const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        const cos = y / z;
        // let radina = parseFloat(Math.acos(cos).toFixed(3)); //用反三角函数求弧度
        let radina = Math.floor(Math.acos(cos));

        if (evX > centerX && evY > centerY) {
            //鼠标在第四象限
            radina = Math.PI - radina;
        }

        if (evX == centerX && evY > centerY) {
            //鼠标在y轴负方向上
            radina = Math.PI;
        }

        if (evX > centerX && evY == centerY) {
            //鼠标在x轴正方向上
            radina = Math.PI / 2;
        }

        if (evX < centerX && evY > centerY) {
            //鼠标在第三象限
            radina = Math.PI + radina;
        }

        if (evX < centerX && evY == centerY) {
            //鼠标在x轴负方向
            radina = (Math.PI * 3) / 2;
        }

        if (evX < centerX && evY < centerY) {
            //鼠标在第二象限
            radina = 2 * Math.PI - radina;
        }

        console.log(radina);
        return radina;
    },
    // 得到角度
    getDeg(
        centerX: number,
        centerY: number,
        x: number,
        y: number,
        ex: number,
        ey: number
    ): number {
        const [x1, y1] = [x - centerX, y - centerY];
        const [x2, y2] = [ex - centerX, ey - centerY];

        const getSide = (a: number, b: number): number =>
            Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        const multiplicate =
            (x1 * x2 + y1 * y2) / (getSide(x1, y1) * getSide(x2, y2));

        return parseFloat(Math.acos(multiplicate).toFixed(3));
    },

    // 得到交点
    getIntersection,

    getDirection(
        startPos: Pos,
        endPos: Pos
    ): Array<{ direction: "left" | "right"; point: Pos }> {
        const [ey, ex] = [endPos[0], endPos[1]];
        const [sy, sx] = [startPos[0], endPos[1]];

        const k = parseFloat(((ey - sy) / (ex - sx)).toFixed(3));

        const proportion = parseFloat((-1 / k).toFixed(3));

        // const VectorProduct=

        const leftDire: { direction: "left" | "right"; point: Pos } = {
            direction: "left",
            point: [1, proportion]
        };

        const rightDire: { direction: "left" | "right"; point: Pos } = {
            direction: "right",
            point: [-1, -proportion]
        };

        return [leftDire, rightDire];
    }
};
