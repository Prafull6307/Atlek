/** @format */

import React, { useState, useRef } from "react";
import IMAGE from "../images/IND-football-10.jpg";
const Drwaing = () => {
  const [rect, setRect] = useState({ x1: 0, y1: 0, width: 0, height: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x1 = e.clientX - rect.left;
    const y1 = e.clientY - rect.top;
    setRect({ x1, y1, width: 0, height: 0 });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x2 = e.clientX - rect.left;
    const y2 = e.clientY - rect.top;
    setRect((prevRect) => ({
      ...prevRect,
      width: Math.abs(x2 - prevRect.x1),
      height: Math.abs(y2 - prevRect.y1),
    }));
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="flex-1 relative"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <img
          ref={canvasRef}
          src={IMAGE}
          alt="Placeholder"
          className="w-full h-full"
        />
        <div
          className="absolute border border-red-500 border-4"
          style={{
            top: rect.y1,
            left: rect.x1,
            width: rect.width,
            height: rect.height,
          }}
        />
      </div>
      <div className="w-full md:w-1/4 p-4 bg-gray-600">
        <div>
          <label>Position X1</label>
          <input
            type="number"
            value={rect.x1}
            readOnly
            className="w-full border p-1"
          />
        </div>
        <div>
          <label>Position Y1</label>
          <input
            type="number"
            value={rect.y1}
            readOnly
            className="w-full border p-1"
          />
        </div>
        <div>
          <label>Height</label>
          <input
            type="number"
            value={rect.height}
            readOnly
            className="w-full border p-1"
          />
        </div>
        <div>
          <label>Width</label>
          <input
            type="number"
            value={rect.width}
            readOnly
            className="w-full border p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Drwaing;
