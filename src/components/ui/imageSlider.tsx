import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../imageSlider.css';

interface MediaItem {
  imagePath: string;
}
interface ImageSliderProps {
  images: MediaItem[];
  height?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, height = 380 }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!images || images.length === 0) return null;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="">
      {/* Main image slider-wrapper*/}
      <div className="main-image" style={{ height }}>
        <img src={images[activeIndex].imagePath} alt={`image-${activeIndex}`} draggable={false} />

        <button className="nav left" aria-label="Previous image" onClick={goPrev}>
          <FaChevronLeft />
        </button>

        <button className="nav right" aria-label="Next image" onClick={goNext}>
          <FaChevronRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="thumbs">
        {images.map((img, index) => (
          <button key={index} className={`thumb ${index === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(index)} aria-label={`Select image ${index + 1}`}>
            <img src={img.imagePath} alt={`thumb-${index}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
