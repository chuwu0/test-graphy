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

var SGraphyCircleItem = function (_SGraphyItem) {
    _inherits(SGraphyCircleItem, _SGraphyItem);

    function SGraphyCircleItem(X, Y, color, Radius, isSolid, name) {
        var parent = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

        _classCallCheck(this, SGraphyCircleItem);

        var _this = _possibleConstructorReturn(this, (SGraphyCircleItem.__proto__ || Object.getPrototypeOf(SGraphyCircleItem)).call(this, parent));

        _this.X = X;
        _this.Y = Y;
        _this.color = color;
        _this.Radius = Radius;
        _this.isSolid = isSolid;
        _this.minX = _this.X - _this.Radius;
        _this.minY = _this.Y - _this.Radius;
        _this.maxX = _this.X + _this.Radius;
        _this.maxY = _this.Y + _this.Radius;
        _this.sAngle = null || 0;
        _this.eAngle = null || 2 * Math.PI;
        _this.name = name;
        _this.type = 6;
        _this.lineWidth = null;
        return _this;
    }

    _createClass(SGraphyCircleItem, [{
        key: 'boundingRect',
        value: function boundingRect() {
            return new _SRect2.default(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
        }
    }, {
        key: 'onDraw',
        value: function onDraw(canvas, rect) {
            canvas.lineWidth = this.lineWidth || 240;
            canvas.strokeStyle = this.color || '#000';
            canvas.fillStyle = this.color || '#000';
            canvas.beginPath();
            canvas.arc(this.X, this.Y, this.Radius, this.sAngle, this.eAngle);
            if (!!this.isSolid) {
                canvas.fillStyle = this.color;
                canvas.fill();
            }
            canvas.stroke();
            if (!!this.name) {
                canvas.font = "oblique small-caps bold " + this.lineWidth * 10 + "px Arial";

                canvas.fillStyle = 'green';
                canvas.fillText(this.name, this.X, this.Y);
            }
        }
    }]);

    return SGraphyCircleItem;
}(_SGraphyItem3.default);

exports.default = SGraphyCircleItem;