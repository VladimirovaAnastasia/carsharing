import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, EffectFade, Pagination} from 'swiper';
import Slide from './Slide';
import {slides} from './const';

import './styles.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

SwiperCore.use([Navigation, EffectFade, Pagination]);

const Carousel = () => {
    return (
        <div className="carousel">
            <Swiper spaceBetween={1} slidesPerView={1} navigation pagination effect="fade">
                {slides.map((item) => (
                    <SwiperSlide
                        className="carousel-slider"
                        key={item.id}
                        style={{backgroundImage: `url(${item.img})`}}
                        data-hash={item.hash}
                    >
                        <Slide title={item.title} text={item.text} buttonColor={item.buttonColor} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
