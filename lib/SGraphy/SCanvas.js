"use strict";

Object.assign(CanvasRenderingContext2D.prototype, {
  drawLine: function drawLine(x0, y0, x1, y1) {
    this.beginPath();
    this.moveTo(x0, y0);
    this.lineTo(x1, y1);
    this.stroke();
  }
});