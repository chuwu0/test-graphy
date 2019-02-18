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

var SGraphyRectItem = function (_SGraphyItem) {
    _inherits(SGraphyRectItem, _SGraphyItem);

    function SGraphyRectItem(X, Y, width, height, isFill, fillColor, text, textSize, color, Tip) {
        var parent = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;

        _classCallCheck(this, SGraphyRectItem);

        var _this = _possibleConstructorReturn(this, (SGraphyRectItem.__proto__ || Object.getPrototypeOf(SGraphyRectItem)).call(this, parent));

        _this.X = X;
        _this.Y = Y;
        _this.width = width;
        _this.height = height;
        _this.isFill = isFill;
        _this.fillColor = fillColor;
        _this.color = color;
        _this.textSize = textSize || 6;
        _this.type = 10;
        _this.hoverColor = null;
        _this.text = text.split(",");
        _this.fontStart = _this.X;
        _this.Tip = Tip;
        return _this;
    }

    _createClass(SGraphyRectItem, [{
        key: 'boundingRect',
        value: function boundingRect() {
            return new _SRect2.default(this.X, this.Y, this.width, this.height);
        }
    }, {
        key: 'contains',
        value: function contains(x) {
            if (this.X + this.width > x.x && x.x > this.X && this.Y + this.height > x.y && x.y > this.Y) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'onDraw',
        value: function onDraw(canvas, rect) {
            canvas.beginPath();
            canvas.lineWidth = "1";
            if (this.isFill) {
                if (!!this.hoverColor) {
                    canvas.fillStyle = this.hoverColor;
                } else {
                    canvas.fillStyle = this.fillColor;
                }
                canvas.fillRect(this.X, this.Y, this.width, this.height);
            } else {
                canvas.rect(this.X, this.Y, this.width, this.height);
            }
            canvas.stroke();
            if (!!this.text && this.text.length <= 1) {
                canvas.font = this.textSize + "px 宋体";
                canvas.fillStyle = this.color;
                canvas.fillText(this.text[0], this.fontStart, this.Y + this.height / 2);
            } else if (!!this.text && this.text.length > 1) {
                canvas.font = this.textSize + "px 宋体";
                canvas.fillStyle = this.color;
                for (var i = 0; i < this.text.length; i++) {
                    canvas.fillText(this.text[i], this.fontStart, this.Y + this.height / 2 - this.textSize * i);
                }
            } else {
                return;
            }
        }
    }]);

    return SGraphyRectItem;
}(_SGraphyItem3.default);

exports.default = SGraphyRectItem;