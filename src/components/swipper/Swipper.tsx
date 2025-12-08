
import { Key } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";

import "./swipper.css";

const basedImages = [
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
const Swipper = ({ images }: { images: any }) => {

	const imagesToShow = images.length === 0  ?  basedImages : images

  return (
		<Swiper
			className="mySwiper"
			spaceBetween={5}
			slidesPerView={1}
			autoplay={{
				delay: 4500,
				disableOnInteraction: false,
			}}
			modules={[Autoplay]}
			onSlideChange={() => {}}
			onSwiper={() =>  {}}
		>
			{imagesToShow.map((img: { original: string | undefined; }, i: Key | null | undefined) => (
				<SwiperSlide key={i}>
					<img src={img.original} alt="" />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Swipper;