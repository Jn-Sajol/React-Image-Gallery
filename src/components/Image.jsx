import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Image = ({ image, index, moveImage, toggleImageSelection }) => {
  // Set up drag-and-drop for the image
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  // Set up drop functionality for the image
  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [hovered, setHovered] = useState(false);

  // Handle mouse enter event
  const handleMouseEnter = () => {
    setHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`p-2 border border-gray-300 rounded-lg`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <img
        src={image.src}
        alt={`Image ${image.id}`}
        className="w-full h-auto"
        style={{
          filter: hovered && !image.selected ? "blur(4px)" : "none",
          transition: "filter 0.3s ease",
        }}
      />
      {hovered || image.selected ? (
        <div className="absolute top-0 left-3 top-3 p-2 bg-gray-800 text-white">
          <input
            type="checkbox"
            onChange={toggleImageSelection}
            checked={image.selected}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Image;
