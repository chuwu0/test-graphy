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

var SGraphyLineItem = function (_SGraphyItem) {
    _inherits(SGraphyLineItem, _SGraphyItem);

    function SGraphyLineItem(startX, startY, endX, endY, color, width, isVirtual, canMove) {
        var parent = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;

        _classCallCheck(this, SGraphyLineItem);

        var _this = _possibleConstructorReturn(this, (SGraphyLineItem.__proto__ || Object.getPrototypeOf(SGraphyLineItem)).call(this, parent));

        _this.startX = startX;
        _this.startY = startY;
        _this.endX = endX;
        _this.endY = endY;
        _this.color = color;
        _this.width = width;
        _this.isVirtual = isVirtual;
        _this.minX = Math.min(_this.startX, _this.endX);
        _this.minY = Math.min(_this.startY, _this.endY);
        _this.maxX = Math.max(_this.startX, _this.endX);
        _this.maxY = Math.max(_this.startY, _this.endY);
        _this.type = 4;
        return _this;
    }

    _createClass(SGraphyLineItem, [{
        key: 'boundingRect',
        value: function boundingRect() {
            return new _SRect2.default(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
        }
    }, {
        key: 'onDraw',
        value: function onDraw(canvas, rect) {
            if (this.isVirtual) {
                canvas.setLineDash([240, 240]);
            }
            canvas.lineWidth = 240;
            canvas.strokeStyle = this.color || '#000';
            canvas.beginPath();
            canvas.moveTo(this.startX, this.startY);
            canvas.lineTo(this.endX, this.endY);
            canvas.stroke();
        }
    }]);

    return SGraphyLineItem;
}(_SGraphyItem3.default);

exports.default = SGraphyLineItem;