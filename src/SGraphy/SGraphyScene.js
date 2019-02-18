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
import SGraphyItem from './SGraphyItem'

const toGrabItemMotionEvent = Symbol('toGrabItemMotionEvent')

/**
 * SGraphy图形引擎场景类
 *
 * @author  Andy
 */
export default class SGraphyScene {
    /**
     * 构造函数
     */
    constructor() {
            this.view = null
            console.log(this, 'this')
            this.root = new SGraphyItem(null)
            this.root._scene = this
            this.pos = new SPoint(0, 0)
            this.scale = new SPoint(1, 1)
            this.grabItem = null
        } // Function constructor()

    /**
     * 添加item对象到场景。
     *
     * @param   item        添加的对象
     */
    addItem(item) {
            item.parent = this.root
        } // Function addItem()

    /**
     * 从场景中移除Item。
     *
     * @param   item        被移除的对象
     */
    removeItem(item) {
            item.parent = null
        } // Function removeItem()

    /**
     * 绘制场景
     *
     * @param   canvas      画布
     * @param   rect        更新绘制区域
     */
    drawScene(canvas, rect) {
            this.root.onDraw(canvas, rect)
        } // Function drawScene()

    /**
     * 绘制背景
     *
     * @param   canvas      画布
     * @param   rect        更新绘制区域
     */
    drawBackground(canvas, rect) {
            // DO NOTHING
        } // Function drawBackground()

    /**
     * 绘制前景
     *
     * @param   canvas      画布
     * @param   rect        更新绘制区域
     */
    drawForeground(canvas, rect) {
            // DO NOTHING
        } // Function drawForeground()

    /**
     * 返回场景的item边界。即所有item边界的并集。
     *
     * @return  SRect
     */
    worldRect() {
            let rect = null

            for (let item of this.root.children) { // 依次取item列中的所有item。将所有item的边界做并焦处理。
                if (rect == null) {
                    rect = item.boundingRect().adjusted(item.pos)
                } else {
                    rect.union(item.boundingRect().adjusted(item.pos))
                }
            }

            return rect
        } // Function worldsRect()

    /**
     * 更新
     */
    update() {} // Function update()
        // ===================================================================================================================
        // 事件
        /**
         * 鼠标单击事件
         *
         * @param   e   保存事件参数
         * @return  boolean
         */
    onClick(e) {
            if (this.grabItem != null) {
                return this.grabItem.onClick(this[toGrabItemMotionEvent](this.grabItem, e))
            }
            return this.root.onClick(e)
        } // onClick

    /**
     * 鼠标双击事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onDbClick(e) {
            if (this.grabItem != null) {
                return this.grabItem.onDbClick(this[toGrabItemMotionEvent](this.grabItem, e))
            }
            return this.root.onDbClick(e)
        } // onClick

    /**
     * 鼠标按下事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onMouseDown(e) {
            if (this.grabItem != null) {
                return this.grabItem.onMouseDown(this[toGrabItemMotionEvent](this.grabItem, e))
            }
            return this.root.onMouseDown(e)
        } // onMouseDown

    /**
     * 鼠标移动事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onMouseMove(e) {
            if (this.grabItem != null) {
                return this.grabItem.onMouseMove(this[toGrabItemMotionEvent](this.grabItem, e))
            }
            return this.root.onMouseMove(e)
        } // onMouseMove

    /**
     * 释放鼠标事件
     *
     * @param   e   保存事件参数
     * @return  boolean
     */
    onMouseUp(e) {
            if (this.grabItem != null) {
                return this.grabItem.onMouseUp(this[toGrabItemMotionEvent](this.grabItem, e))
            }
            return this.root.onMouseUp(e)
        } // onMouseUp

    /**
     * 转换场景事件坐标到指定Item坐标事件
     *
     * @param   item        指定的item对象
     * @param   e           场景事件
     * @return  {}
     */
    [toGrabItemMotionEvent](item, e) {
        let se = {...e }
        let p = item.mapFromScene(e.x, e.y)
        se.x = p.x
        se.y = p.y
        return se
    } // Function toGrabItemMotionEvent()
} // Class SGraphyScene