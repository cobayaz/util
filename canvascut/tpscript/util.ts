export default {
    isInsideObj: (
        x: number,
        y: number,
        pos: [number, number, number]
    ): boolean =>
        Math.pow(pos[0] - x, 2) + Math.pow(pos[1] - y, 2) <= Math.pow(pos[2], 2)
            ? true
            : false
};
