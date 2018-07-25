type Pos = [number, number];

const getIntersection = (la1: Pos, la2: Pos, lb1: Pos, lb2: Pos) => {
    const ak = (la2[1] - la1[1]) / (la2[0] - la1[0]);
    const ab = (la1[0] * la2[1] - la2[0] * la1[1]) / (la1[0] - la2[0]);
    console.log("求出该a直线方程为: y=" + ak + "x + " + ab);

    const bk = (lb2[1] - lb1[1]) / (lb2[0] - lb1[0]);
    const bb = (lb1[0] * lb2[1] - lb2[0] * lb1[1]) / (lb1[0] - lb2[0]);
    console.log("求出该b直线方程为: y=" + bk + "x + " + bb);
};
