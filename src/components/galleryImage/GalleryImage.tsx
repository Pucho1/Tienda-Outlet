import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

import "./gallery.css"

const images = [
  {
    original:  "https://res.cloudinary.com/dgzhfz56t/image/upload/v1763495865/modelo_llevando_este_abrigo_de_la_monclear_2_ofkdqv.jpg",
  },
  {
    original: "https://res.cloudinary.com/dgzhfz56t/image/upload/v1763495815/modelo_llevando_este_abrigo_de_la_monclear_1_a6sdak.jpg",
  },
  {
    original: "https://res.cloudinary.com/dgzhfz56t/image/upload/v1763495799/modelo_llevando_este_abrigo_de_la_monclear_cwitlf.jpg",
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