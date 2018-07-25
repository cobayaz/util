function getAngle(
    centerX: number,
    centerY: number,
    evX: number,
    evY: number
): number {
    //获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
    const x = Math.abs(centerX - evX);
    const y = Math.abs(centerY - evY);
    const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const cos = y / z;
    let radina = Math.acos(cos); //用反三角函数求弧度

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

    return radina;
}
