'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SPoint = require('./types/SPoint');

var _SPoint2 = _interopRequireDefault(_SPoint);

var _SRect = require('./types/SRect');

var _SRect2 = _interopRequireDefault(_SRect);

var _SGraphyItem = require('./SGraphyItem');

var _SGraphyItem2 = _interopRequireDefault(_SGraphyItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var toGrabItemMotionEvent = Symbol('toGrabItemMotionEvent');

var SGraphyScene = function () {
    function SGraphyScene() {
        _classCallCheck(this, SGraphyScene);

        this.view = null;
        console.log(this, 'this');
        this.root = new _SGraphyItem2.default(null);
        this.root._scene = this;
        this.pos = new _SPoint2.default(0, 0);
        this.scale = new _SPoint2.default(1, 1);
        this.grabItem = null;
    }

    _createClass(SGraphyScene, [{
        key: 'addItem',
        value: function addItem(item) {
            item.parent = this.root;
        }
    }, {
        key: 'removeItem',
        value: function removeItem(item) {
            item.parent = null;
        }
    }, {
        key: 'drawScene',
        value: function drawScene(canvas, rect) {
            this.root.onDraw(canvas, rect);
        }
    }, {
        key: 'drawBackground',
        value: function drawBackground(canvas, rect) {}
    }, {
        key: 'drawForeground',
        value: function drawForeground(canvas, rect) {}
    }, {
        key: 'worldRect',
        value: function worldRect() {
            var rect = null;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.root.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (rect == null) {
                        rect = item.boundingRect().adjusted(item.pos);
                    } else {
                        rect.union(item.boundingRect().adjusted(item.pos));
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return rect;
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'onClick',
        value: function onClick(e) {
            if (this.grabItem != null) {
                return this.grabItem.onClick(this[toGrabItemMotionEvent](this.grabItem, e));
            }
            return this.root.onClick(e);
        }
    }, {
        key: 'onDbClick',
        value: function onDbClick(e) {
            if (this.grabItem != null) {
                return this.grabItem.onDbClick(this[toGrabItemMotionEvent](this.grabItem, e));
            }
            return this.root.onDbClick(e);
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            if (this.grabItem != null) {
                return this.grabItem.onMouseDown(this[toGrabItemMotionEvent](this.grabItem, e));
            }
            return this.root.onMouseDown(e);
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            if (this.grabItem != null) {
                return this.grabItem.onMouseMove(this[toGrabItemMotionEvent](this.grabItem, e));
            }
            return this.root.onMouseMove(e);
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
            if (this.grabItem != null) {
                return this.grabItem.onMouseUp(this[toGrabItemMotionEvent](this.grabItem, e));
            }
            return this.root.onMouseUp(e);
        }
    }, {
        key: toGrabItemMotionEvent,
        value: function value(item, e) {
            var se = _extends({}, e);
            var p = item.mapFromScene(e.x, e.y);
            se.x = p.x;
            se.y = p.y;
            return se;
        }
    }]);

    return SGraphyScene;
}();

exports.default = SGraphyScene;