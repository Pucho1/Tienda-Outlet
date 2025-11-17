import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

import "./gallery.css"

const images = [
  {
    original:  "https://res.cloudinary.com/dgzhfz56t/image/upload/v1763372435/HB_fowi3l.png",
  },
  {
    original: "https://res.cloudinary.com/dgzhfz56t/image/upload/v1763403338/HB2_oggw07.png",
  },
  {
    original: "https://res.cloudinary.com/dgzhfz56t/image/upload/v1763403369/de_hugo_2_ur6in3.png",
  },
];

const GalleryImage = () => {
  return <ImageGallery 
          items={images} 
          showThumbnails={false} 
          showFullscreenButton={false}
          additionalClass="my-gallery"
          autoPlay
          showPlayButton={false}
          showNav={false}
          // swipingTransitionDuration= {12}
          slideInterval={6000}
        />;
};

export default GalleryImage;