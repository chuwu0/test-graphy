/**
 * 图片
 * 
 * 
 */
import SGraphyItem from '../../node-templete/SGraphy/SGraphyItem'
import SRect from '../../node-templete/SGraphy/types/SRect'
export default class SGraphyImageItem extends SGraphyItem {
    /**
     * 构造函数
     * 
     * @param width  图片宽度
     * @param height  图片高度
     * @param url    图片url
     * @param id     point的Id
     * @param X      图片向x轴的偏移量
     * @param Y      图片向y轴的偏移量
     * @param downUrl 图片按下时的url
     * @param parent  指向父元素
     */
    constructor(width, height, url, id, X, Y, downUrl, parent = null) {
            super(parent)
            this.width = width
            this.height = height
            this.url = url
            this.id = id
            this.X = X
            this.Y = Y
            this.downUrl = downUrl
            this.imgFalg = false
            this.img = new Image()
            this.img.src = this.url
            this.img.style.width = this.width
            this.img.style.height = this.height
            this.canMove = true
            this.type = 1
        } //constructor

    /**
     * Item对象边界区域
     *
     * @return  SRect
     */
    boundingRect() {
            return new SRect(0, 0, this.width * 100, this.height * 100)
        } // Function boundingRect()

    /**
     * 绘制图片
     * 
     * @param canvas 画布
     * @param rect   绘制区域
     */
    onDraw(canvas, rect) {
        // canvas.moveTo(this.X, this.Y)
        // canvas.drawImage(this.img, 0, 0, this.width, this.height, this.X, this.Y, this.width * 100, this.height * 100)
        canvas.drawImage(this.img, 0, 0, this.width, this.height, 0, 0, this.width * 100, this.height * 100)
    }
}