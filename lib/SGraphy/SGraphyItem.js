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

var _SMouseEvent = require('./SMouseEvent');

var _SMouseEvent2 = _interopRequireDefault(_SMouseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sortItemZOrder = Symbol('sortItemZOrder');
var toChildMouseEvent = Symbol('toChildMouseEvent');
var grabItem = Symbol('grabItem');
var releaseItem = Symbol('releaseItem');

var SGraphyItem = function () {
    function SGraphyItem(parent) {
        _classCallCheck(this, SGraphyItem);

        this.name = 'item';
        this._scene = null;
        this._parent = parent;
        this.children = [];

        this.zOrder = 0;

        this._pos = new _SPoint2.default(0, 0);

        this._scale = new _SPoint2.default(1, 1);

        this._isVisible = true;

        this._mouseDownPos = new _SPoint2.default(4, 21);
        this._isMove = false;
        this.canMove = false;
    }

    _createClass(SGraphyItem, [{
        key: 'boundingRect',
        value: function boundingRect() {
            return new _SRect2.default(0, 0, 10, 10);
        }
    }, {
        key: 'onDraw',
        value: function onDraw(canvas, rect) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    canvas.save();

                    canvas.translate(item.pos.x, item.pos.y);

                    item.onDraw(canvas, rect);

                    canvas.restore();
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
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'moveTo',
        value: function moveTo(x, y) {
            this.pos = new _SPoint2.default(x, y);
        }
    }, {
        key: 'contains',
        value: function contains(x, y) {
            return this.boundingRect().contains(x - this.pos.x, y - this.pos.y);
        }
    }, {
        key: 'itemPath',
        value: function itemPath() {
            if (this.parent != null) {
                var list = this.parent.itemPath();
                list.push(this);
                return list;
            }

            return [this];
        }
    }, {
        key: 'mapFromScene',
        value: function mapFromScene(x, y) {
            var list = this.itemPath();
            var x0 = x;
            var y0 = y;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    x0 = (x0 - item.pos.x) / item.scale.x;
                    y0 = (y0 - item.pos.y) / item.scale.y;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return new _SPoint2.default(x0, y0);
        }
    }, {
        key: 'mapToScene',
        value: function mapToScene(x, y) {
            if (this.parent == null) {
                return new _SPoint2.default(x, y);
            }

            return this.parent.mapToScene(x * this.scale.x + this.pos.x, y * this.scale.y + this.pos.y);
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    if (!item.visible) {
                        continue;
                    }
                    var ce = this[toChildMouseEvent](item, e);
                    if (item.contains(e.x, e.y) && item.onClick(ce)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'onDbClick',
        value: function onDbClick(e) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;

                    if (!item.visible) {
                        continue;
                    }
                    var ce = this[toChildMouseEvent](item, e);
                    if (item.contains(e.x, e.y) && item.onDbClick(ce)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {

                for (var _iterator5 = this.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var item = _step5.value;

                    if (!item.visible) {
                        continue;
                    }
                    var ce = this[toChildMouseEvent](item, e);
                    if (item.contains(e.x, e.y) && item.onMouseDown(ce)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            if (this.canMove) {
                this._mouseDownPos = new _SPoint2.default(e.x, e.y);
                this._isMove = true;
                this[grabItem](this);

                return true;
            }
            return false;
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var item = _step6.value;

                    if (!item.visible) {
                        continue;
                    }
                    var ce = this[toChildMouseEvent](item, e);
                    if (item.contains(e.x, e.y) && item.onMouseMove(ce)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            if (e.buttons & _SMouseEvent2.default.LEFT_BUTTON && this.canMove && this._isMove) {
                this.moveTo(this.pos.x + e.x - this._mouseDownPos.x, this.pos.y + e.y - this._mouseDownPos.y);
            }

            return false;
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var item = _step7.value;

                    if (!item.visible) {
                        continue;
                    }
                    var ce = this[toChildMouseEvent](item, e);
                    if (item.contains(e.x, e.y) && item.onMouseUp(ce)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            this._isMove = false;
            this[releaseItem]();
            return false;
        }
    }, {
        key: sortItemZOrder,
        value: function value(a, b) {
            return a.zOrder - b.zOrder;
        }
    }, {
        key: toChildMouseEvent,
        value: function value(child, e) {
            var ce = _extends({}, e);
            ce.x = (e.x - child.pos.x) / child.scale.x;
            ce.y = (e.y - child.pos.y) / child.scale.y;
            return ce;
        }
    }, {
        key: grabItem,
        value: function value(item) {
            if (this.scene != null) {
                this.scene.grabItem = item;
            }
        }
    }, {
        key: releaseItem,
        value: function value() {
            if (this.scene != null) {
                this.scene.grabItem = null;
            }
        }
    }, {
        key: 'parent',
        get: function get() {
            return this._parent;
        },
        set: function set(value) {
            if (this._parent === value) {
                return;
            }
            if (this._parent != null) {
                var i = this._parent.children.indexOf(this);
                this._parent.children.splice(i, 1);
            }
            this._parent = value;

            if (this._parent != null) {
                this._parent.children.push(this);
                this._parent.children.sort(this[sortItemZOrder]);
            }
            this._parent = value;
        }
    }, {
        key: 'scene',
        get: function get() {
            if (this._parent != null) {
                return this._parent.scene;
            } else {
                return this._scene;
            }
        }
    }, {
        key: 'pos',
        get: function get() {
            return this._pos;
        },
        set: function set(value) {
            this._pos = value;
        }
    }, {
        key: 'scale',
        get: function get() {
            return this._scale;
        },
        set: function set(value) {
            this._scale = value;
        }
    }, {
        key: 'visible',
        get: function get() {
            return this._isVisible;
        },
        set: function set(value) {
            this._isVisible = value;
        }
    }]);

    return SGraphyItem;
}();

exports.default = SGraphyItem;