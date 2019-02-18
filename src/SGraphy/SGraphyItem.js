/*
 * ********************************************************************************************************************
 *
 *               iFHS7.
 *              ;BBMBMBMc                  rZMBMBR              BMB
 *              MBEr:;PBM,               7MBMMEOBB:             BBB                       RBW
 *     XK:      BO     SB.     :SZ       MBM.       c;;     ir  BBM :FFr       :SSF:    ;xBMB:r   iuGXv.    i:. iF2;
 *     DBBM0r.  :D     S7   ;XMBMB       GMBMu.     MBM:   BMB  MBMBBBMBMS   WMBMBMBBK  MBMBMBM  BMBRBMBW  .MBMBMBMBB
 *      :JMRMMD  ..    ,  1MMRM1;         ;MBMBBR:   MBM  ;MB:  BMB:   MBM. RMBr   sBMH   BM0         UMB,  BMB.  KMBv
 *     ;.   XOW  B1; :uM: 1RE,   i           .2BMBs  rMB. MBO   MBO    JMB; MBB     MBM   BBS    7MBMBOBM:  MBW   :BMc
 *     OBRJ.SEE  MRDOWOR, 3DE:7OBM       .     ;BMB   RMR7BM    BMB    MBB. BMB    ,BMR  .BBZ   MMB   rMB,  BMM   rMB7
 *     :FBRO0D0  RKXSXPR. JOKOOMPi       BMBSSWBMB;    BMBB:    MBMB0ZMBMS  .BMBOXRBMB    MBMDE RBM2;SMBM;  MBB   xBM2
 *         iZGE  O0SHSPO. uGZ7.          sBMBMBDL      :BMO     OZu:BMBK,     rRBMB0;     ,EBMB  xBMBr:ER.  RDU   :OO;
 *     ,BZ, 1D0  RPSFHXR. xWZ .SMr                  . .BBB
 *      :0BMRDG  RESSSKR. 2WOMBW;                   BMBMR
 *         i0BM: SWKHKGO  MBDv
 *           .UB  OOGDM. MK,                                          Copyright (c) 2015-2018.  斯伯坦机器人世界
 *              ,  XMW  ..
 *                  r                                                                     All rights reserved.
 *
 * ********************************************************************************************************************
 */
import SPoint from './types/SPoint'
import SRect from './types/SRect'
import SMouseEvent from './SMouseEvent'

const sortItemZOrder = Symbol('sortItemZOrder')
const toChildMouseEvent = Symbol('toChildMouseEvent')
const grabItem = Symbol('grabItem')
const releaseItem = Symbol('releaseItem')

/**
 * SGraphyItem
 *
 * @author  Andy
 */
export default class SGraphyItem {
    /**
     * 构造函数
     */
    constructor(parent) {
            this.name = 'item'
            this._scene = null
            this._parent = parent
            this.children = []

            /** Z轴顺序 */
            this.zOrder = 0
                /** item位置 */
            this._pos = new SPoint(0, 0)
                /** 缩放比例 */
            this._scale = new SPoint(1, 1)
                /** 是否可见 */
            this._isVisible = true

            /** 鼠标按下时位置 */
            this._mouseDownPos = new SPoint(4, 21)
            this._isMove = false
            this.canMove = false
        } // Function constructor()

    // ===================================================================================================================
    // 属性
    /** parent属性存值函数 */
    get parent() {
        return this._parent
    }
    set parent(value) {
            if (this._parent === value) {
                return
            }
            if (this._parent != null) { // 如果原parent不为空
                // 将节点从原parent节点中摘除
                let i = this._parent.children.indexOf(this)
                this._parent.children.splice(i, 1)
            }
            this._parent = value

            if (this._parent != null) { // 如果新parent不为空
                // 将节点加入到新parent节点中
                this._parent.children.push(this)
                this._parent.children.sort(this[sortItemZOrder])
            }
            this._parent = value
        } // Function set Parent()

    /** scene属性 */
    get scene() {
        if (this._parent != null) {
            return this._parent.scene
        } else {
            return this._scene
        }
    }

    /** pos属性 */
    get pos() {
        return this._pos
    }
    set pos(value) {
        this._pos = value
    }

    /** scale属性 */
    get scale() {
        return this._scale
    }
    set scale(value) {
        this._scale = value
    }

    /** visible属性 */
    get visible() {
        return this._isVisible
    }
    set visible(value) {
        this._isVisible = value
    }

    // ===================================================================================================================
    // 函数
    /**
     * Item对象边界区域
     *
     * @return  SRect
     */
    boundingRect() {
            return new SRect(0, 0, 10, 10)
        } // Function boundingRect()

    /**
     * Item绘制操作
     *
     * @param   canvas        画布对象
     * @param   rect          绘制区域
     */
    onDraw(canvas, rect) {
            for (let item of this.children) {
                // 保存画布状态
                canvas.save()
                    // item位移到指定位置绘制
                canvas.translate(item.pos.x, item.pos.y)
                    // 设置绘制区域
                    // canvas.clip(item.boundingRect())
                    // 绘制item
                item.onDraw(canvas, rect)
                    // 恢复画布状态
                canvas.restore()
            }
        } // Function onDraw()

    /**
     * 更新Item
     */
    update() {
            // TODO: PLX
            // scene?.update()
        } // Function update()

    /**
     * 移动item到指定位置
     *
     * @param   x           新位置的x坐标
     * @param   y           新位置的y坐标
     */
    moveTo(x, y) {
            this.pos = new SPoint(x, y)
        } // moveTo()

    /**
     * 判断item是否包含点x,y
     *
     * @param   x       横坐标（当前item）
     * @param   y       纵坐标（当前item）
     *
     * @return  boolean
     */
    contains(x, y) {
            return this.boundingRect().contains(x - this.pos.x, y - this.pos.y)
        } // Function contains()

    /**
     * 获得item的路径节点列表。（该节点被加载到场景中，如果未被加载到场景中，计算会出错）
     *
     * @return  *[]
     */
    itemPath() {
            if (this.parent != null) {
                let list = this.parent.itemPath()
                list.push(this)
                return list
            }

            return [this]
        } // Function itemPath()

    /**
     * 将场景中的xy坐标转换成item坐标。（该节点被加载到场景中，如果未被加载到场景中，计算会出错）
     *
     * @param   x       场景中的横坐标
     * @param   y       场景中的纵坐标
     *
     * @return  在item中的坐标
     */
    mapFromScene(x, y) {
            let list = this.itemPath()
            let x0 = x
            let y0 = y
            for (let item of list) {
                x0 = (x0 - item.pos.x) / item.scale.x
                y0 = (y0 - item.pos.y) / item.scale.y
            }

            return new SPoint(x0, y0)
        } // Function mapFromScene()

    /**
     * 将item中的xy坐标转换成场景坐标。（该节点被加载到场景中，如果未被加载到场景中，计算会出错）
     *
     * @param   x       item中的横坐标
     * @param   y       item中的纵坐标
     *
     * @return  在场景中的坐标
     */
    mapToScene(x, y) {
            if (this.parent == null) {
                return new SPoint(x, y)
            }

            return this.parent.mapToScene(x * this.scale.x + this.pos.x, y * this.scale.y + this.pos.y)
        } // Function mapToScene()

    // ===================================================================================================================
    // 事件
    /**
     * 鼠标单击事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onClick(e) {
            for (let item of this.children) {
                if (!item.visible) { // 如果项目不可见
                    continue
                }
                let ce = this[toChildMouseEvent](item, e)
                if (item.contains(e.x, e.y) && item.onClick(ce)) { // 如果点在子项目上且子项目处理了事件
                    return true
                }
            }

            return false
        } // Function onClick()

    /**
     * 鼠标双击事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onDbClick(e) {
            for (let item of this.children) {
                if (!item.visible) { // 如果项目不可见
                    continue
                }
                let ce = this[toChildMouseEvent](item, e)
                if (item.contains(e.x, e.y) && item.onDbClick(ce)) { // 如果点在子项目上且子项目处理了事件
                    return true
                }
            }

            return false
        } // Function onClick()

    /**
     * 鼠标按下事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onMouseDown(e) {
            // console.log(e)

            for (let item of this.children) {
                if (!item.visible) { // 如果项目不可见
                    continue
                }
                let ce = this[toChildMouseEvent](item, e)
                if (item.contains(e.x, e.y) && item.onMouseDown(ce)) { // 如果点在子项目上且子项目处理了事件
                    return true
                }
            }

            if (this.canMove) {
                this._mouseDownPos = new SPoint(e.x, e.y)
                this._isMove = true
                this[grabItem](this)
                    // console.log(this.scene.grabItem)
                return true
            }
            return false
        } // Function onMouseDown()

    /**
     * 鼠标移动事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onMouseMove(e) {
            for (let item of this.children) {
                if (!item.visible) { // 如果项目不可见
                    continue
                }
                let ce = this[toChildMouseEvent](item, e)
                if (item.contains(e.x, e.y) && item.onMouseMove(ce)) { // 如果点在子项目上且子项目处理了事件
                    return true
                }
            }

            if (e.buttons & SMouseEvent.LEFT_BUTTON && this.canMove && this._isMove) {
                this.moveTo(this.pos.x + e.x - this._mouseDownPos.x, this.pos.y + e.y - this._mouseDownPos.y)
            }

            return false
        } // Function onMouseMove()

    /**
     * 释放鼠标事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onMouseUp(e) {
            for (let item of this.children) {
                if (!item.visible) { // 如果项目不可见
                    continue
                }
                let ce = this[toChildMouseEvent](item, e)
                if (item.contains(e.x, e.y) && item.onMouseUp(ce)) { // 如果点在子项目上且子项目处理了事件
                    return true
                }
            }

            this._isMove = false
            this[releaseItem]()
            return false
        } // Function onMouseUp()

    // ===================================================================================================================
    // 私有方法
    /**
     * 按ZOrder排序
     *
     * @param   a   比较元素1
     * @param   b   比较元素2
     * @return {number}
     */
    [sortItemZOrder](a, b) {
        return a.zOrder - b.zOrder
    } // Function sortItemZOrder()

    /**
     * 鼠标事件转子对象鼠标事件
     *
     * @param   child   子对象e
     * @param   e       事件参数
     * @return  {}
     */
    [toChildMouseEvent](child, e) {
        let ce = {...e }
        ce.x = (e.x - child.pos.x) / child.scale.x
        ce.y = (e.y - child.pos.y) / child.scale.y
        return ce
    } // Function toChildMouseEvent()

    /**
     * 锁定item
     *
     * @param   item    被锁定的item
     */
    [grabItem](item) {
        if (this.scene != null) {
            this.scene.grabItem = item
        }
    } // Function grabItem

    /**
     * 释放被锁定的item
     */
    [releaseItem]() {
        if (this.scene != null) {
            this.scene.grabItem = null
        }
    } // Function grabItem
} // Class SGraphyItem