import { TweenMax } from "gsap";
import { Side } from "../../types";
import mainTitleBlackPath from "./composite_black.svg";
import mainTitleWhitePath from "./composite_white.svg";

const mainTitleWhite = new Image();
mainTitleWhite.src = mainTitleWhitePath;
const mainTitleBlack = new Image();
mainTitleBlack.src = mainTitleBlackPath;

export default class MainTitle {
    public isMount: boolean = true;
    public onTransition: boolean = false;
    public startX: number = 0;
    public startY: number = 0;

    private width: number = 1370;
    private height: number = 99;
    private ratio: number = this.width / this.height;
    // private readonly ctx: CanvasRenderingContext2D;
    // private readonly img: HTMLImageElement;

    private opacity: number = 1;

    // constructor() {
    //     // this.img = color === "black" ? mainTitleBlack : mainTitleWhite;
    //     // this.ctx = ctx;
    //     this.resize();
    // }

    public render = (ctx: CanvasRenderingContext2D, color: Side) => {
        const img = color === "black" ? mainTitleBlack : mainTitleWhite;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(img, this.startX, this.startY, this.width, this.height);
        ctx.restore();
    }

    public resize = (ctx: CanvasRenderingContext2D) => {
        if (!this.isMount && !this.onTransition) {
            return;
        }

        // if (this.ctx.canvas.height < 600) {
        //     this.width = this.ctx.canvas.width * 0.7;
        // } else {
        this.width = ctx.canvas.width * 0.9;
        // }

        this.startX = (ctx.canvas.width - this.width) / 2;

        this.height = this.width / this.ratio;
        // if (this.ctx.canvas.height < 800) {
        //     this.startY = (this.ctx.canvas.height / 100 * 20) - this.height / 2;
        // } else if (this.ctx.canvas.height < 800) {
        //     //
        // } else {
        // }
        this.startY = ctx.canvas.height * 0.30 - this.height / 2;

        console.log("height " + this.height);
        // console.log(this.startX + "|" + this.startY);
    }
}
