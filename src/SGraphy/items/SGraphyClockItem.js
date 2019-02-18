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

import SGraphyItem from '../SGraphyItem'
import SRect from '../types/SRect'

/** 定义符号，用于定义私有成员变晴儿 */
const drawScale     = Symbol('drawScale')
const drawScaleText = Symbol('drawScaleText')
const drawHour      = Symbol('drawHour')
const drawMinute    = Symbol('drawMinute')
const drawSecond    = Symbol('drawSecond')

/**
 * SGraphy引擎时钟Item
 *
 * @author  Andy
 */
export default class SGraphyClockItem extends SGraphyItem {
  /**
   * 构造函数
   *
   * @param   parent    指向父对象
   */
  constructor(width, height, parent = null) {
    super(parent)
    this.name = 'ClockItem'
    this.width = width
    this.height = height
    /** 是否显示刻度 */
    this.isShowScale = true
    /** 刻度颜色 */
    this.scaleColor = '#000'
    /** 刻度文本颜色 */
    this.textColor = '#000'
    /** 时针颜色 */
    this.hourColor = '#000'
    /** 分针颜色 */
    this.minuteColor = '#000'
    /** 秒针颜色 */
    this.secondColor = '#F00'
    /** 是否显示钞针 */
    this.isShowSecond = true
    /** 是否平滑移动秒针 */
    this.isSmooth = true
    /** 边缘宽度 */
    this.padding = 100.0
  } // Function constructor()

  /**
   * Item对象边界区域
   *
   * @return  SRect
   */
  boundingRect() {
    return new SRect(0, 0, this.width / 2, this.height / 2)
  } // Function boundingRect()

  /**
   * 时钟半径，只读属性
   *
   * @return  number
   */
  get radius() {
    return Math.min(this.width, this.height) / 2.0
  } // getter radius()

  /**
   * 绘制时钟
   *
   * @param   canvas      画布
   * @param   rect        绘制区域
   */
  onDraw(canvas, rect) {
    canvas.translate(this.width / 2, this.height / 2)
    canvas.arc(0, 0, this.radius, 0, 2 * Math.PI)
    let t = new Date()

    this[drawScale](canvas)
    this[drawHour](canvas, t.getHours(), t.getMinutes(), t.getSeconds())
    this[drawMinute](canvas, t.getMinutes(), t.getSeconds())
    this[drawSecond](canvas, t.getSeconds() + t.getMilliseconds() / 1000.0)
  } // Function onDraw()

  /**
   * 绘制刻度
   *
   * @param   canvas      画布
   */
  [drawScale](canvas) {
    let scaleLength = Math.max(this.radius / 10.0, 2.0)
    let scaleLength1 = scaleLength * 1.2
    let strokeWidth = Math.max(this.radius / 100.0, 2.0)
    let strokeWidth1 = strokeWidth * 2.0

    canvas.save()
    canvas.strokeStyle = this.scaleColor

    for (let i = 1; i <= 12; i++) {          // 12小时刻度
      canvas.lineWidth = strokeWidth1
      canvas.drawLine(0, -this.radius, 0, -this.radius + scaleLength1)

      if (this.radius >= 40) {              // 如果半度大于40显示分钟刻度
        canvas.rotate(6 * Math.PI / 180)
        for (let j = 1; j <= 4; j++) {       // 分钟刻度
          canvas.lineWidth = strokeWidth
          canvas.drawLine(0, -this.radius, 0, -this.radius + scaleLength)
          canvas.rotate(6 * Math.PI / 180)
        }
      } else {
        canvas.rotate(30 * Math.PI / 180)
      }
    }

    canvas.restore()
  } // Function drawScale()

  /**
   * 绘制刻度数字
   *
   * @param   canvas      画布
   */
  [drawScaleText](canvas) {

  } // Function drawScaleText()

  /**
   * 绘制时针
   *
   * @param   canvas      画布
   * @param   hour        时
   * @param   minute      分
   * @param   second      秒
   */
  [drawHour](canvas, hour, minute, second) {
    canvas.save()
    canvas.lineCap = 'round'
    canvas.lineWidth = Math.max(this.radius / 30.0, 4.0)
    canvas.strokeStyle = this.hourColor
    canvas.rotate((hour * 30.0 + minute * 30.0 / 60 + second * 30.0 / 60 / 60) * Math.PI / 180)
    canvas.drawLine(0, this.radius / 10.0, 0, -this.radius / 2.0)
    canvas.restore()
  } // Function drawHour()

  /**
   * 绘制分针
   *
   * @param   canvas      画布
   * @param   minute      分
   * @param   second      秒
   */
  [drawMinute](canvas, minute, second) {
    canvas.save()
    canvas.lineCap = 'round'
    canvas.lineWidth = Math.max(this.radius / 40.0, 4.0)
    canvas.strokeStyle = this.minuteColor
    canvas.rotate((minute * 6 + second * 6 / 60.0) * Math.PI / 180.0)
    canvas.drawLine(0, this.radius / 10.0, 0, -this.radius * 2.0 / 3.0)
    canvas.restore()
  } // Function drawMinute()

  /**
   * 绘制秒针
   *
   * @param   canvas      画布
   * @param   second      秒
   */
  [drawSecond](canvas, second) {
    canvas.save()
    canvas.lineCap = 'round'
    canvas.lineWidth = Math.max(this.radius / 100.0, 3.0)
    canvas.strokeStyle = this.secondColor
    canvas.rotate(second * 6 * Math.PI / 180)
    canvas.drawLine(0, this.radius / 5.0, 0, -this.radius + this.radius / 10.0)
    // canvas.drawCircle(0, 0, this.radius / 30.0)
    // canvas.drawCircle(0, -this.radius + this.radius / 5.0, this.radius / 60.0)
    // canvas.strokeStyle = Color.YELLOW
    // canvas.drawCircle(0, 0, this.radius / 100.0)
    canvas.restore()
  } // Function drawSecond()
} // Class SGraphyClockItem
