<template>
    <view class="content">
        <view>
            <canvas id="canvas" ref="canvas" type="2d" canvas-id="canvas" />
        </view>
    </view>
</template>

<script>
import {
    ConfettiEjector,
    CanvasRender,
    CustomShape,
    Confetti
} from 'confetti-ts-canvas'

const canvasRender = new CanvasRender();
const canvasRender2 = new CanvasRender();

export default {
    data() {
        return {
            canvasSize: {
                width: 0,
                height: 0,
            },
            canvas: null,
        }
    },
    mounted() {
        this.initRenders();
        setInterval(() => {
            this.easy()
        }, 3000)
    },
    methods: {
        async easy() {
            const painter = await this.getPainter();
            const rect = await this.getCanvasSize();
            const { width, height } = rect;
            this.canvasSize.width = width;
            this.canvasSize.height = height;
            new Confetti(
                {
                    paint: painter,
                    canvasWidth: rect.width,
                    canvasHeight: rect.height,
                    displayFps: true,
                }
            ).run({
                // x:Math.random()*rect.width,
                // y:Math.random()*rect.height,
            });
        },
        async initRenders() {
            const painter = await this.getPainter();
            const rect = await this.getCanvasSize();
            const g = uni.createCanvasContext("canvas");
            const { width, height } = rect;
            this.canvasSize.width = width;
            this.canvasSize.height = height;
            canvasRender.init(
                painter, {
                width: rect.width,
                height: rect.height,
            },
                {
                    onFinished() {
                        console.log("完成")
                    },
                    displayFps: true,
                    grivaty: .5,
                }
            );
            canvasRender2.init(
                painter, {
                width: rect.width,
                height: rect.height,
            },
                {
                    onFinished() {
                    },
                    displayFps: true,
                    grivaty: .5,
                }
            );
        },
        getCanvasSize() {
            return new Promise((r, e) => {
                uni.createSelectorQuery().select("#canvas").boundingClientRect((_) => {
                    r(_);
                }).exec();
            });
        },
        /*普通*/
        common() {
            const pao = new ConfettiEjector(canvasRender, {
                limitAngle: [225, 315],//喷发角度区间[-∞,+∞]
                count: 100,//喷发纸片数量
            });
            const boom = pao.create({
                x: Math.random() * (this.canvasSize.width * .5),
                y: Math.random() * (this.canvasSize.height * .5),//喷发位置
                clampforce: [20, 60],//喷发力度
                radius: 10,//纸片大小
            });
            pao.fire(boom);
        },
        /*两边*/
        sides() {
            const leftPao = new ConfettiEjector(canvasRender, {
                limitAngle: [-90, 0],
                count: 60,
            });
            const rightPao = new ConfettiEjector(canvasRender, {
                limitAngle: [180, 270],
                count: 60,
            });
            const leftBoom = leftPao.create({
                x: -this.canvasSize.width / 2 + 20,
                y: -200,
                clampforce: [10, 60],
                radius: 10,
            });
            const rightBoom = rightPao.create({
                x: this.canvasSize.width / 2 - 20,
                y: -200,
                clampforce: [10, 60],
                radius: 10,
            });
            leftPao.fire(leftBoom);
            rightPao.fire(rightBoom);
        },
        /*自定义形状*/
        customShape() {
            /*自定义形状*/
            const customShape = new CustomShape({
                /*
                    形状Point点
                    Array<Array<number>> Array<number>最大长度为2
                */
                points: [
                    [-100, -100],
                    [20, -20],
                    [100, 100],
                    [-20, 20],
                ],
                /*
                    缩放值
                    Number
                */
                scale: .1
            });
            /*在pao.fire(boom);之前调用debug预览自定义多边形，同时！！！不需要执行pao.fire(boom);否则会被刷新掉*/
            //canvasRender2.debug({shape:customShape})
            const pao = new ConfettiEjector(canvasRender2, {
                limitAngle: [225, 315],
                shapeTypes: [3, customShape],//自定义形状三角形、四边形
                count: 60,
            });
            const boom = pao.create({
                x: 0,
                y: 0,
                clampforce: [20, 100],
                radius: 16,
            });
            pao.fire(boom);
        },
        /*异步*/
        asyncBoom() {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    this.common();
                }, i * 1000);
            }
        },
        /*销毁对象后无法再次使用,建议在动画执行完毕后销毁*/
        dispose_anvasRender() {
            canvasRender.dispose();
            canvasRender2.dispose();
            this.displayCanvas = false;
            //alert("canvasRender销毁，如需再次使用请重新创建canvasRender对象")
        },
        async getPainter() {
            return new Promise(async (r) => {
                const query = uni.createSelectorQuery();
                query.select('#canvas')
                    .fields({
                        node: true,
                        size: true
                    }).exec(async (res) => {
                        //r(uni.createCanvasContext('myCanvas', this));
                        const canvas = res[0].node;
                        if (canvas) r(canvas.getContext('2d'));
                        if (canvas?.width || canvas?.height) {
                            const dpr = (await uni.getSystemInfo())[1].pixelRatio;
                            canvas.width = res[0].width // * dpr;
                            canvas.height = res[0].height // * dpr;
                        }
                        this.canvas = canvas;
                        r(uni.createCanvasContext('canvas', this));
                    })
            })
        },
    }
}
</script>

<style>
#canvas {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    pointer-events: none;
    z-index: 999999;
}

.text-wrapper {
    color: #999;
}

.danger {
    color: orangered;
}

button {
    background: #ffffff;
    border: none;
}
</style>
