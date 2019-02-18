/**
 * 线条
 */
import SGraphyItem from '../../node-templete/SGraphy/SGraphyItem'
import SRect from '../../node-templete/SGraphy/types/SRect';

export default class SGraphyCircleItem extends SGraphyItem {
    /**
     * 构造函数
     * 
     * @param X  圆中心点X
     * @param Y  圆中心点Y
     * @param Radius   圆的半径
     * 
     * @param color  线的颜色
     * @param isVirtual    是否为虚线
     */
    constructor(X, Y, color, Radius, isSolid, name, parent = null) {
        super(parent)
        this.X = X
        this.Y = Y
        this.color = color
        this.Radius = Radius
        this.isSolid = isSolid
        this.minX = this.X - this.Radius
        this.minY = this.Y - this.Radius
        this.maxX = this.X + this.Radius
        this.maxY = this.Y + this.Radius
        this.sAngle = null || 0
        this.eAngle = null || 2 * Math.PI
        this.name = name
        this.type = 6
        this.lineWidth = null
    }

    /**
     * Item对象边界区域
     * 
     * @return SRect
     */
    boundingRect() {
        return new SRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY)
    }

    /**
     * 绘制线条
     * 
     * @param canvas 画布
     * @param rect   绘制区域
     */

    onDraw(canvas, rect) {
        canvas.lineWidth = this.lineWidth || 240
        canvas.strokeStyle = this.color || '#000'
        canvas.fillStyle = this.color || '#000'
        canvas.beginPath();
        canvas.arc(this.X, this.Y, this.Radius, this.sAngle, this.eAngle);
        if (!!this.isSolid) {
            canvas.fillStyle = this.color; //填充颜色,默认是黑色
            canvas.fill(); //画实心圆
        }
        canvas.stroke()
        if (!!this.name) {
            canvas.font = "oblique small-caps bold " + this.lineWidth * 10 + "px Arial";
            // canvas.font = "oblique small-caps bold " + 10 + "px Arial";
            canvas.fillStyle = 'green'
            canvas.fillText(this.name, this.X, this.Y);
        }
    }
}