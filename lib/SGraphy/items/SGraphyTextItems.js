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

var SGraphyTextItem = function (_SGraphyItem) {
    _inherits(SGraphyTextItem, _SGraphyItem);

    function SGraphyTextItem(X, Y, width, color, text, falg, font) {
        var parent = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

        _classCallCheck(this, SGraphyTextItem);

        var _this = _possibleConstructorReturn(this, (SGraphyTextItem.__proto__ || Object.getPrototypeOf(SGraphyTextItem)).call(this, parent));

        _this.X = X;
        _this.Y = Y;
        _this.lineWidth = width;
        _this.color = color;
        _this.font = font ? font : "6px 宋体";
        _this.text = falg ? text + '→' : text;
        return _this;
    }

    _createClass(SGraphyTextItem, [{
        key: 'boundingRect',
        value: function boundingRect() {
            return new _SRect2.default(this.X, this.Y, 0, 0);
        }
    }, {
        key: 'onDraw',
        value: function onDraw(canvas, rect) {
            if (!!this.text) {
                canvas.font = this.font;
                canvas.fillStyle = this.color;
                canvas.fillText(this.text, this.X, this.Y);
            }
        }
    }]);

    return SGraphyTextItem;
}(_SGraphyItem3.default);

exports.default = SGraphyTextItem;