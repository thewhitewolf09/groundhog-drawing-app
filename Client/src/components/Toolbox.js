import React, { useState } from "react";
import { CiPen, CiEraser } from "react-icons/ci";
import "./Toolbox.scss";

const Toolbox = ({
  onPenClick,
  onEraserClick,
  onSave,
  onLeave,
  onColorPick,
  onColorSelect
}) => {

  const basicColors = ['#0000FF', '#FF0000', '#008000', '#FFFF00', '#000000', '#FFFFFF'];
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Add any additional logic for when a color is selected, if necessary
  };

  return (
    <aside className="toolbox">
      <div className="tools">
        <button className="tool-btn" onClick={onPenClick}>
          <CiPen />
        </button>
        <button className="tool-btn" onClick={onEraserClick}>
          <CiEraser />
        </button>
        <input type="color" className="color-picker" value={selectedColor} onChange={(e) => handleColorSelect(e.target.value)}/>
        <div className="basic-colors">
        {basicColors.map(color => (
          <div 
            key={color} 
            className={`color-swatch ${selectedColor === color ? 'selected' : ''}`} 
            style={{ backgroundColor: color }} 
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
      </div>
      <div className="bottom-btn">
        <button onClick={onSave}>
          Save
        </button>
        <button onClick={onLeave}>
          Leave Session
        </button>
      </div>
    </aside>
  );
};

export default Toolbox;
