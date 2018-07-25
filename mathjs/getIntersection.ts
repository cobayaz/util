type Pos = [number, number];

const getIntersection = (la1: Pos, la2: Pos, lb1: Pos, lb2: Pos) => {
    const ak = (la2[1] - la1[1]) / (la2[0] - la1[0]);
    const ab = (la1[0] * la2[1] - la2[0] * la1[1]) / (la1[0] - la2[0]);
    console.log("求出该a直线方程为: y=" + ak + "x + " + ab);

    const bk = (lb2[1] - lb1[1]) / (lb2[0] - lb1[0]);
    const bb = (lb1[0] * lb2[1] - lb2[0] * lb1[1]) / (lb1[0] - lb2[0]);
    console.log("求出该b直线方程为: y=" + bk + "x + " + bb);
    // ((x2 - x1) * (x3 - x4) * (y3 - y1) - x3 * (x2 - x1) * (y3 - y4) + x1 * (y2 - y1) * (x3 - x4)) /
    // ((y2 - y1) * (x3 - x4) - (x2 - x1) * (y3 - y4));

    // 求解方程
    const x = (bb - ab) / (ak - bk);
    const y = ak * x + ab;

    // 点在直线上
    const pointAtLineA = y == ak * x + ab;
    const pointAtLineB = y == bk * x + bb;
    if (pointAtLineA && pointAtLineB) {
        console.log(x, y);
        return true;
    } else {
        console.log(x, y);
    }
};
