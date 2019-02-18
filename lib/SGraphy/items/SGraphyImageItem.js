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

var SGraphyImageItem = function (_SGraphyItem) {
  _inherits(SGraphyImageItem, _SGraphyItem);

  function SGraphyImageItem(width, height, url, id, X, Y, downUrl) {
    var parent = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

    _classCallCheck(this, SGraphyImageItem);

    var _this = _possibleConstructorReturn(this, (SGraphyImageItem.__proto__ || Object.getPrototypeOf(SGraphyImageItem)).call(this, parent));

    _this.width = width;
    _this.height = height;
    _this.url = url;
    _this.id = id;
    _this.X = X;
    _this.Y = Y;
    _this.downUrl = downUrl;
    _this.imgFalg = false;
    _this.img = new Image();
    _this.img.src = _this.url;
    _this.img.style.width = _this.width;
    _this.img.style.height = _this.height;
    _this.canMove = true;
    _this.type = 1;
    return _this;
  }

  _createClass(SGraphyImageItem, [{
    key: 'boundingRect',
    value: function boundingRect() {
      return new _SRect2.default(0, 0, this.width * 100, this.height * 100);
    }
  }, {
    key: 'onDraw',
    value: function onDraw(canvas, rect) {
      canvas.drawImage(this.img, 0, 0, this.width, this.height, 0, 0, this.width * 100, this.height * 100);
    }
  }]);

  return SGraphyImageItem;
}(_SGraphyItem3.default);

exports.default = SGraphyImageItem;