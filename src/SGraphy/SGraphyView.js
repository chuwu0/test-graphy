import './SCanvas'
import SPoint from './types/SPoint'
import SMouseEvent from './SMouseEvent'

const bindEvent = Symbol('bindEvent')
const toSceneMotionEvent = Symbol('toSceneMotionEvent')
    /**
     * Graphy图形引擎视图类
     *
     * @author  chuwu0
     */
export default class SGraphyView {
    /**
     * 构造函数
     *
     * @param   id    Canvas对象ID
     */
    constructor(id, scene) {
            this.canvasView = document.getElementById(id)
            this.canvas = this.canvasView.getContext('2d')
            this[bindEvent](this.canvasView)
            this.scene = scene
            this.pos = new SPoint(10, 0)
            this.scale = 1
            this.minScale = 0.004
            this.maxScale = 0.5
            this._midKeyX = 0
            this._midKeyY = 0
            this.wheelZoom = 1.05

            window.requestAnimationFrame(this.onDraw.bind(this))
        } // Function constructor()

    /**
     * 绑定canvas事件
     *
     * @param   canvas      canvas对象
     * @private
     */
    [bindEvent](canvasView) {
        canvasView.onclick = this.onClick.bind(this)
        canvasView.ondblclick = this.onDbClick.bind(this)
        canvasView.onmousedown = this.onMouseDown.bind(this)
        canvasView.onmousemove = this.onMouseMove.bind(this)
        canvasView.onmouseup = this.onMouseUp.bind(this)
        canvasView.onmousewheel = this.onMouseWheel.bind(this)
        canvasView.onresize = this.onResize.bind(this)
    } // Function [bindEvent]()

    /**
     * 获取canvas的宽度  
     */

    get width() {
        return this.canvasView.width
    }

    get height() {
        return this.canvasView.height
    }

    /**
     * 将场景中的xy坐标转换成视图坐标。
     *
     * @param   x       场景中的横坐标
     * @param   y       场景中的纵坐标
     *
     * @return  SPoint
     */
    mapFromScene(x, y = null) {
            if (typeof(x) === 'object') { // 如果传入的是SPoint对象
                return new SPoint(x.x * this.scale + this.pos.x, x.y * this.scale + this.pos.y)
            }

            return new SPoint(x * this.scale + this.pos.x, y * this.scale + this.pos.y)
        } // Function mapFromScene()

    /**
     * 将item中的xy坐标转换成场景坐标。
     *
     * @param   x       item中的横坐标
     * @param   y       item中的纵坐标
     * @return  SPoint
     */
    mapToScene(x, y = null) {
            if (typeof(x) === 'object') { // 如果传入的是SPoint对象
                return new SPoint((x.x - this.pos.x) / this.scale, (x.y - this.pos.y) / this.scale)
            }

            return new SPoint((x - this.pos.x) / this.scale, (y - this.pos.y) / this.scale)
        } // Function mapToScene()

    /**
     * 缩放视图时计算视图的位置与缩放比例
     *
     * @param   zoom        缩放比例
     * @param   x0          缩放计算的中心点X坐标
     * @param   y0          缩放计算的中心点Y坐标
     */
    scaleByPoint(zoom, x0, y0) {
            let z = zoom
                /**
                 * 缩放比例在最小比例和最大比例范围内
                 */
            if (this.scale * zoom >= this.maxScale) { // 大于最大缩放比例
                z = this.maxScale / this.scale
                this.scale = this.maxScale
            } else if (this.scale * zoom <= this.minScale) { // 小于最小绽放比例
                z = this.minScale / this.scale
                this.scale = this.minScale
            } else {
                this.scale *= zoom
            }

            this.pos.x = x0 - (x0 - this.pos.x) * z
            this.pos.y = y0 - (y0 - this.pos.y) * z

            // EventBus.getDefault().post(SGraphyViewZoomEvent(this, scale))
            // EventBus.getDefault().post(SGraphyViewMoveEvent(this, pos.x, pos.y))
            // return
        } // Function scaleByPoint()
        // ===================================================================================================================
        // 事件
    onDraw() {
            this.canvas.save()
            this.canvas.clearRect(0, 0, this.canvasView.width, this.canvasView.height)
            this.canvas.restore()

            if (this.scene != null) {
                // 绘制背景
                this.canvas.save()
                this.scene.drawBackground(this.canvas)
                this.canvas.restore()

                // 绘制场景
                this.canvas.save()
                this.canvas.translate(this.pos.x, this.pos.y)
                this.canvas.scale(this.scale, this.scale)
                this.scene.drawScene(this.canvas)
                this.canvas.restore()

                // 绘制前景
                this.canvas.save()
                this.scene.drawForeground(this.canvas)
                this.canvas.restore()
            }

            window.requestAnimationFrame(this.onDraw.bind(this))
        } // Function onDraw()

    /**
     * 鼠标单击事件
     *
     * @param   e   保存事件参数
     */
    onClick(e) {
            if (this.scene != null) {
                let se = this[toSceneMotionEvent](e)
                this.scene.onClick(se)
            }
        } // Function onClick()

    /**
     * 鼠标双击事件
     *
     * @param   e   保存事件参数
     */
    onDbClick(e) {
            if (this.scene != null) {
                let ce = this[toSceneMotionEvent](e)
                this.scene.onDbClick(ce)
            }
        } // Function onDbClick()

    /**
     * 鼠标按下事件
     *
     * @param   e   保存事件参数
     */
    onMouseDown(e) {
            let se = new SMouseEvent(e)
            if (se.buttons & SMouseEvent.MIDDLE_BUTTON) { // 如果按下中键
                this._midKeyX = e.x
                this._midKeyY = e.y
            }

            if (this.scene != null) {
                let ce = this[toSceneMotionEvent](e)
                this.scene.onMouseDown(ce)
            }
        } // Function onMouseDown()

    /**
     * 鼠标移动事件
     *
     * @param   e   保存事件参数
     */
    onMouseMove(e) {
            let se = new SMouseEvent(e)
            if (se.buttons & SMouseEvent.MIDDLE_BUTTON) { // 如果按下中键，则移动视图
                this.pos.x += e.x - this._midKeyX
                this.pos.y += e.y - this._midKeyY
                this._midKeyX = e.x
                this._midKeyY = e.y
                return
            }
            if (this.scene != null) {
                let ce = this[toSceneMotionEvent](e)
                this.scene.onMouseMove(ce)
            }
        } // Function onMouseMove()

    /**
     * 释放鼠标事件
     *
     * @param   e   保存事件参数
     */
    onMouseUp(e) {
            if (this.scene != null) {
                let ce = this[toSceneMotionEvent](e)
                this.scene.onMouseUp(ce)
            }
        } // Function onMouseUp()

    /**
     * 鼠标滚轮事件
     *
     * @param   e   保存事件参数
     */
    onMouseWheel(e) {
            let se = new SMouseEvent(e)
            if (e.wheelDelta < 0) {
                this.scaleByPoint(1 / this.wheelZoom, se.x, se.y)
            } else {
                this.scaleByPoint(this.wheelZoom, se.x, se.y)
            }
        } // Function onMouseWheel()

    /**
     * View大小发生变化事件
     *
     * @param   e   保存事件参数
     */
    onResize(e) {} // Function onResize()

    /**
     * MotionEvent转场景对象MotionEvent
     *
     * @param   e       MotionEvent
     * @return  子对象MotionEvent
     */
    [toSceneMotionEvent](e) {
        let se = new SMouseEvent(e)
        se.x = (se.x - this.pos.x) / this.scale
        se.y = (se.y - this.pos.y) / this.scale
        return se
    } // Function toSceneMotionEvent()
} // Class SGraphyView