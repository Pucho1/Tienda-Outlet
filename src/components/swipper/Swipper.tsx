
import { Key } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";

import "./swipper.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Swipper = ({ images }: { images: any[] }) => {

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
			{images.map((img: { original: string | undefined; }, i: Key | null | undefined) => (
				<SwiperSlide key={i}>
					<img src={img.original} alt="" />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Swipper;