type Pos = [number, number];

type GetPos = (
    x: number,
    y: number,
    typecode: number,
    width: number,
    height?: number
) => Array<Pos>;

const Parallelogram: GetPos = (
    x: number,
    y: number,
    typecode: number,
    width: number,
    height: number | undefined = width
) => {
    switch (typecode) {
        case 1:
            return [
                [x + width / 3, y],
                [x + (4 * width) / 3, y],
                [x + width, y + height],
                [x, y + height]
            ];
        default:
            return [
                [x + width / 3, y],
                [x + (4 * width) / 3, y],
                [x + width, y + height],
                [x, y + height]
            ];
    }
};

interface Objects {
    Parallelogram: GetPos;
}

export const Objs: Objects = {
    Parallelogram
};
