'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./SCanvas');

var _SPoint = require('./types/SPoint');

var _SPoint2 = _interopRequireDefault(_SPoint);

var _SMouseEvent = require('./SMouseEvent');

var _SMouseEvent2 = _interopRequireDefault(_SMouseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bindEvent = Symbol('bindEvent');
var toSceneMotionEvent = Symbol('toSceneMotionEvent');

var SGraphyView = function () {
    function SGraphyView(id, scene) {
        _classCallCheck(this, SGraphyView);

        this.canvasView = document.getElementById(id);
        this.canvas = this.canvasView.getContext('2d');
        this[bindEvent](this.canvasView);
        this.scene = scene;
        this.pos = new _SPoint2.default(10, 0);
        this.scale = 1;
        this.minScale = 0.004;
        this.maxScale = 0.5;
        this._midKeyX = 0;
        this._midKeyY = 0;
        this.wheelZoom = 1.05;

        window.requestAnimationFrame(this.onDraw.bind(this));
    }

    _createClass(SGraphyView, [{
        key: bindEvent,
        value: function value(canvasView) {
            canvasView.onclick = this.onClick.bind(this);
            canvasView.ondblclick = this.onDbClick.bind(this);
            canvasView.onmousedown = this.onMouseDown.bind(this);
            canvasView.onmousemove = this.onMouseMove.bind(this);
            canvasView.onmouseup = this.onMouseUp.bind(this);
            canvasView.onmousewheel = this.onMouseWheel.bind(this);
            canvasView.onresize = this.onResize.bind(this);
        }
    }, {
        key: 'mapFromScene',
        value: function mapFromScene(x) {
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
                return new _SPoint2.default(x.x * this.scale + this.pos.x, x.y * this.scale + this.pos.y);
            }

            return new _SPoint2.default(x * this.scale + this.pos.x, y * this.scale + this.pos.y);
        }
    }, {
        key: 'mapToScene',
        value: function mapToScene(x) {
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
                return new _SPoint2.default((x.x - this.pos.x) / this.scale, (x.y - this.pos.y) / this.scale);
            }

            return new _SPoint2.default((x - this.pos.x) / this.scale, (y - this.pos.y) / this.scale);
        }
    }, {
        key: 'scaleByPoint',
        value: function scaleByPoint(zoom, x0, y0) {
            var z = zoom;

            if (this.scale * zoom >= this.maxScale) {
                z = this.maxScale / this.scale;
                this.scale = this.maxScale;
            } else if (this.scale * zoom <= this.minScale) {
                z = this.minScale / this.scale;
                this.scale = this.minScale;
            } else {
                this.scale *= zoom;
            }

            this.pos.x = x0 - (x0 - this.pos.x) * z;
            this.pos.y = y0 - (y0 - this.pos.y) * z;
        }
    }, {
        key: 'onDraw',
        value: function onDraw() {
            this.canvas.save();
            this.canvas.clearRect(0, 0, this.canvasView.width, this.canvasView.height);
            this.canvas.restore();

            if (this.scene != null) {
                this.canvas.save();
                this.scene.drawBackground(this.canvas);
                this.canvas.restore();

                this.canvas.save();
                this.canvas.translate(this.pos.x, this.pos.y);
                this.canvas.scale(this.scale, this.scale);
                this.scene.drawScene(this.canvas);
                this.canvas.restore();

                this.canvas.save();
                this.scene.drawForeground(this.canvas);
                this.canvas.restore();
            }

            window.requestAnimationFrame(this.onDraw.bind(this));
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            if (this.scene != null) {
                var se = this[toSceneMotionEvent](e);
                this.scene.onClick(se);
            }
        }
    }, {
        key: 'onDbClick',
        value: function onDbClick(e) {
            if (this.scene != null) {
                var ce = this[toSceneMotionEvent](e);
                this.scene.onDbClick(ce);
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            var se = new _SMouseEvent2.default(e);
            if (se.buttons & _SMouseEvent2.default.MIDDLE_BUTTON) {
                this._midKeyX = e.x;
                this._midKeyY = e.y;
            }

            if (this.scene != null) {
                var ce = this[toSceneMotionEvent](e);
                this.scene.onMouseDown(ce);
            }
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            var se = new _SMouseEvent2.default(e);
            if (se.buttons & _SMouseEvent2.default.MIDDLE_BUTTON) {
                this.pos.x += e.x - this._midKeyX;
                this.pos.y += e.y - this._midKeyY;
                this._midKeyX = e.x;
                this._midKeyY = e.y;
                return;
            }
            if (this.scene != null) {
                var ce = this[toSceneMotionEvent](e);
                this.scene.onMouseMove(ce);
            }
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
            if (this.scene != null) {
                var ce = this[toSceneMotionEvent](e);
                this.scene.onMouseUp(ce);
            }
        }
    }, {
        key: 'onMouseWheel',
        value: function onMouseWheel(e) {
            var se = new _SMouseEvent2.default(e);
            if (e.wheelDelta < 0) {
                this.scaleByPoint(1 / this.wheelZoom, se.x, se.y);
            } else {
                this.scaleByPoint(this.wheelZoom, se.x, se.y);
            }
        }
    }, {
        key: 'onResize',
        value: function onResize(e) {}
    }, {
        key: toSceneMotionEvent,
        value: function value(e) {
            var se = new _SMouseEvent2.default(e);
            se.x = (se.x - this.pos.x) / this.scale;
            se.y = (se.y - this.pos.y) / this.scale;
            return se;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.canvasView.width;
        }
    }, {
        key: 'height',
        get: function get() {
            return this.canvasView.height;
        }
    }]);

    return SGraphyView;
}();

exports.default = SGraphyView;