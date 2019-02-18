/**
 * 线条
 */
import SGraphyItem from '../../node-templete/SGraphy/SGraphyItem'
import SRect from '../../node-templete/SGraphy/types/SRect';

export default class SGraphyTextItem extends SGraphyItem {
    /**
     * 构造函数
     * 
     * @param X  文字的开始点X
     * @param Y  文字的开始点Y
     * @param width   文字的宽度
     * 
     * @param color  文字的颜色
     * @param text   文字的文字
     */
    constructor(X, Y, width, color, text, falg, font, parent = null) {
        super(parent)
        this.X = X
        this.Y = Y
        this.lineWidth = width
        this.color = color
        this.font = font ? font : "6px 宋体"
        this.text = falg ? text + '→' : text
    }

    /**
     * Item对象边界区域
     * 
     * @return SRect
     */
    boundingRect() {
        return new SRect(this.X, this.Y, 0, 0)
    }

    /**
     * 绘制线条
     * 
     * @param canvas 画布
     * @param rect   绘制区域
     */

    onDraw(canvas, rect) {
        if (!!this.text) {
            canvas.font = this.font;
            canvas.fillStyle = this.color
            canvas.fillText(this.text, this.X, this.Y);
        }
    }
}