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
 * 鼠标事件
 *
 * @author  Andy
 */
export default class SMouseEvent {
  /**
   * 构造函数
   *
   * @param   e       系统鼠标事件
   */
  constructor(e) {
    let bbox          = e.srcElement.getBoundingClientRect()
    this.type         = e.type
    this.x            = e.clientX - bbox.left
    this.y            = e.clientY - bbox.top
    this.screenX      = e.screenX
    this.screenY      = e.screenY
    this.clientX      = e.clientX
    this.clientY      = e.clientY
    this.altKey       = e.altKey
    this.ctrlKey      = e.ctrlKey
    this.buttons      = e.buttons
    this.wheelDelta   = e.wheelDelta
  } // Function constructor()
} // Class MouseEvent

SMouseEvent.LEFT_BUTTON   = 0x01
SMouseEvent.RIGHT_BUTTON  = 0x02
SMouseEvent.MIDDLE_BUTTON = 0x04
