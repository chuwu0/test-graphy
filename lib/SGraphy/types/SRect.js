'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SRect = function () {
  function SRect() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, SRect);

    this._x = x;
    this._y = y;
    this._width = Math.max(width, 0);
    this._height = Math.max(height, 0);
  }

  _createClass(SRect, [{
    key: 'contains',
    value: function contains(x, y) {
      return x >= this.x && x <= this.right && y >= this.top && y <= this.bottom;
    }
  }, {
    key: 'adjusted',
    value: function adjusted(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
        return new SRect(this.x + x.x, this.y + x.y, this.width, this.height);
      }

      return new SRect(this.x + x, this.y + y, this.width, this.height);
    }
  }, {
    key: 'union',
    value: function union(rect) {
      this.left = Math.min(this.left, rect.left);
      this.top = Math.min(this.top, rect.top);
      this.right = Math.max(this.right, rect.right);
      this.bottom = Math.max(this.bottom, rect.bottom);
    }
  }, {
    key: 'left',
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
    }
  }, {
    key: 'right',
    get: function get() {
      return this._x + this._width;
    },
    set: function set(value) {
      this._width = Math.max(value - this._x, 0);
    }
  }, {
    key: 'top',
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
    }
  }, {
    key: 'bottom',
    get: function get() {
      return this._y + this._height;
    },
    set: function set(value) {
      this._height = Math.max(value - this._y, 0);
    }
  }, {
    key: 'x',
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
    }
  }, {
    key: 'y',
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
    }
  }, {
    key: 'width',
    get: function get() {
      return this._width;
    },
    set: function set(value) {
      this._width = Math.max(value, 0);
    }
  }, {
    key: 'height',
    get: function get() {
      return this._height;
    },
    set: function set(value) {
      this._height = Math.max(value, 0);
    }
  }]);

  return SRect;
}();

exports.default = SRect;