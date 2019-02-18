'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SGraphyItem2 = require('../../node-templete/SGraphy/SGraphyItem');

var _SGraphyItem3 = _interopRequireDefault(_SGraphyItem2);

var _SRect = require('../../node-templete/SGraphy/types/SRect');

var _SRect2 = _interopRequireDefault(_SRect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getItem(arr, name) {
    if (arr && arr.length) {
        return arr.map(function (item) {
            return item[name];
        });
    } else {
        return [0];
    }
}

function changeArr(arr) {
    if (arr && arr.length) {
        return arr.map(function (item) {
            return [item.X, item.Y];
        });
    } else {
        return [0];
    }
}

var SGraphyPolygonItem = function (_SGraphyItem) {
    _inherits(SGraphyPolygonItem, _SGraphyItem);

    function SGraphyPolygonItem(jsonArr, lineWidth, color, fillColor, id, centerOfGravityPoint, name, paths, faceColor, businessColor, isBusiness) {
        var parent = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : null;

        _classCallCheck(this, SGraphyPolygonItem);

        var _this = _possibleConstructorReturn(this, (SGraphyPolygonItem.__proto__ || Object.getPrototypeOf(SGraphyPolygonItem)).call(this, parent));

        _this.jsonArr = jsonArr;
        _this.lineWidth = lineWidth;
        _this.color = color;
        _this.id = id;
        _this.name = name;
        _this.fillColor = fillColor;
        var xArr = getItem(_this.jsonArr, 'X');
        var yArr = getItem(_this.jsonArr, 'Y');
        _this.minX = Math.min.apply(null, xArr) || 0;
        _this.maxX = Math.max.apply(null, xArr) || 0;
        _this.maxY = Math.max.apply(null, yArr) || 0;
        _this.minY = Math.min.apply(null, yArr) || 0;
        _this.width = _this.maxX - _this.minX || 0;
        _this.height = _this.maxY - _this.minY || 0;
        _this.type = 3;
        _this.businessName = null;
        _this.faceColor = faceColor || '#cacaca';
        _this.businessId = null;
        _this.isBusiness = isBusiness || 1;
        _this.businessColor = businessColor || 'rgba(68,161,140,.4)';
        _this.businessFaceColor = "#333";
        _this.containsArr = changeArr(_this.jsonArr);
        _this.paths = null;
        if (paths && paths.length > 1) {
            _this.paths = paths.map(function (item) {
                if (item && item.length) {
                    return changeArr(item);
                } else {
                    return undefined;
                }
            }).filter(function (d) {
                return d;
            });
        }
        _this.centerOfGravityPoint = centerOfGravityPoint;
        return _this;
    }

    _createClass(SGraphyPolygonItem, [{
        key: 'boundingRect',
        value: function boundingRect() {
            return new _SRect2.default(this.minX, this.minY, this.width, this.height);
        }
    }, {
        key: 'contains',
        value: function contains(x, y) {
            var falg = false,
                isFullIn = false;
            if (this.paths instanceof Array) {
                for (var i = 1; i < this.paths.length; i++) {
                    if (this.isIn(x, y, this.paths[i])) {
                        isFullIn = true;
                        break;
                    }
                }

                if (this.isIn(x, y, this.containsArr) && isFullIn) {
                    falg = false;
                } else if (this.isIn(x, y, this.containsArr) && !isFullIn) {
                    falg = true;
                } else {
                    falg = this.isIn(x, y, this.containsArr);
                }
            } else {
                falg = this.isIn(x, y, this.containsArr);
            }
            return falg;
        }
    }, {
        key: 'isIn',
        value: function isIn(x, y, json) {
            var nCross = 0,
                point = (typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object' ? [x.x, x.y] : [x, y],
                APoints = json,
                length = APoints.length,
                p1 = void 0,
                p2 = void 0,
                i = void 0,
                xinters = void 0;
            p1 = APoints[0];
            for (i = 1; i <= length; i++) {
                p2 = APoints[i % length];
                if (point[0] > Math.min(p1[0], p2[0]) && point[0] <= Math.max(p1[0], p2[0])) {
                    if (point[1] <= Math.max(p1[1], p2[1])) {
                        if (p1[0] != p2[0]) {
                            xinters = (point[0] - p1[0]) * (p2[1] - p1[1]) / (p2[0] - p1[0]) + p1[1];
                            if (p1[1] == p2[1] || point[1] <= xinters) {
                                nCross++;
                            }
                        }
                    }
                }
                p1 = p2;
            }
            if (nCross % 2 == 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'onDraw',
        value: function onDraw(canvas, rect) {
            if (this.jsonArr && this.jsonArr.length) {
                canvas.beginPath();
                canvas.lineWidth = 220;
                canvas.lineCap = 'butt';
                if (this.isBusiness == 1) {
                    canvas.strokeStyle = this.color || '#000';
                    canvas.fillStyle = this.fillColor;
                } else if (this.isBusiness == 2) {
                    canvas.strokeStyle = this.color || '#000';
                    canvas.fillStyle = this.businessColor || '#fff';
                } else if (this.isBusiness == 3) {
                    canvas.strokeStyle = this.color || '#000';
                    canvas.lineWidth = 800;
                    canvas.fillStyle = '#1abc9c';
                } else if (this.isBusiness == 4) {
                    canvas.strokeStyle = 'rgba(251,226,1,.8)' || '#000';
                    canvas.fillStyle = '#fff' || '#fff';
                } else if (this.isBusiness == 5) {
                    canvas.fillStyle = 'rgba(11,12,12,.2)' || '#fff';
                } else if (this.isBusiness == 6) {
                    canvas.fillStyle = '#1abc9c';
                    canvas.lineWidth = 800;
                    canvas.strokeStyle = 'rgba(68,161,140,.4)' || '#fff';
                } else if (this.isBusiness == 7) {
                    canvas.strokeStyle = this.color || '#000';
                    canvas.fillStyle = this.businessColor || '#fff';
                }
                canvas.moveTo(this.jsonArr[0].X, this.jsonArr[0].Y);
                for (var i = 1; i < this.jsonArr.length; i++) {
                    canvas.lineTo(this.jsonArr[i].X, this.jsonArr[i].Y);
                }
                canvas.lineTo(this.jsonArr[0].X, this.jsonArr[0].Y);
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                if (!!this.name) {
                    canvas.font = "normal small-caps bold 500px Arial";
                    if (this.isBusiness == 1) {
                        canvas.fillStyle = this.faceColor;
                    } else if (this.isBusiness == 2) {
                        canvas.fillStyle = this.businessFaceColor;
                    } else if (this.isBusiness == 3) {
                        canvas.fillStyle = '#fff';
                    } else if (this.isBusiness == 4) {
                        canvas.fillStyle = '#cacaca';
                    } else if (this.isBusiness == 6) {
                        canvas.fillStyle = '#fff';
                    } else if (this.isBusiness == 7) {
                        canvas.fillStyle = 'red';
                    }
                    if (!!this.businessName || !!this.businessId) {
                        name = '👇   ' + this.businessName;
                    } else {
                        name = '⬇️   ' + this.name;
                    }
                    canvas.fillText(name, this.centerOfGravityPoint.x, this.centerOfGravityPoint.y);
                }
            }
        }
    }]);

    return SGraphyPolygonItem;
}(_SGraphyItem3.default);

exports.default = SGraphyPolygonItem;