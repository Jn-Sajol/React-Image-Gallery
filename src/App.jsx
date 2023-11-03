import React, { useState } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([
    { id: 1, src: 'image1.jpg', isFeature: true },
    { id: 2, src: 'image2.jpg', isFeature: false },
    { id: 3, src: 'image3.jpg', isFeature: false },
    { id: 4, src: 'image4.jpg', isFeature: false },
    { id: 5, src: 'image5.jpg', isFeature: false },
  ]);

  const setFeatureImage = (id) => {
    const updatedImages = images.map((image) => ({
      ...image,
      isFeature: image.id === id,
    }));
    setImages(updatedImages);
  };

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <div className="gallery">
        {images.map((image) => (
          <div key={image.id} className={`image ${image.isFeature ? 'feature' : ''}`}>
            <img src={image.src} alt={`Image ${image.id}`} />
            <button onClick={() => setFeatureImage(image.id)}>
              Set as Feature
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
