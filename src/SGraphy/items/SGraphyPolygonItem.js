/**
 * 不规则多边形，元空间
 */
import SGraphyItem from '../../node-templete/SGraphy/SGraphyItem'
import SRect from '../../node-templete/SGraphy/types/SRect';

function getItem(arr, name) {
    if (arr && arr.length) {
        return arr.map(item => {
            return item[name]
        })
    } else {
        return [0]
    }
}

function changeArr(arr) {
    if (arr && arr.length) {
        return arr.map(item => {
            return [
                item.X, item.Y
            ]
        })
    } else {
        return [0]
    }
}
/**
 * 求不规则多边形重点
 * @param {points} 数组，多个点位坐标
 *  
 * @return {x, y} 重点点位坐标
 */
// function getCenterOfGravityPoint(points) {
//     let area = 0,
//         gx = 0,
//         gy = 0,
//         i = 1,
//         px1, px2, py1, py2, temp, length = points.length;
//     for (i; i <= length; i++) {
//         px1 = points[(i % length)].X;
//         px2 = points[(i - 1)].X;
//         py1 = points[(i % length)].Y;
//         py2 = points[(i - 1)].Y;
//         temp = (px1 * py2 - py1 * px2) / 2
//         area += temp;
//         gx += temp * (px1 + px2) / 3
//         gy += temp * (py1 + py2) / 3
//     }

//     gx = gx / area
//     gy = gy / area

//     return {
//         x: gx,
//         y: gy
//     }
// }


export default class SGraphyPolygonItem extends SGraphyItem {
    /**
     * 
     * 构造函数
     * 
     * @param jsonArr  空间线条数组
     * @param lineWidth    空间线条的宽度
     * @param color    空间线条的颜色
     * @param fillColor  空间的填充颜色
     * 
     */
    constructor(jsonArr, lineWidth, color, fillColor, id, centerOfGravityPoint, name, paths, faceColor, businessColor, isBusiness, parent = null) {
            super(parent)
            this.jsonArr = jsonArr
            this.lineWidth = lineWidth
            this.color = color
            this.id = id
            this.name = name //实际渲染名字
            this.fillColor = fillColor
            let xArr = getItem(this.jsonArr, 'X')
            let yArr = getItem(this.jsonArr, 'Y')
            this.minX = Math.min.apply(null, xArr) || 0
            this.maxX = Math.max.apply(null, xArr) || 0
            this.maxY = Math.max.apply(null, yArr) || 0
            this.minY = Math.min.apply(null, yArr) || 0
            this.width = this.maxX - this.minX || 0
            this.height = this.maxY - this.minY || 0
            this.type = 3
            this.businessName = null
            this.faceColor = faceColor || '#cacaca' //颜色
            this.businessId = null //业务空间id
            this.isBusiness = isBusiness || 1 //状态
            this.businessColor = businessColor || 'rgba(68,161,140,.4)' //业务空间颜色
            this.businessFaceColor = "#333"
            this.containsArr = changeArr(this.jsonArr)
            this.paths = null
            if (paths && paths.length > 1) {
                this.paths = paths.map(item => {
                    if (item && item.length) {
                        return changeArr(item)
                    } else {
                        return undefined
                    }
                }).filter(d => d)
            }
            this.centerOfGravityPoint = centerOfGravityPoint
        } //constructor

    /**
     * Item的边界区域
     * 
     * @return SRect
     */
    boundingRect() {
        return new SRect(this.minX, this.minY, this.width, this.height)
    }


    /**
     * 判断item是否包含点x,y
     *
     * @param   x       横坐标（当前item）
     * @param   y       纵坐标（当前item）
     *
     * @return  boolean
     */
    contains(x, y) {
        let falg = false,
            isFullIn = false //是否在镂空图形内
        if (this.paths instanceof Array) {
            for (let i = 1; i < this.paths.length; i++) {
                if (this.isIn(x, y, this.paths[i])) {
                    //位置信息在镂空图形内
                    isFullIn = true
                    break
                }
            }
            // //如果鼠标在大图形内切在镂空图形中返回false
            if (this.isIn(x, y, this.containsArr) && isFullIn) {
                falg = false
            } else if (this.isIn(x, y, this.containsArr) && !isFullIn) {
                falg = true
            } else {
                falg = this.isIn(x, y, this.containsArr)
            }
        } else {
            falg = this.isIn(x, y, this.containsArr)
        }
        return falg
    }


    isIn(x, y, json) {
        let nCross = 0,
            point = typeof(x) == 'object' ? [x.x, x.y] : [x, y],
            APoints = json,
            length = APoints.length,
            p1, p2, i, xinters;
        p1 = APoints[0];
        for (i = 1; i <= length; i++) {
            p2 = APoints[i % length];
            if (
                point[0] > Math.min(p1[0], p2[0]) &&
                point[0] <= Math.max(p1[0], p2[0])
            ) {
                if (point[1] <= Math.max(p1[1], p2[1])) {
                    if (p1[0] != p2[0]) {
                        //计算位置信息
                        xinters = (point[0] - p1[0]) * (p2[1] - p1[1]) / (p2[0] - p1[0]) + p1[1];
                        if (p1[1] == p2[1] || point[1] <= xinters) {
                            nCross++
                        }
                    }
                }
            }
            p1 = p2;
        }
        if (nCross % 2 == 0) {
            return false
        } else {
            return true
        }

    }

    /**
     * 绘制不规则多边形
     * 
     * @param canvas 画布
     * @param rect   绘制区域
     */
    onDraw(canvas, rect) {
        if (this.jsonArr && this.jsonArr.length) {
            canvas.beginPath();
            canvas.lineWidth = 220
            canvas.lineCap = 'butt';
            if (this.isBusiness == 1) {
                canvas.strokeStyle = this.color || '#000'
                canvas.fillStyle = this.fillColor
            } else if (this.isBusiness == 2) {
                //已有id 的业务空间
                canvas.strokeStyle = this.color || '#000'
                canvas.fillStyle = this.businessColor || '#fff'
            } else if (this.isBusiness == 3) {
                //被选择的元空间
                canvas.strokeStyle = this.color || '#000'
                canvas.lineWidth = 800
                canvas.fillStyle = '#1abc9c'
            } else if (this.isBusiness == 4) {
                canvas.strokeStyle = 'rgba(251,226,1,.8)' || '#000'
                canvas.fillStyle = '#fff' || '#fff'
            } else if (this.isBusiness == 5) {
                canvas.fillStyle = 'rgba(11,12,12,.2)' || '#fff'
            } else if (this.isBusiness == 6) {
                canvas.fillStyle = '#1abc9c'
                canvas.lineWidth = 800
                canvas.strokeStyle = 'rgba(68,161,140,.4)' || '#fff'
            } else if (this.isBusiness == 7) {
                canvas.strokeStyle = this.color || '#000'
                canvas.fillStyle = this.businessColor || '#fff'
            }
            canvas.moveTo(this.jsonArr[0].X, this.jsonArr[0].Y)
            for (let i = 1; i < this.jsonArr.length; i++) {
                canvas.lineTo(this.jsonArr[i].X, this.jsonArr[i].Y)
            }
            canvas.lineTo(this.jsonArr[0].X, this.jsonArr[0].Y)
            canvas.closePath()
            canvas.fill()
            canvas.stroke()
            if (!!this.name) {
                canvas.font = "normal small-caps bold 500px Arial";
                if (this.isBusiness == 1) {
                    canvas.fillStyle = this.faceColor
                } else if (this.isBusiness == 2) {
                    canvas.fillStyle = this.businessFaceColor;
                } else if (this.isBusiness == 3) {
                    //业务空间异常状态
                    canvas.fillStyle = '#fff'
                } else if (this.isBusiness == 4) {
                    canvas.fillStyle = '#cacaca'
                } else if (this.isBusiness == 6) {
                    canvas.fillStyle = '#fff'
                } else if (this.isBusiness == 7) {
                    canvas.fillStyle = 'red'
                }
                if (!!this.businessName || !!this.businessId) {
                    name = '👇   ' + this.businessName
                } else {
                    name = '⬇️   ' + this.name
                }
                canvas.fillText(name, this.centerOfGravityPoint.x, this.centerOfGravityPoint.y);
                // canvas.fillText(this.name, (this.maxX - this.minX) / 2 + this.minX, (this.maxY - this.minY) / 2 + this.minY);
            }
            // canvas.fillText(this.name, this.jsonArr[0].X, this.jsonArr[0].Y);
        }
    }
}