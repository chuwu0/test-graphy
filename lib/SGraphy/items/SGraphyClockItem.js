'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SGraphyItem2 = require('../SGraphyItem');

var _SGraphyItem3 = _interopRequireDefault(_SGraphyItem2);

var _SRect = require('../types/SRect');

var _SRect2 = _interopRequireDefault(_SRect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var drawScale = Symbol('drawScale');
var drawScaleText = Symbol('drawScaleText');
var drawHour = Symbol('drawHour');
var drawMinute = Symbol('drawMinute');
var drawSecond = Symbol('drawSecond');

var SGraphyClockItem = function (_SGraphyItem) {
  _inherits(SGraphyClockItem, _SGraphyItem);

  function SGraphyClockItem(width, height) {
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, SGraphyClockItem);

    var _this = _possibleConstructorReturn(this, (SGraphyClockItem.__proto__ || Object.getPrototypeOf(SGraphyClockItem)).call(this, parent));

    _this.name = 'ClockItem';
    _this.width = width;
    _this.height = height;

    _this.isShowScale = true;

    _this.scaleColor = '#000';

    _this.textColor = '#000';

    _this.hourColor = '#000';

    _this.minuteColor = '#000';

    _this.secondColor = '#F00';

    _this.isShowSecond = true;

    _this.isSmooth = true;

    _this.padding = 100.0;
    return _this;
  }

  _createClass(SGraphyClockItem, [{
    key: 'boundingRect',
    value: function boundingRect() {
      return new _SRect2.default(0, 0, this.width / 2, this.height / 2);
    }
  }, {
    key: 'onDraw',
    value: function onDraw(canvas, rect) {
      canvas.translate(this.width / 2, this.height / 2);
      canvas.arc(0, 0, this.radius, 0, 2 * Math.PI);
      var t = new Date();

      this[drawScale](canvas);
      this[drawHour](canvas, t.getHours(), t.getMinutes(), t.getSeconds());
      this[drawMinute](canvas, t.getMinutes(), t.getSeconds());
      this[drawSecond](canvas, t.getSeconds() + t.getMilliseconds() / 1000.0);
    }
  }, {
    key: drawScale,
    value: function value(canvas) {
      var scaleLength = Math.max(this.radius / 10.0, 2.0);
      var scaleLength1 = scaleLength * 1.2;
      var strokeWidth = Math.max(this.radius / 100.0, 2.0);
      var strokeWidth1 = strokeWidth * 2.0;

      canvas.save();
      canvas.strokeStyle = this.scaleColor;

      for (var i = 1; i <= 12; i++) {
        canvas.lineWidth = strokeWidth1;
        canvas.drawLine(0, -this.radius, 0, -this.radius + scaleLength1);

        if (this.radius >= 40) {
          canvas.rotate(6 * Math.PI / 180);
          for (var j = 1; j <= 4; j++) {
            canvas.lineWidth = strokeWidth;
            canvas.drawLine(0, -this.radius, 0, -this.radius + scaleLength);
            canvas.rotate(6 * Math.PI / 180);
          }
        } else {
          canvas.rotate(30 * Math.PI / 180);
        }
      }

      canvas.restore();
    }
  }, {
    key: drawScaleText,
    value: function value(canvas) {}
  }, {
    key: drawHour,
    value: function value(canvas, hour, minute, second) {
      canvas.save();
      canvas.lineCap = 'round';
      canvas.lineWidth = Math.max(this.radius / 30.0, 4.0);
      canvas.strokeStyle = this.hourColor;
      canvas.rotate((hour * 30.0 + minute * 30.0 / 60 + second * 30.0 / 60 / 60) * Math.PI / 180);
      canvas.drawLine(0, this.radius / 10.0, 0, -this.radius / 2.0);
      canvas.restore();
    }
  }, {
    key: drawMinute,
    value: function value(canvas, minute, second) {
      canvas.save();
      canvas.lineCap = 'round';
      canvas.lineWidth = Math.max(this.radius / 40.0, 4.0);
      canvas.strokeStyle = this.minuteColor;
      canvas.rotate((minute * 6 + second * 6 / 60.0) * Math.PI / 180.0);
      canvas.drawLine(0, this.radius / 10.0, 0, -this.radius * 2.0 / 3.0);
      canvas.restore();
    }
  }, {
    key: drawSecond,
    value: function value(canvas, second) {
      canvas.save();
      canvas.lineCap = 'round';
      canvas.lineWidth = Math.max(this.radius / 100.0, 3.0);
      canvas.strokeStyle = this.secondColor;
      canvas.rotate(second * 6 * Math.PI / 180);
      canvas.drawLine(0, this.radius / 5.0, 0, -this.radius + this.radius / 10.0);

      canvas.restore();
    }
  }, {
    key: 'radius',
    get: function get() {
      return Math.min(this.width, this.height) / 2.0;
    }
  }]);

  return SGraphyClockItem;
}(_SGraphyItem3.default);

exports.default = SGraphyClockItem;