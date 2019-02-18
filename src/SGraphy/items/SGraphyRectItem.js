/**
 * 线条
 */
import SGraphyItem from '../../node-templete/SGraphy/SGraphyItem'
import SRect from '../../node-templete/SGraphy/types/SRect';

export default class SGraphyRectItem extends SGraphyItem {
    /**
     * 构造函数
     * 
     * @param X  矩形的开始点X
     * @param Y  矩形的开始点Y
     * @param width   矩形的宽度
     * @param height  矩形的高度
     * 
     * @param isFill  矩形的是否填充
     * @param fillColor  矩形的填充色彩
     * @param text  矩形的文字
     * @param textSize  矩形的文字大小
     * @param color  矩形的颜色
     * @param Tip   提示
     */
    constructor(X, Y, width, height, isFill, fillColor, text, textSize, color, Tip, parent = null) {
        super(parent)
        this.X = X
        this.Y = Y
        this.width = width
        this.height = height
        this.isFill = isFill
        this.fillColor = fillColor
        this.color = color
        this.textSize = textSize || 6
        this.type = 10
        this.hoverColor = null
        this.text = text.split(",")
        this.fontStart = this.X
        this.Tip = Tip
    }

    /**
     * Item对象边界区域
     * 
     * @return SRect
     */
    boundingRect() {
        return new SRect(this.X, this.Y, this.width, this.height)
    }

    /**
     * 判断item是否包含点x,y
     *
     * @param   x       横坐标（当前item）
     * @param   y       纵坐标（当前item）
     *
     * @return  boolean
     */
    contains(x) {
        if (this.X + this.width > x.x && x.x > this.X && this.Y + this.height > x.y && x.y > this.Y) {
            return true
        } else {
            return false
        }
    }

    /**
     * 绘制线条
     * 
     * @param canvas 画布
     * @param rect   绘制区域
     */

    onDraw(canvas, rect) {
        canvas.beginPath();
        canvas.lineWidth = "1";
        if (this.isFill) {
            if (!!this.hoverColor) {
                canvas.fillStyle = this.hoverColor
            } else {
                canvas.fillStyle = this.fillColor
            }
            canvas.fillRect(this.X, this.Y, this.width, this.height);
        } else {
            canvas.rect(this.X, this.Y, this.width, this.height);
        }
        canvas.stroke();
        if (!!this.text && this.text.length <= 1) {
            canvas.font = this.textSize + "px 宋体";
            canvas.fillStyle = this.color
            canvas.fillText(this.text[0], this.fontStart, this.Y + this.height / 2);
        } else if (!!this.text && this.text.length > 1) {
            canvas.font = this.textSize + "px 宋体";
            canvas.fillStyle = this.color
            for (let i = 0; i < this.text.length; i++) {
                canvas.fillText(this.text[i], this.fontStart, this.Y + this.height / 2 - this.textSize * i);
            }
        } else {
            return
        }
    }
}