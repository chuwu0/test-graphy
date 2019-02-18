'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var SGraphyPolygonItem = function (_SGraphyItem) {
    _inherits(SGraphyPolygonItem, _SGraphyItem);

    function SGraphyPolygonItem(jsonArr, lineWidth, color, fillColor) {
        var parent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        _classCallCheck(this, SGraphyPolygonItem);

        var _this = _possibleConstructorReturn(this, (SGraphyPolygonItem.__proto__ || Object.getPrototypeOf(SGraphyPolygonItem)).call(this, parent));

        _this.jsonArr = jsonArr;
        _this.lineWidth = lineWidth;
        _this.color = color;
        _this.fillColor = fillColor;
        var xArr = getItem(_this.jsonArr, 'X');
        var yArr = getItem(_this.jsonArr, 'Y');
        _this.minX = Math.min.apply(null, xArr) || 0;
        _this.minY = Math.min.apply(null, yArr) || 0;
        _this.width = Math.max.apply(null, xArr) - _this.minX || 0;
        _this.height = Math.max.apply(null, yArr) - _this.minY || 0;
        _this.type = 5;
        return _this;
    }

    _createClass(SGraphyPolygonItem, [{
        key: 'boundingRect',
        value: function boundingRect() {
            return new _SRect2.default(this.minX, this.minY, this.width, this.height);
        }
    }, {
        key: 'onDraw',
        value: function onDraw(canvas, rect) {
            if (this.jsonArr && this.jsonArr.length) {
                canvas.beginPath();
                canvas.lineWidth = 240;
                canvas.lineCap = 'butt';
                canvas.strokeStyle = this.color || '#000';
                canvas.fillStyle = this.fillColor || '#fff';
                canvas.moveTo(this.jsonArr[0].X, this.jsonArr[0].Y);
                for (var i = 1; i < this.jsonArr.length; i++) {
                    canvas.lineTo(this.jsonArr[i].X, this.jsonArr[i].Y);
                }
                canvas.lineTo(this.jsonArr[0].X, this.jsonArr[0].Y);
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
            }
        }
    }]);

    return SGraphyPolygonItem;
}(_SGraphyItem3.default);

exports.default = SGraphyPolygonItem;