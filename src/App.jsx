import React, { useState } from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery';

function App() {
  const [images, setImages] = useState([
    { id: 1, src: 'image1.jpg', isFeature: true, selected: false },
    { id: 2, src: 'image2.jpg', isFeature: false, selected: false },
    { id: 3, src: 'image3.jpg', isFeature: false, selected: false },
    { id: 4, src: 'image4.jpg', isFeature: false, selected: false },
    { id: 5, src: 'image5.jpg', isFeature: false, selected: false },
  ]);

  const setFeatureImage = (id) => {
    const updatedImages = images.map((image) => ({
      ...image,
      isFeature: image.id === id,
    }));
    setImages(updatedImages);
  };

  const toggleImageSelection = (id) => {
    const updatedImages = images.map((image) => ({
      ...image,
      selected: image.id === id ? !image.selected : image.selected,
    }));
    setImages(updatedImages);
  };

  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !image.selected);
    setImages(updatedImages);
  };

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <ImageGallery
        images={images}
        setImages={setImages}
        setFeatureImage={setFeatureImage}
        toggleImageSelection={toggleImageSelection}
        deleteSelectedImages={deleteSelectedImages}
      />
    </div>
  );
}

export default App;