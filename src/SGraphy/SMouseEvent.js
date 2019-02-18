/**
 * 鼠标事件
 *
 * @author  chuwu0
 */
export default class SMouseEvent {
    /**
     * 构造函数
     *
     * @param   e       系统鼠标事件
     */
    constructor(e) {
            let bbox = e.srcElement.getBoundingClientRect()
            this.type = e.type
            this.x = e.clientX - bbox.left
            this.y = e.clientY - bbox.top
            this.screenX = e.screenX
            this.screenY = e.screenY
            this.clientX = e.clientX
            this.clientY = e.clientY
            this.altKey = e.altKey
            this.ctrlKey = e.ctrlKey
            this.buttons = e.buttons
            this.wheelDelta = e.wheelDelta
        } // Function constructor()
} // Class MouseEvent

SMouseEvent.LEFT_BUTTON = 0x01
SMouseEvent.RIGHT_BUTTON = 0x02
SMouseEvent.MIDDLE_BUTTON = 0x04