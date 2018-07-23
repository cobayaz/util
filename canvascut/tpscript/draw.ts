type Pos = [number, number];

export default class Draw {
    public x: number;
    public y: number;

    public context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {}

    public rect(x, y, w, h: number = w, stroke?: boolean) {
        this.context.beginPath();
        this.context.rect(x, y, w, h);
        stroke ? this.context.stroke() : this.context.fill();
        this.context.closePath();
    }
    public circle(x, y, r: number, stroke?: boolean) {
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, true);
        stroke ? this.context.stroke() : this.context.fill();
        this.context.closePath();
    }
    public polygon(pos: Array<Pos>) {
        this.context.beginPath();
        pos.forEach(
            ([posx, posy], index) =>
                index == 0
                    ? this.context.moveTo(posx, posy)
                    : this.context.lineTo(posx, posy)
        );
        this.context.closePath();
        this.context.fill();
    }
    polygonFill(pos: Array<Pos>) {
        this.context.beginPath();
        pos.forEach(
            ([posx, posy], index) =>
                index == 0
                    ? this.context.moveTo(posx, posy)
                    : this.context.lineTo(posx, posy)
        );
        this.context.closePath();
        this.context.fill();
    }
    public rotate() {
        this.context.save();
        this.context.translate(this.x, this.y);
        // this.context.trans;
        this.context.restore();
    }
    public drawImg(Image, dX, dY, dWidth, dHeight = dWidth) {
        this.context.drawImage(Image, dX, dY, dWidth, dHeight);
    }
}
