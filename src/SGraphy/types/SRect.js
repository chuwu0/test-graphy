/**
 * 矩形
 *
 * @author  chuwu0
 */
export default class SRect {
    /**
     * 构造函数
     *
     * @param   x       X坐标
     * @param   y       Y坐标
     * @param   width   宽度
     * @param   height  高度
     */
    constructor(x = 0, y = 0, width = 0, height = 0) {
            this._x = x
            this._y = y
            this._width = Math.max(width, 0)
            this._height = Math.max(height, 0)
        } // constructor

    /**
     * left属性
     */
    get left() {
        return this._x
    }
    set left(value) {
        this._x = value
    }

    /**
     * right属性
     */
    get right() {
        return this._x + this._width
    }
    set right(value) {
        this._width = Math.max(value - this._x, 0)
    }

    /**
     * top属性
     */
    get top() {
        return this._y
    }
    set top(value) {
        this._y = value
    }

    /**
     * top属性
     */
    get bottom() {
        return this._y + this._height
    }
    set bottom(value) {
        this._height = Math.max(value - this._y, 0)
    }

    /**
     * x属性
     *
     * @return {*}
     */
    get x() {
        return this._x
    }
    set x(value) {
        this._x = value
    }

    /**
     * x属性
     *
     * @return {*}
     */
    get y() {
        return this._y
    }
    set y(value) {
        this._y = value
    }

    /**
     * width 属性
     *
     * @return {number}
     */
    get width() {
        return this._width
    }
    set width(value) {
        this._width = Math.max(value, 0)
    }

    /**
     * height 属性
     * @return {number}
     */
    get height() {
        return this._height
    }
    set height(value) {
        this._height = Math.max(value, 0)
    }

    /**
     * 判断矩形空间是否包含点x,y
     *
     * @param   x       横坐标（当前item）
     * @param   y       纵坐标（当前item）
     * @return  boolean
     */
    contains(x, y) {
            return (x >= this.x && x <= this.right) && (y >= this.top && y <= this.bottom)
        } // Function contains()

    /**
     * 调整Rect位置
     *
     * @param x
     * @param y
     * @return  SRect
     */
    adjusted(x, y = null) {
            if (typeof(x) === 'object') { // 如果传入的是SPoint对象
                return new SRect(this.x + x.x, this.y + x.y, this.width, this.height)
            }

            return new SRect(this.x + x, this.y + y, this.width, this.height)
        } // Function adjusted()

    /**
     * 合并rect
     *
     * @param   rect
     */
    union(rect) {
            this.left = Math.min(this.left, rect.left)
            this.top = Math.min(this.top, rect.top)
            this.right = Math.max(this.right, rect.right)
            this.bottom = Math.max(this.bottom, rect.bottom)
        } // Function union()
} // Class SRect