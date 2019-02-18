/**
 * 不规则多边形，元空间
 */
import SGraphyItem from '../../node-templete/SGraphy/SGraphyItem'
import SRect from '../../node-templete/SGraphy/types/SRect';

function getItem(arr, name) {
    if (arr && arr.length) {
        return arr.map(item => {
            return item[name]
        })
    } else {
        return [0]
    }
}


export default class SGraphyPolygonItem extends SGraphyItem {
    /**
     * 
     * 构造函数
     * 
     * @param jsonArr  空间线条数组
     * @param lineWidth    空间线条的宽度
     * @param color    空间线条的颜色
     * @param fillColor  空间的填充颜色
     * 
     */
    constructor(jsonArr, lineWidth, color, fillColor, parent = null) {
            super(parent)
            this.jsonArr = jsonArr
            this.lineWidth = lineWidth
            this.color = color
            this.fillColor = fillColor
            let xArr = getItem(this.jsonArr, 'X')
            let yArr = getItem(this.jsonArr, 'Y')
            this.minX = Math.min.apply(null, xArr) || 0
            this.minY = Math.min.apply(null, yArr) || 0
            this.width = Math.max.apply(null, xArr) - this.minX || 0
            this.height = Math.max.apply(null, yArr) - this.minY || 0
            this.type = 5
        } //constructor

    /**
     * Item的边界区域
     * 
     * @return SRect
     */
    boundingRect() {
        return new SRect(this.minX, this.minY, this.width, this.height)
    }

    /**
     * 绘制不规则多边形
     * 
     * @param canvas 画布
     * @param rect   绘制区域
     */
    onDraw(canvas, rect) {
        if (this.jsonArr && this.jsonArr.length) {
            canvas.beginPath();
            canvas.lineWidth = 240
            canvas.lineCap = 'butt';
            canvas.strokeStyle = this.color || '#000'
            canvas.fillStyle = this.fillColor || '#fff'
            canvas.moveTo(this.jsonArr[0].X, this.jsonArr[0].Y)
            for (let i = 1; i < this.jsonArr.length; i++) {
                canvas.lineTo(this.jsonArr[i].X, this.jsonArr[i].Y)
            }
            canvas.lineTo(this.jsonArr[0].X, this.jsonArr[0].Y)
            canvas.closePath()
            canvas.fill()
            canvas.stroke()
        }
    }
}