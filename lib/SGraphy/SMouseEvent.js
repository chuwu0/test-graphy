"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SMouseEvent = function SMouseEvent(e) {
  _classCallCheck(this, SMouseEvent);

  var bbox = e.srcElement.getBoundingClientRect();
  this.type = e.type;
  this.x = e.clientX - bbox.left;
  this.y = e.clientY - bbox.top;
  this.screenX = e.screenX;
  this.screenY = e.screenY;
  this.clientX = e.clientX;
  this.clientY = e.clientY;
  this.altKey = e.altKey;
  this.ctrlKey = e.ctrlKey;
  this.buttons = e.buttons;
  this.wheelDelta = e.wheelDelta;
};

exports.default = SMouseEvent;


SMouseEvent.LEFT_BUTTON = 0x01;
SMouseEvent.RIGHT_BUTTON = 0x02;
SMouseEvent.MIDDLE_BUTTON = 0x04;