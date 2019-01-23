import { TweenMax } from "gsap";
import { ICoordinate, Side } from "../types";

export default class TextDrawer {
    public isMount: boolean = true;
    public onTransition: boolean = false;

    protected readonly ctx: CanvasRenderingContext2D;

    protected x: number = 0;
    protected y: number = 30;
    protected ix: number = 0;
    protected iy: number = 0;

    protected width: number = 0;

    private readonly color: string;

    private opacity: number = 1;

    private content: string;

    constructor(ctx: CanvasRenderingContext2D, side: Side, content: string, isMount: boolean, initialCoordinate: ICoordinate) {
        this.ctx = ctx;
        this.isMount = isMount;
        if (!isMount) {
            this.opacity = 0;
        }
        this.color = side === "black" ? "#000" : "#FFF";
        this.content = content;
        this.ix = initialCoordinate.x;
        this.iy = initialCoordinate.y;
        this.width = this.ctx.measureText(this.content).width;
        this.resize();
    }

    public render = () => {
        this.ctx.save();
        this.ctx.canvas.style.letterSpacing = "20px";
        this.ctx.font = "400 30px sans-serif";
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillText(this.content, this.x, this.y);
        if (TweenMax.ticker.frame === 4 || this.onTransition) {
            this.width = this.ctx.measureText(this.content).width;
            this.resize();
        }
        this.ctx.restore();
    }

    public resize = () => {
        this.x = (this.ctx.canvas.width * this.ix) - this.width / 2;
        this.y = (this.ctx.canvas.height * this.iy) - 100 / 2;
    }
}
