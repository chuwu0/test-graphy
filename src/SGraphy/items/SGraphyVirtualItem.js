/**
 * 线条
 */
import SGraphyItem from '../../node-templete/SGraphy/SGraphyItem'
import SRect from '../../node-templete/SGraphy/types/SRect';

export default class SGraphyLineItem extends SGraphyItem {
    /**
     * 构造函数
     * 
     * @param startX  线的起始x坐标
     * @param startY  线的起始y坐标
     * @param endX    线的终止x坐标
     * @param endY    线的终止y坐标
     * @param width   线的宽度
     * 
     * @param color  线的颜色
     * @param isVirtual    是否为虚线
     * 
     * @param canMove  移动
     */
    constructor(startX, startY, endX, endY, color, width, isVirtual, canMove, parent = null) {
        super(parent)
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY
        this.color = color
        this.width = width
        this.isVirtual = isVirtual
        this.minX = Math.min(this.startX, this.endX)
        this.minY = Math.min(this.startY, this.endY)
        this.maxX = Math.max(this.startX, this.endX)
        this.maxY = Math.max(this.startY, this.endY)
        this.type = 4
            // this.canMove = true
    }

    /**
     * Item对象边界区域
     * 
     * @return SRect
     */
    boundingRect() {
        return new SRect(this.minX, this.minY, (this.maxX - this.minX), (this.maxY - this.minY))
    }

    /**
     * 绘制线条
     * 
     * @param canvas 画布
     * @param rect   绘制区域
     */

    onDraw(canvas, rect) {
        if (this.isVirtual) {
            canvas.setLineDash([240, 240])
        }
        canvas.lineWidth = 240
        canvas.strokeStyle = this.color || '#000'
        canvas.beginPath();
        canvas.moveTo(this.startX, this.startY)
        canvas.lineTo(this.endX, this.endY)
        canvas.stroke()
    }
}