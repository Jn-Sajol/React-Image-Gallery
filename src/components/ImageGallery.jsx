// ImageGallery.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ImageGallery({
  images,
  setImages,
  setFeatureImage,
  toggleImageSelection,
  deleteSelectedImages,
}) {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...images];
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(reorderedImages);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="image-gallery">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`image ${
                      image.isFeature ? 'border-2 border-blue-400' : ''
                    } ${image.selected ? 'bg-gray-200' : ''} relative group`}
                  >
                    <img src={image.src} alt={`Image ${image.id}`} className="w-full" />
                    <button
                      onClick={() => setFeatureImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-white text-blue-500 group-hover:text-blue-600"
                    >
                      Set as Feature
                    </button>
                    <input
                      type="checkbox"
                      checked={image.selected}
                      onChange={() => toggleImageSelection(image.id)}
                      className="absolute top-2 left-2 opacity-0 w-6 h-6 group-hover:opacity-100"
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        onClick={deleteSelectedImages}
        className="mt-4 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
      >
        Delete Selected Images
      </button>
    </DragDropContext>
  );
}

export default ImageGallery;
