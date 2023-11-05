import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import img1 from "./assets/images/image-1.webp";
import img2 from "./assets/images/image-2.webp";
import img3 from "./assets/images/image-3.webp";
import img4 from "./assets/images/image-4.webp";
import img5 from "./assets/images/image-5.webp";
import img6 from "./assets/images/image-6.webp";
import img7 from "./assets/images/image-7.webp";
import img8 from "./assets/images/image-8.webp";
import img9 from "./assets/images/image-9.webp";
import img10 from "./assets/images/image-10.jpeg";
import img11 from "./assets/images/image-11.jpeg";
import Image from "./components/Image";
import { FaCheckSquare } from "react-icons/fa";

const backendForMobile = "ontouchstart" in window ? TouchBackend : HTML5Backend;

const App = () => {
  const [images, setImages] = useState([
    { id: 1, src: img1, isFeatured: true, selected: false },
    { id: 2, src: img2, isFeatured: false, selected: false },
    { id: 3, src: img3, isFeatured: false, selected: false },
    { id: 4, src: img4, isFeatured: false, selected: false },
    { id: 5, src: img5, isFeatured: false, selected: false },
    { id: 6, src: img6, isFeatured: false, selected: false },
    { id: 7, src: img7, isFeatured: false, selected: false },
    { id: 8, src: img8, isFeatured: false, selected: false },
    { id: 9, src: img9, isFeatured: false, selected: false },
    { id: 10, src: img10, isFeatured: false, selected: false },
    { id: 11, src: img11, isFeatured: false, selected: false },
  ]);

  // Function to move images in the list
  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  // Function to toggle image selection
  const toggleImageSelection = (index) => {
    const updatedImages = [...images];
    updatedImages[index].selected = !updatedImages[index].selected;
    setImages(updatedImages);
  };

  // Function to delete selected images
  const deleteSelectedImages = () => {
    const remainingImages = images.filter((image) => !image.selected);
    setImages(remainingImages);
  };

  // Count the number of selected images
  const selectedImageCount = images.filter((image) => image.selected).length;

  return (
    <section className="ms-6 me-6 bg-white p-2">
      <nav className="flex justify-between p-3 border-b-2">
        {selectedImageCount > 0 ? (
          <>
            <span className="ml-2 text-black-800 font-bold flex items-center gap-1">
              <FaCheckSquare />{" "}
              {selectedImageCount > 1
                ? `${selectedImageCount} Files Selected`
                : `${selectedImageCount} File Selected`}
            </span>

            <button
              onClick={deleteSelectedImages}
              className="p-2 bg-red-500 text-white rounded-lg"
            >
              {selectedImageCount > 1 ? "Delete Files" : "Delete File"}
            </button>
          </>
        ) : (
          <h1 className="text-black-800 font-bold ">Gallery</h1>
        )}
      </nav>
      {/* Set up the drag and drop provider */}
      <DndProvider backend={backendForMobile}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-6">
          <div className="lg:col-span-2 lg:row-span-2  sm:col-span-1 ">
            <Image
              key={images[0].id}
              image={images[0]}
              index={0}
              moveImage={moveImage}
              toggleImageSelection={() => toggleImageSelection(0)}
            />
          </div>
          {/* Display the rest of the images in grid cells */}
          {images.slice(1).map((image, index) => (
            <Image
              key={image.id}
              image={image}
              index={index + 1}
              moveImage={moveImage}
              toggleImageSelection={() => toggleImageSelection(index + 1)}
            />
          ))}
        </div>
      </DndProvider>
    </section>
  );
};
export default App;
