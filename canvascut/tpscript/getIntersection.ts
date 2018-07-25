type Pos = [number, number];

interface Res {
    res: boolean;
    point?: Pos;
}

export const getIntersection = (
    la1: Pos,
    la2: Pos,
    lb1: Pos,
    lb2: Pos
): Res => {
    const result: Res = {
        res: false,
        point: undefined
    };

    const ak = (la2[1] - la1[1]) / (la2[0] - la1[0]);
    const bk = (lb2[1] - lb1[1]) / (lb2[0] - lb1[0]);

    // 加速他的计算，避免损耗
    if (Math.abs(ak - bk) < Number.EPSILON) return result;

    const ab = (la1[0] * la2[1] - la2[0] * la1[1]) / (la1[0] - la2[0]);
    const bb = (lb1[0] * lb2[1] - lb2[0] * lb1[1]) / (lb1[0] - lb2[0]);
    console.log("求出该a直线方程为: y=" + ak + "x + " + ab);
    console.log("求出该b直线方程为: y=" + bk + "x + " + bb);

    // 求解方程
    const x = (bb - ab) / (ak - bk);
    const y = ak * x + ab;

    // 点在直线上
    const pointAtLineA = Math.abs(ak * x + ab - y) < Number.EPSILON;
    const pointAtLineB = Math.abs(bk * x + bb - y) < Number.EPSILON;

    if (pointAtLineA && pointAtLineB) {
        console.log(x, y);
        result.point = [x, y];
        return result;
    } else {
        return result;
    }
};
