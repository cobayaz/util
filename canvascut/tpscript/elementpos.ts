type Pos = [number, number];

type GetPos = (x, y, typecode, width, height?) => Array<Pos>;

const Parallelogram: GetPos = (
    x,
    y,
    typecode,
    width,
    height: number = width
) => {
    switch (typecode) {
        case 1:
            return [
                [x + width / 3, y],
                [x + (4 * width) / 3, y],
                [x + width, y + height],
                [x, y + height]
            ];
    }
};

interface Objects {
    Parallelogram;
}

export const Objs: Objects = {
    Parallelogram
};
