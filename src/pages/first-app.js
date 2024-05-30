import React, { useState } from "react";
import { Link } from "react-router-dom";

function FirstApp() {
  const pixelData = [
    [
      [34, 203, 55],
      [67, 76, 73],
      [99, 105, 93],
      [178, 173, 169],
      [144, 89, 54],
    ],
    [
      [22, 20, 18],
      [10, 40, 50],
      [171, 180, 211],
      [150, 150, 90],
      [50, 150, 150],
    ],
    [
      [209, 109, 107],
      [111, 117, 212],
      [214, 113, 165],
      [45, 137, 212],
      [182, 240, 245],
    ],
    [
      [199, 184, 72],
      [204, 75, 193],
      [140, 132, 139],
      [87, 76, 63],
      [170, 209, 167],
    ],
    [
      [1, 90, 20],
      [174, 214, 174],
      [196, 106, 112],
      [173, 166, 167],
      [48, 35, 46],
    ],
  ];

  const isColorful = (pixel) => {
    const [r, g, b] = pixel;
    const avg = (r + g + b) / 3;
    const diff = Math.abs(r - avg) + Math.abs(g - avg) + Math.abs(b - avg);
    return diff > 47;
  };

  const filterPixels = (data) => {
    return data.map((row) =>
      row.map((pixel) => (isColorful(pixel) ? pixel : [255, 255, 255]))
    );
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredPixels = filterPixels(pixelData);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
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
          gridTemplateColumns: `repeat(${filteredPixels[0].length}, 180px)`,
          gap: "0px",
        }}>
        {filteredPixels.flat().map((pixel, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          return (
            <div
              key={index}
              style={{
                width: "180px",
                height: "120px",
                backgroundColor: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`,
                position: "relative",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}>
              {hoveredIndex === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "5px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    borderRadius: "3px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                  }}>
                  {`rgb(${pixelData[row][col][0]}, ${pixelData[row][col][1]}, ${pixelData[row][col][2]})`}
                </div>
              )}
            </div>
          );
        })}
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

export default FirstApp;
