/**
 * Canvas功能扩展
 *
 * @author  chuwu0
 */
Object.assign(CanvasRenderingContext2D.prototype, {
        /**
         * 绘制线段
         *
         * @param   x0    起点x坐标
         * @param   y0    起点y坐标
         * @param   x1    终点x坐标
         * @param   y1    终点y坐标
         */
        drawLine(x0, y0, x1, y1) {
            this.beginPath()
            this.moveTo(x0, y0)
            this.lineTo(x1, y1)
            this.stroke()
        } // Function drawLine()
    }) // Class CanvasRenderingContext2D