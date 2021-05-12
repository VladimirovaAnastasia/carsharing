import React, {Fragment} from 'react';
import './styles.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import classNames from 'classnames';

const Slide = ({title, text, buttonColor}) => (
    <Fragment>
        <div className="carousel-slider__description">
            <h3 className="carousel-slider__title">{title}</h3>
            <p className="carousel-slider__text">{text}</p>
            <button className={classNames('carousel-slider__button', `${buttonColor}`)}>
                <a href="#">Подробнее</a>
            </button>
        </div>
    </Fragment>
);

export default Slide;
