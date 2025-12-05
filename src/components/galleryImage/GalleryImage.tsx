import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

import "./gallery.css"

const baseImages = [
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GalleryImage = ({ images }: { images: any }) => {

  const imagesToShow = images.length === 0  ?  baseImages : images

  return <ImageGallery
          items={imagesToShow} 
          showThumbnails={false} 
          showFullscreenButton={false}
          additionalClass="my-gallery"
          disableSwipe={true}
          autoPlay
          showPlayButton={false}
          showNav={false}
          slideInterval={6000}
        />;
};

export default GalleryImage;