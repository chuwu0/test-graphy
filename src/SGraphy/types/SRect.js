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

/**
 * 矩形
 *
 * @author  Andy
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
    if (typeof (x) === 'object') {     // 如果传入的是SPoint对象
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
