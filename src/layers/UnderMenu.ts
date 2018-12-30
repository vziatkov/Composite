import Shadow from "../comps/ImageDrawer/Shadow";
import MainTitle from "../comps/MainTitle";
import TextDrawer from "../comps/TextDrawer";
import { Iscenes } from "../types";

export default class UnderMenu {
    public ctxDom = document.querySelector("#under") as HTMLCanvasElement;
    public ctx = this.ctxDom.getContext("2d") as CanvasRenderingContext2D;

    public scenes: Iscenes;

    public readonly shadow: Shadow;

    constructor() {
        this.resize();
        this.scenes = {
            home: {
                mainTitle: new MainTitle(this.ctx, "black"),
                title: new TextDrawer(this.ctx, "black", "THINK BOTH WAYS", true),
            },
            level: {
                // title: new TextDrawer(this.ctx, "black", "SELECT A LEVEL", false),
            },
        };
        this.shadow = new Shadow(this.ctx);
        window.addEventListener("resize", this.resize);
    }

    public render = () => {
        this.clear();
        for (const sceneName in this.scenes) {
            if (this.scenes[sceneName]) {
                const scene = this.scenes[sceneName];
                for (const comps in scene) {
                    if (scene[comps].hasOwnProperty("render")) {
                        if (scene[comps].isMount || scene[comps].onTransition) {
                            scene[comps].render();
                        }
                    }
                }
            }
        }
        this.shadow.render();
    }

    private clear = () => {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    private resize = () => {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }
}
