import React, { useState } from "react";
import { Link } from "react-router-dom";

function SecondApp() {
  const pixelData = [
    [
      [87, 76, 63],
      [67, 76, 73],
      [99, 105, 93],
      [178, 173, 169],
      [48, 35, 46],
    ],
    [
      [22, 20, 18],
      [10, 40, 50],
      [67, 76, 73],
      [173, 166, 167],
      [87, 76, 63],
    ],
    [
      [10, 40, 50],
      [99, 105, 93],
      [178, 173, 169],
      [67, 76, 73],
      [22, 20, 18],
    ],
    [
      [22, 20, 18],
      [87, 76, 63],
      [140, 132, 139],
      [87, 76, 63],
      [99, 105, 93],
    ],
    [
      [99, 105, 93],
      [87, 76, 63],
      [67, 76, 73],
      [173, 166, 167],
      [48, 35, 46],
    ],
  ];

  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const isColorful = (pixel) => {
    const [r, g, b] = pixel;
    const avg = (r + g + b) / 3;
    const diff = Math.abs(r - avg) + Math.abs(g - avg) + Math.abs(b - avg);
    return diff > 15;
  };

  const handleMouseEnter = (e, pixel) => {
    const [r, g, b] = pixel;
    const content = `RGB: (${r}, ${g}, ${b}) - ${
      isColorful(pixel) ? "Colorful" : "lebih mirip hitam putih/grayscale"
    }`;
    setTooltip({ visible: true, content, x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        paddingRight: "6rem",
        paddingLeft: "6rem",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}>
      <h1>
        Silahkan hover atau arahkan cursor ke salah satu pixel untuk melihat
        hasilnya
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${pixelData[0].length}, 180px)`,
          gap: "0px",
          position: "relative",
        }}>
        {pixelData.flat().map((pixel, index) => (
          <div
            key={index}
            style={{
              width: "180px",
              height: "120px",
              backgroundColor: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`,
              position: "relative",
            }}
            onMouseEnter={(e) => handleMouseEnter(e, pixel)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
        {tooltip.visible && (
          <div
            style={{
              position: "fixed",
              top: tooltip.y + 10,
              left: tooltip.x + 10,
              padding: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              borderRadius: "5px",
              pointerEvents: "none",
            }}>
            {tooltip.content}
          </div>
        )}
      </div>

      <div style={{ gap: "8px", display: "flex", marginTop: "2rem" }}>
        <Link to={`/program/1`}>
          <button>Program 1</button>
        </Link>
        <Link to={`/program/2`}>
          <button>Program 2</button>
        </Link>
      </div>
    </div>
  );
}

export default SecondApp;
